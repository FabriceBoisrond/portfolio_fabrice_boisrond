/*====================================================================frise chronologique horizontale=====================================================================*/
(function () {
  document.querySelectorAll(".tl-scroll").forEach(function (wrap) {
    var tl = wrap.querySelector(".tl");
    var prev = wrap.querySelector(".tl-nav.prev");
    var next = wrap.querySelector(".tl-nav.next");
    if (!tl || !prev || !next) return;
    function pas() {
      var item = tl.querySelector(".tl-item");
      return item ? item.offsetWidth + 24 : 300;
    }
    function maj() {
      prev.hidden = tl.scrollLeft <= 5;
      next.hidden = tl.scrollLeft + tl.clientWidth >= tl.scrollWidth - 5;
    }
    prev.addEventListener("click", function () {
      tl.scrollBy({ left: -pas(), behavior: "smooth" });
    });
    next.addEventListener("click", function () {
      tl.scrollBy({ left: pas(), behavior: "smooth" });
    });
    tl.addEventListener("scroll", maj);
    window.addEventListener("resize", maj);
    new MutationObserver(maj).observe(document.body, { attributes: true, subtree: true, attributeFilter: ["class"] });
    maj();
  });
})();
/*====================================================================filtre du parcours (expérience / formation)=====================================================================*/
(function () {
  var boutons = document.querySelectorAll(".tl-filter");
  var items = document.querySelectorAll(".parcours .tl-item[data-type]");
  var tl = document.querySelector(".parcours .tl");
  if (!boutons.length || !items.length) return;
  function filtrer(type) {
    boutons.forEach(function (b) {
      var actif = b.dataset.filter === type;
      b.classList.toggle("active", actif);
      b.setAttribute("aria-selected", actif ? "true" : "false");
    });
    var visibles = [];
    items.forEach(function (it) {
      it.hidden = it.dataset.type !== type;
      it.classList.remove("is-first", "is-last");
      if (!it.hidden) visibles.push(it);
    });
    if (visibles.length) {
      visibles[0].classList.add("is-first");
      visibles[visibles.length - 1].classList.add("is-last");
    }
    if (tl) {
      tl.scrollLeft = 0;
      tl.dispatchEvent(new Event("scroll"));
    }
  }
  boutons.forEach(function (b) {
    b.addEventListener("click", function () {
      filtrer(b.dataset.filter);
    });
  });
  var depart = document.querySelector(".tl-filter.active");
  filtrer(depart ? depart.dataset.filter : boutons[0].dataset.filter);
})();
/*====================================================================âge automatique=====================================================================*/
(function () {
  var el = document.getElementById("age");
  if (!el) return;
  var naissance = new Date(el.dataset.birthdate + "T00:00:00");
  var aujourdhui = new Date();
  var age = aujourdhui.getFullYear() - naissance.getFullYear();
  var anniversairePasse =
    aujourdhui.getMonth() > naissance.getMonth() ||
    (aujourdhui.getMonth() === naissance.getMonth() &&
      aujourdhui.getDate() >= naissance.getDate());
  if (!anniversairePasse) age--;
  el.textContent = age;
})();
/*====================================================================typing animation========================================================================*/
var typed = new Typed(".typing", {
  strings: [
    "Passionné de développement web",
    "Curieux et autonome",
    "Toujours désireux d'apprendre",
  ],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true,
});
/*=====================================================================Aside==================================================================================*/

const nav = document.querySelector(".nav"),
  navList = nav.querySelectorAll("li"),
  totalNavList = navList.length,
  allSection = document.querySelectorAll(".section"),
  totalSection = allSection.length;
for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", function () {
    
    removeBackSection();
    for (let j = 0; j < totalNavList; j++) {
      if (navList[j].querySelector("a").classList.contains("active")) {
        addBackSection(j);
        //allSection[j].classList.add("back-section");
      }
      navList[j].querySelector("a").classList.remove("active");
    }
    this.classList.add("active");
    showSection(this);
    if(window .innerWidth < 1200)
    {
      asideSectionTogglerBtn();
    }
  })
}
function removeBackSection()
{
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("back-section");
  }
}
function addBackSection(num)
{
  allSection[num].classList.add("back-section");
}
function showSection(element) {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("active");
  }
  const target = element.getAttribute("href").split("#")[1];
  document.querySelector("#" + target).classList.add("active");
}
function updateNav(element)
{
  for(let i = 0; i<totalNavList; i++)
  {
    navList[i].querySelector("a").classList.remove("active");
    const target = element.getAttribute("href").split("#")[1];
    if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1])
    {
      navList[i].querySelector("a").classList.add("active");
    }
  }
}
document.querySelector(".hire-me").addEventListener("click",function(){
  const sectionIndex = this.getAttribute("data-section-index");
 // console.log(sectionIndex);
  showSection(this);
  updateNav(this);
  removeBackSection();
  addBackSection(sectionIndex); 
})


const navTogglerBtn = document.querySelector(".nav-toggler"),
  aside = document.querySelector(".aside");
  navTogglerBtn.addEventListener("click",() => 
  {
    asideSectionTogglerBtn();
  })
  function asideSectionTogglerBtn()
  {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for(let i = 0; i<totalSection;i++)
    {
      allSection[i].classList.toggle("open");
    }
  }

  // Gestion du formulaire
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  
  // Feedback visuel pendant l'envoi
  submitBtn.innerHTML = 'Envoi en cours...';
  submitBtn.disabled = true;
  
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      form.reset();
      showFormResponse('Message envoyé avec succès !', 'success');
    } else {
      throw new Error('Erreur réseau');
    }
  })
  .catch(error => {
    showFormResponse('Une erreur est survenue. Veuillez réessayer.', 'error');
  })
  .finally(() => {
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  });
});

function showFormResponse(message, type) {
  const responseDiv = document.createElement('div');
  responseDiv.id = 'formResponse';
  responseDiv.textContent = message;
  responseDiv.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
  responseDiv.style.color = type === 'success' ? '#155724' : '#721c24';
  
  const existingResponse = document.getElementById('formResponse');
  if (existingResponse) {
    existingResponse.remove();
  }
  
  document.querySelector('.contact-form').appendChild(responseDiv);
  responseDiv.style.display = 'block';
  
  setTimeout(() => {
    responseDiv.style.display = 'none';
  }, 5000);
}