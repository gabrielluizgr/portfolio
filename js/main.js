const sections = document.querySelectorAll('main#conteudo section');
const menuLinks = document.querySelectorAll('.menu a[data-section]');

function setActiveLink() {
  let scrollPosition = window.scrollY + window.innerHeight / 2;
  let activeSectionId = sections[0].id;

  sections.forEach(section => {
    if (scrollPosition >= section.offsetTop) {
      activeSectionId = section.id;
    }
  });

  menuLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === activeSectionId);
  });
}

// Scroll com debounce para suavidade do menu ativo
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    setActiveLink();
    animateSections();
  }, 50);
});

window.addEventListener('load', () => {
  setActiveLink();
  animateSections();
});

// Clique nos links do menu
menuLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const section = document.getElementById(link.dataset.section);
    section.scrollIntoView({ behavior: 'smooth' });
  });
});
