// Minha Chance de Visto - LGPD/GDPR Cookie Consent Banner

const consentHTML = `
<div id="cookieConsentBanner" class="cookie-consent-banner">
  <div class="container">
    <div class="cookie-consent-content">
      <div style="flex: 1; text-align: left; font-size: 0.9rem; color: var(--gray-600);">
        Nós utilizamos cookies para personalizar anúncios (Google AdSense) e analisar nosso tráfego em total conformidade com a LGPD. 
        Ao continuar navegando, você concorda com nossos <a href="termos-uso.html" style="text-decoration: underline; font-weight: 600;">Termos de Uso</a> 
        e com nossa <a href="politica-privacidade.html" style="text-decoration: underline; font-weight: 600;">Política de Privacidade</a>.
      </div>
      <div>
        <button id="acceptCookieConsent" class="btn btn-success" style="font-weight: bold; padding: 0.5rem 1.5rem;">Aceitar Cookies</button>
      </div>
    </div>
  </div>
</div>
`;

document.addEventListener("DOMContentLoaded", () => {
  // Injeta o banner no body
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = consentHTML;
  document.body.appendChild(tempDiv.firstElementChild);

  const banner = document.getElementById("cookieConsentBanner");
  const acceptBtn = document.getElementById("acceptCookieConsent");

  // Verifica se o consentimento já foi aceito
  const isAccepted = getCookie("cookieConsentAccepted") || localStorage.getItem("cookieConsentAccepted");

  if (!isAccepted) {
    banner.style.display = "block";
  }

  acceptBtn.addEventListener("click", () => {
    // Define cookie expirando em 365 dias
    setCookie("cookieConsentAccepted", "true", 365);
    localStorage.setItem("cookieConsentAccepted", "true");
    banner.style.display = "none";
  });
});

// Funções Helpers para Cookies
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
