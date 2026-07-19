// Minha Chance de Visto - Navigation Helpers

function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;
  
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    
    if (currentHash && href && href.includes(currentHash)) {
      link.classList.add("active");
    } else if (!currentHash && href && currentPath.endsWith(href)) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("hashchange", setActiveNavLink);
document.addEventListener("DOMContentLoaded", setActiveNavLink);
