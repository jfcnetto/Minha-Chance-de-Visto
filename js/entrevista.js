// Minha Chance de Visto - Simulador de Entrevista Consular Interativo
// Motor de Diálogo Dinâmico e Cenários de Avaliação

const SCENARIOS = {
  "turismo-jovem": {
    title: "Visto de Turismo (B1/B2) - Jovem Solteiro",
    description: "Cenário: Solteiro(a), 22 anos, estudante universitário ou recém-formado com passaporte sem viagens anteriores.",
    questions: [
      {
        question: "Qual o objetivo da sua viagem aos Estados Unidos?",
        options: [
          {
            text: "Vou fazer turismo em Orlando por 10 dias nas minhas férias da faculdade.",
            points: 20,
            type: "safe",
            feedback: "Excelente! Resposta curta, objetiva, define um destino e tempo curto condizente com férias universitárias."
          },
          {
            text: "Quero conhecer a cultura, praticar inglês e quem sabe ver se tem alguma oportunidade de estudo por lá.",
            points: 10,
            type: "risk",
            feedback: "Risco Moderado. Falar em 'oportunidade de estudo' com visto de turismo ativa um sinal de alerta de intenção de mudar de status."
          },
          {
            text: "Vou viajar, dar uma descansada, e talvez fazer alguns bicos se surgir a oportunidade para cobrir os gastos.",
            points: 0,
            type: "fatal",
            feedback: "Negativa Fatal! Falar a palavra 'trabalho' ou 'bicos' sob visto de turismo resulta em recusa imediata de visto sob a seção 214(b)."
          }
        ]
      },
      {
        question: "Quem vai financiar a sua viagem?",
        options: [
          {
            text: "Meus pais estão pagando a viagem como presente. Trouxe os extratos e a declaração de imposto de renda deles.",
            points: 20,
            type: "safe",
            feedback: "Segura. É normal e aceitável que pais patrocinem viagens de filhos estudantes, desde que a renda deles seja comprovada."
          },
          {
            text: "Eu mesmo vou pagar. Tenho guardado um dinheiro que ganho trabalhando como autônomo sem registro.",
            points: 10,
            type: "risk",
            feedback: "Risco Moderado. Sem registros formais ou imposto de renda, o consulado tem dificuldade em verificar a origem dos recursos."
          },
          {
            text: "Um amigo que mora em Boston me convidou e vai pagar tudo para mim lá.",
            points: 0,
            type: "fatal",
            feedback: "Negativa Fatal! Ter terceiros não familiares pagando sua viagem (especialmente residindo nos EUA) indica forte risco de facilitação imigratória."
          }
        ]
      },
      {
        question: "Você tem parentes nos Estados Unidos?",
        options: [
          {
            text: "Não, nenhum parente.",
            points: 20,
            type: "safe",
            feedback: "Segura. Diminui consideravelmente a suspeita de rede de apoio para permanência ilegal."
          },
          {
            text: "Tenho apenas conhecidos de infância que moram em Miami.",
            points: 15,
            type: "safe",
            feedback: "Segura. Amigos ou conhecidos não contam como parentes diretos, sendo desnecessário e arriscado enfatizá-los na entrevista."
          },
          {
            text: "Sim, meu tio mora lá há alguns anos. Ele foi com visto de turista e acabou ficando.",
            points: 0,
            type: "fatal",
            feedback: "Negativa Fatal! Parentes que imigraram de forma irregular ou ajustaram status de forma suspeita transferem a presunção de risco diretamente para você."
          }
        ]
      },
      {
        question: "O que você faz atualmente no Brasil?",
        options: [
          {
            text: "Estou no 6º período de Engenharia na USP e faço estágio remunerado em uma multinacional.",
            points: 20,
            type: "safe",
            feedback: "Excelente! Estar no meio do curso em uma boa instituição com estágio ativo constitui um vínculo acadêmico fortíssimo."
          },
          {
            text: "Estou trabalhando como freelancer e pensando em começar uma faculdade no ano que vem.",
            points: 10,
            type: "risk",
            feedback: "Risco Moderado. Freelancer sem contrato estável ou matrícula ativa demonstra poucos vínculos de retenção no Brasil."
          },
          {
            text: "Acabei de pedir demissão do meu emprego para poder viajar sem pressa.",
            points: 0,
            type: "fatal",
            feedback: "Negativa Fatal! Estar desempregado e sem planos concretos no Brasil indica que você não tem nenhum motivo forte para retornar."
          }
        ]
      },
      {
        question: "Onde você vai se hospedar nos EUA?",
        options: [
          {
            text: "Fiz uma reserva de hotel em Orlando. Trouxe a confirmação provisória impressa.",
            points: 20,
            type: "safe",
            feedback: "Excelente. Mostra planejamento turístico regular compatível com o perfil solicitado."
          },
          {
            text: "Ainda não decidi, vou ver um Airbnb quando estiver mais perto ou me hospedar onde for mais barato.",
            points: 10,
            type: "risk",
            feedback: "Risco Moderado. Falta de planejamento básico de acomodação demonstra inconsistência financeira e de roteiro."
          },
          {
            text: "Vou ficar na casa de uma pessoa que conheci pela internet e que me ofereceu abrigo gratuito.",
            points: 0,
            type: "fatal",
            feedback: "Negativa Fatal! Hospedar-se gratuitamente com estranhos ou contatos informais aponta para perfil de imigração desordenada."
          }
        ]
      }
    ]
  },
  "turismo-familia": {
    title: "Visto de Turismo (B1/B2) - Família Completa",
    description: "Cenário: Casal com filhos menores, estabilidade profissional e bens no Brasil, solicitando vistos conjuntos.",
    questions: [
      {
        question: "Qual o roteiro de viagem de vocês?",
        options: [
          {
            text: "Vamos passar 12 dias em Nova York conhecendo os pontos turísticos principais e museus.",
            points: 20,
            type: "safe",
            feedback: "Segura. Roteiro clássico, tempo curto e perfeitamente compatível com férias familiares estruturadas."
          },
          {
            text: "Queremos rodar o país de carro, saindo da Flórida até a Califórnia, sem uma data fixa para acabar.",
            points: 10,
            type: "risk",
            feedback: "Risco Moderado. Viagens familiares sem prazos ou datas de retorno delimitadas ativam suspeitas sobre abandono de base no país de origem."
          },
          {
            text: "Pretendemos ir para New Jersey onde temos conhecidos e vamos ver onde nos acomodamos melhor por lá.",
            points: 0,
            type: "fatal",
            feedback: "Negativa Fatal! Destinos tradicionais de colônias brasileiras informais atrelados a falta de reservas de hotel sinalizam intenção migratória."
          }
        ]
      },
      {
        question: "Com o que o senhor e a senhora trabalham no Brasil?",
        options: [
          {
            text: "Sou gerente comercial há 5 anos na Ambev e minha esposa é dentista com consultório próprio.",
            points: 20,
            type: "safe",
            feedback: "Excelente! Emprego CLT estável de longo prazo e consultório/empresa ativa no Brasil comprovam laços financeiros inabaláveis."
          },
          {
            text: "Nós trabalhamos com vendas de produtos online de forma autônoma.",
            points: 10,
            type: "risk",
            feedback: "Risco Moderado. O trabalho remoto facilita a atuação de qualquer lugar do mundo, enfraquecendo a necessidade de retorno físico."
          },
          {
            text: "Estamos vivendo de rendimentos de alguns bicos informais ultimamente.",
            points: 0,
            type: "fatal",
            feedback: "Negativa Fatal! Falta de renda formal declarada impossibilita a aprovação de uma viagem familiar que envolve altos custos em dólar."
          }
        ]
      },
      {
        question: "Vocês possuem parentes residindo nos EUA?",
        options: [
          {
            text: "Não, nenhum parente nos Estados Unidos.",
            points: 20,
            type: "safe",
            feedback: "Segura. Descaracteriza risco de facilitação de rede familiar."
          },
          {
            text: "Temos um cunhado que está lá estudando temporariamente com visto de estudante regular.",
            points: 15,
            type: "safe",
            feedback: "Segura. Ter parentes com vistos temporários válidos (estudos, trabalho corporativo) não prejudica o pleito."
          },
          {
            text: "Minha irmã mora lá. Ela entrou pelo México mas agora já está regularizada por casamento.",
            points: 0,
            type: "fatal",
            feedback: "Negativa Fatal! Histórico de entrada ilegal ou ajuste de status suspeito de familiares diretos é um dos principais motivos de recusa em grupo."
          }
        ]
      },
      {
        question: "Por que decidiram viajar todos juntos nesta época?",
        options: [
          {
            text: "Aproveitamos o período de férias escolares das crianças para realizar essa viagem de lazer em família.",
            points: 20,
            type: "safe",
            feedback: "Perfeito. Justificativa natural, coerente e amplamente comum em solicitações familiares legítimas."
          },
          {
            text: "Achamos que seria uma boa oportunidade para as crianças conhecerem as escolas de lá e decidirmos nosso futuro.",
            points: 5,
            type: "fatal",
            feedback: "Negativa Fatal! Indicar interesse em matricular crianças em escolas americanas com visto de turismo é confissão de intenção de moradia ilegal."
          },
          {
            text: "Decidimos ir para passar uma temporada longa e ver se nos adaptamos ao estilo de vida americano.",
            points: 0,
            type: "fatal",
            feedback: "Negativa Fatal! Falar em 'temporada longa' para 'adaptação' viola a natureza temporária exigida pelo visto B1/B2."
          }
        ]
      },
      {
        question: "Vocês possuem bens registrados ou imóveis no Brasil?",
        options: [
          {
            text: "Sim, possuímos casa própria quitada e dois automóveis. Trouxemos as escrituras e CRLVs.",
            points: 20,
            type: "safe",
            feedback: "Excelente! Bens de alto valor físico comprovam que a família possui raízes patrimoniais sólidas no país de origem."
          },
          {
            text: "Temos bens, mas estão registrados no nome dos nossos pais para facilitar trâmites.",
            points: 10,
            type: "risk",
            feedback: "Risco Moderado. Bens em nome de terceiros (mesmo pais) não possuem valor comprobatório legal imediato para o seu perfil."
          },
          {
            text: "Não possuímos nenhum bem, moramos de aluguel e vendemos nossos carros recentemente.",
            points: 5,
            type: "risk",
            feedback: "Risco Alto. A ausência total de patrimônio físico facilita a decisão de abandonar o país de origem permanentemente."
          }
        ]
      }
    ]
  },
  "estudante": {
    title: "Visto de Estudante (F-1) - Curso Acadêmico",
    description: "Cenário: Solteiro, 25 anos, graduado, solicitando visto F-1 para curso de pós-graduação ou inglês intensivo.",
    questions: [
      {
        question: "Qual o curso que você vai fazer e por que escolheu esta escola?",
        options: [
          {
            text: "Vou fazer um mestrado em Finanças na Boston University. Escolhi pelo prestígio acadêmico da instituição e alinhamento com minha carreira.",
            points: 20,
            type: "safe",
            feedback: "Excelente! Cursos de nível superior (graduação/mestrado) em instituições renomadas têm taxas altíssimas de aprovação."
          },
          {
            text: "Vou estudar inglês por 6 meses em uma escola de idiomas. Quero apenas melhorar meu vocabulário básico.",
            points: 15,
            type: "safe",
            feedback: "Segura. Cursos de idiomas são aceitáveis, desde que o aplicante demonstre de forma clara a necessidade profissional de proficiência."
          },
          {
            text: "Vou fazer um curso livre qualquer em uma escola comunitária barata. Escolhi porque era a mais em conta que achei para conseguir o I-20.",
            points: 0,
            type: "fatal",
            feedback: "Negativa Fatal! Escolher escolas de baixa categoria apenas para obter o documento de visto (I-20) aponta para fraude imigratória."
          }
        ]
      },
      {
        question: "Como você pretende pagar pelo curso e pela sua estada nos EUA?",
        options: [
          {
            text: "Minha empresa aprovou um patrocínio parcial e o restante será coberto por economias pessoais líquidas em conta corrente.",
            points: 20,
            type: "safe",
            feedback: "Excelente. Recursos líquidos em conta do próprio estudante ou com patrocínio corporativo formal são muito bem vistos."
          },
          {
            text: "Vou usar a renda do meu trabalho como freelancer que pretendo continuar realizando online enquanto estiver estudando lá.",
            points: 5,
            type: "fatal",
            feedback: "Negativa Fatal! Portadores de visto F-1 são proibidos por lei de trabalhar nos EUA (mesmo remoto). Falar isso causa recusa imediata."
          },
          {
            text: "Vou trabalhar meio período no campus ou arrumar algum trabalho informal em restaurantes para ajudar nas despesas.",
            points: 0,
            type: "fatal",
            feedback: "Negativa Fatal! Trabalho informal ilegal viola expressamente as leis do visto de estudante F-1, levando à recusa e possível banimento."
          }
        ]
      },
      {
        question: "O que você faz atualmente no Brasil e qual seu nível de inglês?",
        options: [
          {
            text: "Sou analista de sistemas sênior e já possuo nível intermediário. Preciso do curso avançado para assumir cargo de liderança.",
            points: 20,
            type: "safe",
            feedback: "Excelente! Ter carreira estabelecida e justificativa profissional concreta valida a lógica do curso nos EUA."
          },
          {
            text: "Terminei o ensino médio há dois anos e não estudei ou trabalhei de forma fixa desde então.",
            points: 5,
            type: "risk",
            feedback: "Risco Alto. Longos períodos de inatividade sem explicação demonstram perfil com baixo vínculo e risco de imigração por falta de perspectiva no Brasil."
          },
          {
            text: "Não trabalho no momento e meu inglês é totalmente nulo, não sei nenhuma palavra.",
            points: 10,
            type: "risk",
            feedback: "Risco Moderado. Embora seja comum ir estudar inglês, a falta total de esforço prévio pode levantar dúvidas sobre a real intenção de estudo."
          }
        ]
      },
      {
        question: "Você tem planos de trabalhar nos EUA após a conclusão do curso?",
        options: [
          {
            text: "Não. Meu plano é retornar imediatamente ao Brasil para aplicar os conhecimentos adquiridos na minha área de atuação.",
            points: 20,
            type: "safe",
            feedback: "Excelente. Reforça o caráter temporário obrigatório de vistos de estudante não-imigrante."
          },
          {
            text: "Se surgir alguma oportunidade legal de estágio (como OPT), pretendo fazer por um ano antes de retornar.",
            points: 18,
            type: "safe",
            feedback: "Segura. O OPT (Optional Practical Training) é um benefício legal e regulamentado do próprio visto F-1, sendo aceitável mencioná-lo."
          },
          {
            text: "Sim, espero conseguir um patrocinador de visto de trabalho H-1B para poder morar lá em definitivo.",
            points: 0,
            type: "fatal",
            feedback: "Negativa Fatal! Vistos de estudante não permitem intenção de imigração dupla ou residência permanente no ato da entrevista."
          }
        ]
      },
      {
        question: "Por que você não faz esse curso de idiomas ou especialização no Brasil?",
        options: [
          {
            text: "A imersão cultural acelerará minha fluência de forma que nenhum curso local conseguiria. Além disso, a metodologia da instituição americana é única.",
            points: 20,
            type: "safe",
            feedback: "Excelente. Resposta lógica, coerente e com bom senso de propósito acadêmico."
          },
          {
            text: "Porque no Brasil os cursos são muito chatos e quero viver a experiência de morar nos Estados Unidos.",
            points: 10,
            type: "risk",
            feedback: "Risco Moderado. Falar em 'experiência de morar' desloca o foco da educação para o interesse residencial temporário ou definitivo."
          },
          {
            text: "Porque lá é muito mais fácil de conseguir empregos e construir a vida do que aqui.",
            points: 0,
            type: "fatal",
            feedback: "Negativa Fatal! Foco no mercado de trabalho americano em vez do propósito de estudo é recusa garantida."
          }
        ]
      }
    ]
  },
  "green-card": {
    title: "Visto de Imigração / Green Card (EB-2 NIW / Trabalho)",
    description: "Cenário: Profissional com carreira sólida e diploma avançado pleiteando visto imigratório profissional sem sponsor.",
    questions: [
      {
        question: "Qual o embasamento legal do seu pleito de Green Card?",
        options: [
          {
            text: "Minha petição de visto de imigração EB-2 NIW foi aprovada pelo USCIS com base no meu mestrado e histórico profissional de relevância nacional.",
            points: 20,
            type: "safe",
            feedback: "Excelente. Citar a aprovação prévia da petição I-140 de forma técnica demonstra que os critérios legais já foram auditados com sucesso."
          },
          {
            text: "Acho que me qualifico porque sou muito bom na minha área de atuação e os EUA precisam de profissionais como eu.",
            points: 10,
            type: "risk",
            feedback: "Risco Moderado. O pleito de visto consular imigratório exige documentação formalizada previamente no USCIS, não achismos."
          },
          {
            text: "Estou indo tentar a sorte e ver se alguma empresa se interessa em fazer meu processo de Green Card lá.",
            points: 0,
            type: "fatal",
            feedback: "Negativa Fatal! Solicitar visto imigratório consular sem petição prévia aprovada pelo USCIS é processualmente impossível."
          }
        ]
      },
      {
        question: "Quais são as suas qualificações e méritos apresentados?",
        options: [
          {
            text: "Possuo mestrado em Biotecnologia, 8 anos de experiência em pesquisa clínica e 4 artigos científicos publicados em periódicos internacionais.",
            points: 20,
            type: "safe",
            feedback: "Excelente! A comprovação objetiva de diplomas avançados e produção acadêmica/técnica atende perfeitamente aos requisitos do EB-2."
          },
          {
            text: "Trabalho há bastante tempo na minha área e sou muito elogiado pelos meus colegas de trabalho.",
            points: 10,
            type: "risk",
            feedback: "Risco Moderado. Elogios informais não substituem evidências documentais objetivas (diplomas, relatórios oficiais, licenças)."
          },
          {
            text: "Não possuo diplomas superiores, mas tenho força de vontade e experiência prática em diversas áreas gerais.",
            points: 5,
            type: "risk",
            feedback: "Risco Alto. Vistos de preferência EB-2 exigem comprovação estrita de bacharelado + 5 anos de experiência progressiva ou grau avançado."
          }
        ]
      },
      {
        question: "Qual o seu plano detalhado de atuação profissional nos EUA?",
        options: [
          {
            text: "Pretendo atuar como pesquisador sênior em laboratórios de desenvolvimento tecnológico, conforme detalhado no meu Plano Profissional (Business Plan) aprovado.",
            points: 20,
            type: "safe",
            feedback: "Excelente. Mostra planejamento sério e conformidade com o interesse nacional alegado na petição inicial."
          },
          {
            text: "Vou procurar qualquer vaga de emprego na minha área quando chegar lá, ou trabalhar em áreas afins.",
            points: 10,
            type: "risk",
            feedback: "Risco Moderado. Demonstra falta de clareza ou execução no plano de desenvolvimento profissional apresentado ao USCIS."
          },
          {
            text: "Pretendo abrir mão da minha área técnica para trabalhar em atividades informais ou comércio básico.",
            points: 0,
            type: "fatal",
            feedback: "Negativa Fatal! Mudar drasticamente de área em relação ao que motivou a dispensa de vaga de trabalho (National Interest Waiver) viola a concessão do visto."
          }
        ]
      },
      {
        question: "Você possui fundos de suporte para o período inicial de transição nos EUA?",
        options: [
          {
            text: "Sim. Possuo reservas financeiras líquidas em dólar suficientes para cobrir os custos de moradia e estabelecimento por pelo menos 6 meses.",
            points: 20,
            type: "safe",
            feedback: "Excelente. Garantir a subsistência inicial sem depender de ajuda governamental ou empréstimos de emergência é essencial."
          },
          {
            text: "Não tenho muitas economias, mas pretendo começar a trabalhar e ganhar dinheiro logo no primeiro dia após a chegada.",
            points: 10,
            type: "risk",
            feedback: "Risco Moderado. A falta de reserva de contingência inicial pode acionar o critério de 'Carga Pública' (Public Charge) e travar a aprovação."
          },
          {
            text: "Vou depender da ajuda financeira de parentes ou amigos locais por tempo indeterminado.",
            points: 5,
            type: "risk",
            feedback: "Risco Alto. Dependência financeira informal de terceiros nos EUA sinaliza instabilidade econômica no pleito de imigração."
          }
        ]
      },
      {
        question: "Apresentou toda a documentação civil original e traduções juramentadas?",
        options: [
          {
            text: "Sim, todos os documentos civis originais, certidões de antecedentes da Polícia Federal e traduções juramentadas estão organizados em ordem física.",
            points: 20,
            type: "safe",
            feedback: "Excelente! Organização e traduções oficiais são requisitos formais básicos para a emissão do visto de imigrante."
          },
          {
            text: "Trouxe apenas as cópias simples em português, pois as traduções são muito caras.",
            points: 0,
            type: "fatal",
            feedback: "Negativa Fatal! A ausência de certidões originais e traduções juramentadas acarreta recusa imediata sob a seção 221(g) para pendências."
          },
          {
            text: "Algumas certidões estão desatualizadas ou vencidas, mas pretendo resolver isso depois.",
            points: 5,
            type: "fatal",
            feedback: "Negativa Fatal! Certidões de antecedentes civis ou criminais vencidas impedem a emissão de qualquer visto imigratório permanente."
          }
        ]
      }
    ]
  }
};

