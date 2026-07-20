// Minha Chance de Visto - Header Component
const headerHTML = `
<header class="py-3 mb-4">
  <div class="container">
    <div class="navbar">
      <a href="index.html" class="navbar-brand">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16" style="color: var(--primary);">
          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
          <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.085a.5.5 0 0 1 .196.42v.021a.5.5 0 0 1-.293.468L5 6.566l-.072-.036a.5.5 0 0 1-.222-.524l.022-.11a.5.5 0 0 1 .384-.396zm.262 2.686a.5.5 0 0 1 .196.42v.022a.5.5 0 0 1-.293.468L5 9.566l-.072-.036a.5.5 0 0 1-.222-.524l.022-.11a.5.5 0 0 1 .384-.396zm.262 2.686a.5.5 0 0 1 .196.42v.022a.5.5 0 0 1-.293.468L5 12.566l-.072-.036a.5.5 0 0 1-.222-.524l.022-.11a.5.5 0 0 1 .384-.396zM1.5 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
        </svg>
        <span style="font-weight: 700; color: var(--dark);">Minha Chance de Visto</span>
      </a>
      <button class="navbar-toggler" onclick="toggleMobileMenu()" aria-label="Menu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4.17a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4.17a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
      </button>
      <ul class="navbar-nav">
        <li><a href="index.html" class="nav-link" id="nav-home">Início</a></li>
        <li class="nav-item dropdown">
          <a href="#" class="nav-link" id="nav-tools" onclick="toggleDropdown(event)" style="display: flex; align-items: center; gap: 4px;">Simuladores <span style="font-size: 0.75rem;">▼</span></a>
          <ul class="dropdown-menu" id="tools-dropdown">
            <li><a href="calculadora.html" class="dropdown-item" id="nav-calc">Calculadora de Chances</a></li>
            <li><a href="simulador-entrevista.html" class="dropdown-item" id="nav-sim-entrevista">Simulador de Entrevista</a></li>
          </ul>
        </li>
        <li><a href="documentos.html" class="nav-link" id="nav-documentos">Documentos</a></li>
        <li><a href="dicas.html" class="nav-link" id="nav-dicas">Dicas</a></li>
        <li><a href="consulados.html" class="nav-link" id="nav-consulados">Consulados</a></li>
        <li><a href="perguntas-respostas.html" class="nav-link" id="nav-faq">Perguntas</a></li>
        <li><a href="sobre.html" class="nav-link" id="nav-sobre">Sobre Nós</a></li>
        <li><a href="contato.html" class="nav-link" id="nav-contato">Contato</a></li>
      </ul>
    </div>
  </div>
</header>
`;

function toggleMobileMenu() {
  const nav = document.querySelector(".navbar-nav");
  if (nav) {
    nav.classList.toggle("show");
  }
}

function toggleDropdown(event) {
  event.preventDefault();
  event.stopPropagation();
  const dropdown = document.getElementById("tools-dropdown");
  if (dropdown) {
    dropdown.classList.toggle("show");
  }
}

// Fechar o dropdown ao clicar em qualquer lugar da tela
document.addEventListener("click", () => {
  const dropdown = document.getElementById("tools-dropdown");
  if (dropdown && dropdown.classList.contains("show")) {
    dropdown.classList.remove("show");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("header-placeholder");
  if (container) {
    container.innerHTML = headerHTML;
    setActiveNavLink();
  }
});
