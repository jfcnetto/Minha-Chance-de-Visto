// Minha Chance de Visto - Footer Component
const footerHTML = `
<footer class="py-5 mt-5">
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 mb-4">
        <h5>Minha Chance de Visto</h5>
        <p class="mt-2 text-muted">
          Seu guia gratuito e interativo para entender a praxe consular e os requisitos necessários para solicitar o seu visto americano ou Green Card.
        </p>
      </div>
      <div class="col-12 col-md-6 mb-4">
        <h5>Links Úteis</h5>
        <ul class="list-unstyled mt-2" style="list-style: none; padding-left: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          <li><a href="index.html" class="text-muted">Início</a></li>
          <li><a href="calculadora.html" class="text-muted">Calculadora</a></li>
          <li><a href="documentos.html" class="text-muted">Documentos Necessários</a></li>
          <li><a href="dicas.html" class="text-muted">Dicas de Entrevista</a></li>
          <li><a href="consulados.html" class="text-muted">Consulados no Brasil</a></li>
          <li><a href="sobre.html" class="text-muted">Sobre Nós</a></li>
          <li><a href="contato.html" class="text-muted">Fale Conosco</a></li>
          <li><a href="politica-privacidade.html" class="text-muted">Privacidade</a></li>
          <li><a href="termos-uso.html" class="text-muted">Termos de Uso</a></li>
        </ul>
      </div>
    </div>
    <hr class="my-4" style="border-top: 1px solid var(--gray-300);">
    <div class="row">
      <div class="col-12 text-center text-muted">
        <div class="alert alert-warning mb-4" style="font-size: 0.85rem; text-align: left;">
          <strong>Isenção de Responsabilidade (Disclaimer):</strong> O resultado fornecido por nosso simulador é uma estimativa estatística e educacional baseada na praxe consular tradicional e não garante a aprovação ou negação do visto. Este portal não possui vínculo com o Governo dos Estados Unidos, consulados ou embaixadas, e não substitui a consulta legal com um advogado de imigração licenciado.
        </div>
        <p class="mb-0">&copy; 2026 Minha Chance de Visto. Todos os direitos reservados. Projeto 100% gratuito e em conformidade com a LGPD.</p>
      </div>
    </div>
  </div>
</footer>
`;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("footer-placeholder");
  if (container) {
    container.innerHTML = footerHTML;
  }
});