let currentScenario = null;
let currentQuestionIndex = 0;
let totalScore = 0;
let userAnswers = [];

function selectScenario(scenarioId) {
  currentScenario = SCENARIOS[scenarioId];
  currentQuestionIndex = 0;
  totalScore = 0;
  userAnswers = [];
  
  document.getElementById("scenario-selection").style.display = "none";
  document.getElementById("simulation-area").style.display = "block";
  document.getElementById("sim-scenario-title").innerText = currentScenario.title;
  
  renderQuestion();
}

function renderQuestion() {
  const questionData = currentScenario.questions[currentQuestionIndex];
  
  // Limpar feedback anterior
  const feedbackContainer = document.getElementById("sim-feedback-container");
  feedbackContainer.innerHTML = "";
  
  document.getElementById("sim-question-number").innerText = `Pergunta ${currentQuestionIndex + 1} de 5`;
  document.getElementById("sim-question-text").innerHTML = `<strong>Cônsul:</strong> ${questionData.question}`;
  
  const optionsList = document.getElementById("sim-options-list");
  optionsList.innerHTML = "";
  
  questionData.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "sim-option-btn";
    btn.innerText = opt.text;
    btn.onclick = () => selectOption(idx);
    optionsList.appendChild(btn);
  });
}

function selectOption(optionIdx) {
  // Desativar botões após a escolha
  document.querySelectorAll(".sim-option-btn").forEach(btn => btn.disabled = true);
  
  const questionData = currentScenario.questions[currentQuestionIndex];
  const selectedOption = questionData.options[optionIdx];
  
  totalScore += selectedOption.points;
  userAnswers.push({
    question: questionData.question,
    selected: selectedOption.text,
    type: selectedOption.type,
    feedback: selectedOption.feedback
  });
  
  let alertClass = "alert-success";
  let typeLabel = "Resposta Segura / Recomendada";
  
  if (selectedOption.type === "risk") {
    alertClass = "alert-warning";
    typeLabel = "Resposta com Risco Moderado";
  } else if (selectedOption.type === "fatal") {
    alertClass = "alert-danger";
    typeLabel = "Erro Grave / Negativa Consular";
  }
  
  const feedbackContainer = document.getElementById("sim-feedback-container");
  feedbackContainer.innerHTML = `
    <div class="alert ${alertClass} sim-feedback-box">
      <strong>${typeLabel}</strong><br>
      <p class="mt-2 mb-3">${selectedOption.feedback}</p>
      <button class="btn btn-primary btn-sm" onclick="nextStep()">Avançar para Próxima Pergunta</button>
    </div>
  `;
}

