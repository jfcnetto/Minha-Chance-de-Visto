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

// 3. Alternar Abas do Simulador (RN05)
function switchTab(tabId, wrapperId) {
  const wrapper = document.getElementById(wrapperId);
  if (!wrapper) return;
  
  wrapper.querySelectorAll('.calc-tab-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  wrapper.querySelectorAll('.calc-tab-btn').forEach(btn => {
    btn.classList.remove('active');
    btn.classList.remove('gc-tab-active');
  });
  
  const targetPanel = wrapper.querySelector('#' + tabId);
  const targetBtn = wrapper.querySelector('#btn-' + tabId);
  
  if (targetPanel) targetPanel.classList.add('active');
  if (targetBtn) {
    targetBtn.classList.add('active');
    if (tabId.includes('greencard')) {
      targetBtn.classList.add('gc-tab-active');
    }
  }
}

// 4. Mostrar/ocultar condicionalmente o país de exceção para a Loteria (RN06)
function handleGcCategoryChange(selectElement) {
  const container = selectElement.closest('.calc-tab-panel');
  if (!container) return;
  const exceptionContainer = container.querySelector('.gc-pais-excecao-container');
  if (exceptionContainer) {
    const input = exceptionContainer.querySelector('select');
    if (selectElement.value === 'loteria') {
      exceptionContainer.style.display = 'block';
      if (input) input.setAttribute('required', 'required');
    } else {
      exceptionContainer.style.display = 'none';
      if (input) {
        input.removeAttribute('required');
        input.value = "";
      }
    }
  }
}

