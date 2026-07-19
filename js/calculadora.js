// Minha Chance de Visto - Calculator Component HTML Fragment
const calculatorHTML = `
<div class="card">
  <h2 class="card-title text-center mb-4">Calcule a chance do seu visto ser aprovado</h2>
  <p class="text-muted text-center mb-4">
    Responda às 4 perguntas fundamentais com base na praxe consular tradicional e receba o diagnóstico instantâneo.
  </p>

  <form id="visaCalcForm" onsubmit="calculateVisaChance(event)">
    <!-- 1. Objetivo da viagem -->
    <div class="form-group">
      <label for="visaType" class="form-label">Qual é o objetivo principal da sua viagem?</label>
      <select id="visaType" class="form-select" required>
        <option value="" disabled selected>Selecione uma opção...</option>
        <option value="turismo">Turismo ou Negócios (Visto B1/B2)</option>
        <option value="estudante">Estudos ou Intercâmbio (Visto F1/J1)</option>
        <option value="greencard">Residência Permanente (Green Card - Imigração)</option>
      </select>
    </div>

    <!-- 2. Vínculos socioeconômicos -->
    <div class="form-group">
      <label for="vincSocio" class="form-label">Como são os seus vínculos socioeconômicos com o Brasil?</label>
      <select id="vincSocio" class="form-select" required>
        <option value="" disabled selected>Selecione uma opção...</option>
        <option value="estaveis">Múltiplos vínculos estáveis (emprego fixo há mais de 1 ano e/ou bens imóveis registrados)</option>
        <option value="moderados">Vínculos moderados (apenas emprego estável ou apenas cursando faculdade/estudo regular)</option>
        <option value="poucos">Poucos ou nenhum vínculo estável (desempregado ou sem bens, trabalho informal recente)</option>
      </select>
    </div>

    <!-- 3. Capacidade financeira -->
    <div class="form-group">
      <label for="capFinanceira" class="form-label">Qual é a sua capacidade financeira para custear a viagem?</label>
      <select id="capFinanceira" class="form-select" required>
        <option value="" disabled selected>Selecione uma opção...</option>
        <option value="excelente">Excelente (renda comprovada compatível com padrão americano e reserva financeira sólida)</option>
        <option value="moderada">Moderada (comprova o básico para cobrir a permanência e as passagens sem luxo)</option>
        <option value="limitada">Limitada (dependência de patrocinadores terceiros ou recursos financeiros reduzidos)</option>
      </select>
    </div>

    <!-- 4. Histórico migratório -->
    <div class="form-group">
      <label for="histMigratorio" class="form-label">Qual é o seu histórico migratório internacional?</label>
      <select id="histMigratorio" class="form-select" required>
        <option value="" disabled selected>Selecione uma opção...</option>
        <option value="positivo">Positivo (viagens anteriores recentes para países desenvolvidos, retornando no prazo)</option>
        <option value="neutro">Neutro (passaporte limpo, primeira viagem ao exterior)</option>
        <option value="critico">Crítico (histórico de visto americano negado anteriormente ou problemas de imigração)</option>
      </select>
    </div>

    <button type="submit" class="btn btn-primary btn-block py-3 mt-3">Calcular Chance de Visto Americano</button>
  </form>

  <!-- Espaço de resultado -->
  <div id="resultadoCalculo" class="mt-4" style="display: none;">
    <!-- Será preenchido via JavaScript -->
  </div>

  <!-- RN04: Espaço de resultado AdSense imediatamente abaixo do botão/resultado -->
  <div class="adsense-placeholder">
    <span>[Espaço Publicitário - Google AdSense (Resultado)]</span>
  </div>
</div>
`;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("calculator-placeholder");
  if (container) {
    container.innerHTML = calculatorHTML;
  }
});