function nextStep() {
  currentQuestionIndex++;
  if (currentQuestionIndex < 5) {
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("simulation-area").style.display = "none";
  document.getElementById("result-area").style.display = "block";
  
  let title = "Visto Aprovado com Louvor! 🇺🇸";
  let alertClass = "alert-success";
  let icon = "🎉";
  let explanation = "Seu desempenho na simulação de entrevista demonstrou total coerência, objetividade e conformidade com as exigências consulares dos EUA. Você respondeu de forma limpa, clara e sem acionar os sinais de alerta de intenção imigratória oculta.";
  
  if (totalScore < 50) {
    title = "Visto Negado! ❌";
    alertClass = "alert-danger";
    icon = "⚠️";
    explanation = "Suas respostas acionaram alertas vermelhos graves sob o artigo 214(b) (intenção imigratória implícita) ou demonstraram falta de planejamento estruturado. Respostas longas demais, menções a trabalhar informalmente ou contradições graves são os principais motivos de recusa.";
  } else if (totalScore < 80) {
    title = "Entrevista Inconclusiva! 📊";
    alertClass = "alert-warning";
    icon = "⚖️";
    explanation = "Seu perfil ficou no limite. Embora não tenha cometido nenhuma infração gravíssima, suas respostas foram excessivamente detalhadas ou confusas, o que na vida real costuma deixar a decisão a critério do oficial ou resultar em pendência documental (seção 221g).";
  }
  
  document.getElementById("result-card").className = `alert ${alertClass}`;
  document.getElementById("result-card").innerHTML = `
    <h3 class="mb-2">${icon} ${title}</h3>
    <p class="lead">Sua pontuação na entrevista: <strong>${totalScore} / 100 pontos</strong></p>
    <p>${explanation}</p>
    <div style="font-size: 0.85rem; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 10px; margin-top: 15px;">
      <strong>Isenção de Responsabilidade Importante:</strong> Esta ferramenta possui caráter estritamente lúdico, educacional e simulado. A decisão de aprovar ou negar qualquer visto cabe única e exclusivamente ao oficial consular no momento da entrevista real.
    </div>
  `;
  
  const detailsList = document.getElementById("result-details-list");
  detailsList.innerHTML = "";
  
  userAnswers.forEach((ans, idx) => {
    let color = "#198754"; // Green
    if (ans.type === "risk") color = "#ffc107"; // Yellow
    if (ans.type === "fatal") color = "#b22234"; // Crimson Red
    
    const div = document.createElement("div");
    div.style.marginBottom = "20px";
    div.style.padding = "12px";
    div.style.borderLeft = `4px solid ${color}`;
    div.style.backgroundColor = "var(--gray-200)";
    div.style.borderRadius = "0 6px 6px 0";
    
    div.innerHTML = `
      <strong>Pergunta ${idx + 1}:</strong> ${ans.question}<br>
      <span class="text-muted">Sua Resposta: "${ans.selected}"</span><br>
      <div class="mt-2" style="font-size: 0.85rem;"><strong>Análise:</strong> ${ans.feedback}</div>
    `;
    detailsList.appendChild(div);
  });
}

function resetSimulation() {
  document.getElementById("result-area").style.display = "none";
  document.getElementById("scenario-selection").style.display = "block";
}
