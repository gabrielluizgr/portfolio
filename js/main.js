const conteudo = document.querySelector('main#conteudo');
const sections = conteudo.querySelectorAll('section');
const menuLinks = document.querySelectorAll('.menu a[data-section]');

function setActiveLink() {
  let activeSectionId = sections[0].id;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - conteudo.scrollTop;
    if (sectionTop <= 200) {
      activeSectionId = section.id;
    }
  });

  menuLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === activeSectionId);
  });
}

conteudo.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

menuLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const sectionId = link.dataset.section;
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  });
});