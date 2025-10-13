const nome = document.querySelector('.js-glitch');
const textos = [
  { texto: 'Portfólio.', fonte: "'Onest', serif" },
  { texto: '作品集.', fonte: "'Onest', serif" }
];

let i = 0;

function startGlitch() {
  const duration = 50 + Math.random() * 100;
  const next = 1000 + Math.random() * 400;

  nome.classList.add('glitching');
  nome.textContent = textos[i].texto;
  nome.style.fontFamily = textos[i].fonte;
  i = (i + 1) % textos.length;

  setTimeout(() => nome.classList.remove('glitching'), duration);
  setTimeout(startGlitch, next);
}

window.addEventListener('load', () => {
  setTimeout(startGlitch, 500);
});

// --- LÓGICA DE NAVEGAÇÃO REFEITA ---

const menuContainer = document.querySelector('.menu nav ul'); // Otimizado para pegar o container dos links
const conteudo = document.getElementById('conteudo');

function showSection(sectionId) {
  // Esconde todas as seções
  const sections = conteudo.querySelectorAll('section');
  sections.forEach(sec => sec.classList.remove('active'));

  // Mostra a seção correta
  const activeSection = document.getElementById(sectionId);
  if (activeSection) {
    activeSection.classList.add('active');
  }

  // Atualiza a classe 'active' nos links do menu
  const allLinks = document.querySelectorAll('.menu a');
  allLinks.forEach(link => link.classList.remove('active'));

  const activeLink = document.querySelector(`.menu a[data-section="${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }

  // Atualiza a URL sem recarregar a página
  history.pushState(null, '', `/${sectionId}`);
}

// 1. Carrega a seção inicial baseada na URL
const initialSection = location.pathname.replace('/', '') || 'home';
showSection(initialSection);

// 2. Listener único no container do menu (Delegação de Eventos)
const menu = document.querySelector('.menu');
menu.addEventListener('click', (event) => {
  // Verifica se o clique foi em um link com o atributo data-section
  const link = event.target.closest('a[data-section]');
  
  if (link) {
    event.preventDefault(); // Impede o comportamento padrão do link
    const section = link.dataset.section;
    showSection(section);
  }
});


// 3. Listener para os botões "voltar/avançar" do navegador
window.addEventListener('popstate', () => {
  const sectionId = location.pathname.replace('/', '') || 'home';
  showSection(sectionId);
});