// Minha Chance de Visto - Lógica de Negócio e FAQ

// 1. Algoritmo do Simulador de Chance de Visto
function calculateVisaChance(event) {
  event.preventDefault();

  // Valores de inputs do formulário
  const visaType = document.getElementById("visaType").value;
  const vincSocio = document.getElementById("vincSocio").value;
  const capFinanceira = document.getElementById("capFinanceira").value;
  const histMigratorio = document.getElementById("histMigratorio").value;

  if (!visaType || !vincSocio || !capFinanceira || !histMigratorio) {
    alert("Por favor, preencha todas as perguntas para obter o seu diagnóstico.");
    return;
  }

  // Pesos de Vínculos (V)
  let V = 5; // Default: Poucos vínculos
  if (vincSocio === "estaveis") V = 40;
  else if (vincSocio === "moderados") V = 20;

  // Pesos Financeiro (F)
  let F = 0; // Default: Limitada
  if (capFinanceira === "excelente") F = 30;
  else if (capFinanceira === "moderada") F = 15;

  // Pesos Histórico (H)
  let H = -20; // Default: Crítico
  if (histMigratorio === "positivo") H = 30;
  else if (histMigratorio === "neutro") H = 15;

  // Fator de ajuste por tipo de solicitação (Av)
  const Av = visaType === "greencard" ? 0.85 : 1.0;

  // Cálculo da pontuação final
  let score = Math.round((V + F + H) * Av);

  // Regra de ouro: Score mínimo de 10%
  score = Math.max(10, score);
  // Garantir também que não ultrapasse 100%
  score = Math.min(100, score);

  // Exibição e Estilização do Resultado
  const resultadoDiv = document.getElementById("resultadoCalculo");
  resultadoDiv.style.display = "block";

  let alertClass = "";
  let tituloResultado = "";
  let recomendacoes = "";

  if (score >= 70) {
    alertClass = "alert-success";
    tituloResultado = `Chance Alta (${score}%)`;
    recomendacoes = `
      <p><strong>Parabéns!</strong> Seu perfil apresenta excelentes indicadores de aprovação baseado na praxe consular tradicional.</p>
      <ul>
        <li>Certifique-se de que todas as informações preenchidas no formulário DS-160 coincidam exatamente com seus documentos físicos.</li>
        <li>Leve comprovantes de todos os seus bens e contratos de trabalho no dia da entrevista.</li>
        <li>Seja calmo, direto e honesto na hora de responder às perguntas do cônsul.</li>
      </ul>
    `;
  } else if (score >= 40 && score < 70) {
    alertClass = "alert-warning";
    tituloResultado = `Chance Moderada (${score}%)`;
    recomendacoes = `
      <p><strong>Atenção:</strong> Seu perfil possui boas chances, mas apresenta pontos fracos que podem gerar dúvidas no agente consular.</p>
      <ul>
        <li><strong>Dica principal:</strong> Fortaleça a comprovação dos seus vínculos ativos no Brasil (como faculdade, emprego atual ou negócios) antes de agendar sua entrevista.</li>
        <li>Evite inconsistências na sua renda e certifique-se de que há fundos suficientes e declarados para cobrir todas as despesas da viagem sem depender de terceiros informais.</li>
        <li>Tenha clareza no seu roteiro de viagem ao ser questionado.</li>
      </ul>
    `;
  } else {
    alertClass = "alert-danger";
    tituloResultado = `Atenção Requerida (${score}%)`;
    recomendacoes = `
      <p><strong>Perfil de Risco:</strong> O simulador identificou pontos de alerta consideráveis em relação à intenção de imigração ou insuficiência financeira/vínculos.</p>
      <ul>
        <li><strong>Orientação:</strong> Recomendamos não aplicar para o visto com pressa. Foque em estruturar melhor sua estabilidade profissional e financeira no Brasil primeiro.</li>
        <li>Evite dar a entender que a viagem tem caráter definitivo ou de busca por emprego informal.</li>
        <li>Considere obter orientação profissional antes de submeter uma nova solicitação se já teve um visto negado recentemente.</li>
      </ul>
    `;
  }

  resultadoDiv.innerHTML = `
    <div class="alert ${alertClass}">
      <h4 class="mb-2"><strong>Resultado da Simulação:</strong> ${tituloResultado}</h4>
      ${recomendacoes}
      <hr class="my-2">
      <small style="font-size: 0.75rem; display: block; margin-top: 5px;">
        Este diagnóstico é educacional e serve apenas como uma estimativa.
      </small>
    </div>
  `;

  // Rolar a tela suavemente até o resultado do cálculo
  resultadoDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// 2. Lógica para expandir/recolher as perguntas frequentes (FAQ)
function toggleFaq(event) {
  const faqItem = event.currentTarget.closest(".faq-item");
  const answer = faqItem.querySelector(".faq-answer");
  
  const isCurrentlyOpen = faqItem.classList.contains("active");
  
  // Fecha todas as outras perguntas do FAQ
  document.querySelectorAll(".faq-item").forEach(item => {
    item.classList.remove("active");
    item.querySelector(".faq-answer").classList.remove("show");
  });

  // Alterna o estado da clicada
  if (!isCurrentlyOpen) {
    faqItem.classList.add("active");
    answer.classList.add("show");
  }
}