// 5. Algoritmo de Cálculo da Chance de Green Card (RN05, RN06, RN07, RN08)
function calculateGreenCardChance(event) {
  event.preventDefault();
  
  const form = event.target;
  const gcCategoria = form.querySelector("#gcCategoria").value;
  const gcQualificacao = form.querySelector("#gcQualificacao").value;
  const gcSituacao = form.querySelector("#gcSituacao").value;
  
  if (!gcCategoria || !gcQualificacao || !gcSituacao) {
    alert("Por favor, preencha todas as perguntas para obter o seu diagnóstico.");
    return;
  }
  
  const C_weights = {
    casamento_cidadao: 45,
    parentesco_direto: 45,
    eb1: 35,
    eb2: 30,
    eb5: 30,
    asilo: 20,
    eb3: 22,
    casamento_residente: 20,
    loteria: 15,
    parentesco_indireto: 10
  };
  
  const Q_weights = {
    robusta: 30,
    moderada: 15,
    fragil: 0
  };
  
  const D_weights = {
    consular: 25,
    ajuste: 25,
    nunca: 10,
    irregular: -15
  };
  
  let C = C_weights[gcCategoria] || 0;
  let Q = Q_weights[gcQualificacao] || 0;
  let D = D_weights[gcSituacao] || 0;
  
  // Tratamento da Loteria de Vistos para Brasileiros (RN06)
  if (gcCategoria === "loteria") {
    const gcPaisExcecao = form.querySelector("#gcPaisExcecao").value;
    if (gcPaisExcecao === "inelegivel") {
      C = 0;
    }
  }
  
  // Fator de ajuste por prioridade (Fila vs Imediato)
  const categoriesWithQueue = ["eb2", "eb3", "casamento_residente", "parentesco_indireto", "loteria"];
  const Ap = categoriesWithQueue.includes(gcCategoria) ? 0.80 : 1.0;
  
  // Cálculo final do score
  let score = Math.round((C + Q + D) * Ap);
  score = Math.max(10, score);
  score = Math.min(100, score);
  
  const resultadoDiv = form.parentNode.querySelector(".resultadoCalculoGc");
  if (!resultadoDiv) return;
  
  resultadoDiv.style.display = "block";
  
  let alertClass = "";
  let tituloResultado = "";
  let recomendacoes = "";
  let tempoFila = "";
  
  // Definição das faixas de tempo estimadas (RN07)
  if (gcCategoria === "casamento_cidadao" || gcCategoria === "parentesco_direto") {
    tempoFila = "12 a 18 meses (Aproximação de prioridade imediata)";
  } else if (gcCategoria === "eb1") {
    tempoFila = "12 a 24 meses (Prioridade alta)";
  } else if (gcCategoria === "eb5") {
    tempoFila = "18 a 30 meses (Processamento prioritário de investidor)";
  } else if (gcCategoria === "asilo") {
    tempoFila = "2 a 5 anos (Depende da fila das cortes de imigração)";
  } else if (gcCategoria === "eb2") {
    tempoFila = "2 a 4 anos (Sujeito a fila do Visa Bulletin)";
  } else if (gcCategoria === "eb3") {
    tempoFila = "3 a 5 anos (Sujeito a fila do Visa Bulletin)";
  } else if (gcCategoria === "casamento_residente") {
    tempoFila = "2 a 3 anos (Fila F2A do Visa Bulletin)";
  } else if (gcCategoria === "parentesco_indireto") {
    tempoFila = "8 a 15 anos (Fila de baixa prioridade familiar)";
  } else if (gcCategoria === "loteria") {
    tempoFila = "1 a 2 anos (Processamento anual imediato se selecionado)";
  } else {
    tempoFila = "Variável conforme categoria";
  }
  
  // Classes de output visual
  if (score >= 70) {
    alertClass = "alert-success bg-success-light";
    tituloResultado = `Caminho Forte (${score}%)`;
    recomendacoes = `
      <p><strong>Excelente enquadramento!</strong> Seu perfil atende muito bem aos critérios exigidos para esta categoria de imigração permanente.</p>
      <ul>
        <li><strong>Tempo Estimado de Tramitação:</strong> ${tempoFila}</li>
        <li>Inicie a preparação e tradução juramentada de todos os documentos qualificadores (como portfólios, diplomas ou certidões).</li>
        <li>Se estiver aplicando por vias profissionais (EB-1/EB-2), elabore um plano de negócios ou declaração de interesse nacional robusto.</li>
      </ul>
    `;
  } else if (score >= 40 && score < 70) {
    alertClass = "alert-warning";
    tituloResultado = `Caminho Possível, com Pontos de Atenção (${score}%)`;
    recomendacoes = `
      <p><strong>Perfil Viável com ressalvas:</strong> Existem pontos que exigem reforço na sua documentação ou sua categoria está sujeita a longas filas de espera.</p>
      <ul>
        <li><strong>Tempo Estimado de Tramitação:</strong> ${tempoFila}</li>
        <li><strong>Sugestão:</strong> Foque em robustecer as provas materiais de elegibilidade (mais evidências de relacionamento para casamento, ou publicações/artigos científicos e experiência para vistos de trabalho).</li>
        <li>Considere estudar melhor o Visa Bulletin para acompanhar a evolução da sua fila de prioridade.</li>
      </ul>
    `;
  } else {
    alertClass = "alert-danger";
    tituloResultado = `Caminho Requer Estruturação (${score}%)`;
    recomendacoes = `
      <p><strong>Caminho complexo detectado:</strong> Há lacunas significativas de qualificação ou histórico que elevam consideravelmente o risco do processo.</p>
      <ul>
        <li><strong>Tempo Estimado de Tramitação:</strong> ${tempoFila}</li>
        <li><strong>Orientação importante:</strong> Evite dar início ao processo ou realizar pagamentos de taxas elevadas sem antes ter uma estruturação robusta do perfil.</li>
        <li>Caso a sua via pretendida seja a Loteria de Vistos, lembre-se de que o Brasil não é elegível, a menos que se enquadre em exceções específicas de nascimento de cônjuge/pais.</li>
      </ul>
    `;
  }
  
  // Alerta da Loteria
  let loteriaWarning = "";
  if (gcCategoria === "loteria") {
    const gcPaisExcecao = form.querySelector("#gcPaisExcecao").value;
    if (gcPaisExcecao === "inelegivel") {
      loteriaWarning = `
        <div class="alert alert-danger my-2" style="font-size: 0.85rem; padding: 10px; text-align: left;">
          <strong>Alerta de Elegibilidade:</strong> O Brasil não faz parte da lista de países elegíveis para a Loteria de Vistos (Diversity Visa).<br>Como você não indicou uma exceção válida de país de nascimento de cônjuge ou pais, suas chances reais nesta via são nulas.
        </div>
      `;
    }
  }
  
  resultadoDiv.innerHTML = `
    <div class="alert ${alertClass}">
      <h4 class="mb-2"><strong>Resultado da Simulação de Green Card:</strong> ${tituloResultado}</h4>
      ${loteriaWarning}
      ${recomendacoes}
      <hr class="my-2">
      <div style="background-color: rgba(255,255,255,0.7); padding: 10px; border-radius: 4px; font-size: 0.8rem; margin-top: 10px; border-left: 4px solid var(--danger); text-align: left; color: var(--dark);">
        <strong>Isenção de Responsabilidade Reforçada:</strong><br>A obtenção de residência permanente (Green Card) nos EUA envolve trâmites legais de altíssima complexidade sob a jurisdição do USCIS e Departamento de Estado.<br>Esta calculadora fornece uma mera estimativa com base em regras estáticas e genéricas.<br><strong>Este resultado NÃO substitui uma consulta legal com um advogado de imigração licenciado.</strong>
      </div>
    </div>
  `;
  
  resultadoDiv.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

