// ===== DOCENTES MODULE =====

const DOCENTES_DATA = [
  {
    name: "Prof. Dr. Alexandre Ferreira Ramos",
    email: "alex.ramos@usp.br",
    room: "A1-104B",
    lattes: "https://lattes.cnpq.br/9681052469456395",
    personal: "https://each.usp.br/alexramos/",
    areas: "Classificação da função e dos mecanismos de supressão de flutuações aleatórias em regulação da expressão gênica"
  },
  {
    name: "Profa. Dra. Ana Amélia Benedito Silva",
    email: "aamelia@usp.br",
    room: "301 G – Prédio I1",
    lattes: "https://lattes.cnpq.br/0827495526048435",
    personal: null,
    areas: "Séries Temporais Biológicas"
  },
  {
    name: "Prof. Dr. André Carlos Busanelli de Aquino",
    email: "aquino@usp.br",
    room: null,
    lattes: "https://lattes.cnpq.br/2204782841421432",
    personal: null,
    areas: "Rhythm, organizing e agency em organizações do setor público; Ciclo Financeiro de Governos Locais; Resiliência de organizações públicas"
  },
  {
    name: "Prof. Dr. Andre Cavalcanti Rocha Martins",
    email: "amartins@usp.br",
    room: "319 F – Prédio I1",
    lattes: "https://lattes.cnpq.br/2318177531681999",
    personal: null,
    areas: "Dinâmica Cultural e de Opiniões"
  },
  {
    name: "Profa. Dra. Ariane Machado Lima",
    email: "ariane.machado@usp.br",
    room: "210-N – Edifício A1",
    lattes: "https://lattes.cnpq.br/6342311646947853",
    personal: "https://www.each.usp.br/ariane",
    areas: "Reconhecimento de Padrões, Gramáticas Estocásticas, Classificadores de Sequências, Bioinformática, RNAs não codificantes"
  },
  {
    name: "Prof. Dr. Camilo Rodrigues Neto",
    email: "camiloneto@usp.br",
    room: "322-O – Edifício I1",
    lattes: "https://lattes.cnpq.br/8618151183586924",
    personal: "https://www.each.usp.br/camiloneto/",
    areas: "Sistemas Complexos, Modelagem por agentes, Dinâmica Estocástica, Econofísica, Análise e modelagem multifractal de sinais"
  },
  {
    name: "Profa. Dra. Cláudia Inés Garcia",
    email: "claudiag@usp.br",
    room: "202 G – Prédio I1",
    lattes: "https://lattes.cnpq.br/4327900264403345",
    personal: null,
    areas: "Matemática, com ênfase em Matemática Aplicada"
  },
  {
    name: "Prof. Dr. Clodoaldo Aparecido de Moraes Lima",
    email: "c.lima@usp.br",
    room: "104N – Prédio A1",
    lattes: "https://lattes.cnpq.br/3017337174053381",
    personal: null,
    areas: "Inteligência Artificial, Machine Learning, Métodos de kernel, Análise e Predição de Séries Temporais Financeiras e Biomédicas, Sistemas Biométricos"
  },
  {
    name: "Prof. Dr. Daniel de Angelis Cordeiro",
    email: "daniel.cordeiro@usp.br",
    room: "352D – Edifício I1",
    lattes: "https://lattes.cnpq.br/5322325760113475",
    personal: "https://www.each.usp.br/dc/",
    areas: "Teoria do Escalonamento, Teoria Algorítmica dos Jogos, Computação de Alto Desempenho, Computação Paralela e Distribuída, Computação em Nuvem"
  },
  {
    name: "Prof. Dr. Edmir Parada Vasques Prado",
    email: "eprado@usp.br",
    room: "110M – Edifício A1",
    lattes: "https://lattes.cnpq.br/2091731281771940",
    personal: null,
    areas: "Gestão da Informação e do Conhecimento, Governança e Gestão de Tecnologia da Informação, Sistemas de Informação Organizacionais e Interorganizacionais"
  },
  {
    name: "Prof. Dr. Esteban Fernandez Tuesta",
    email: "tuesta@usp.br",
    room: "346-E – Bloco I1",
    lattes: "https://lattes.cnpq.br/1068554491963326",
    personal: null,
    areas: "Probabilidade Aplicada, Estatística Aplicada, Processos Markovianos e Ciência da Informação"
  },
  {
    name: "Prof. Dr. Fabio Nakano",
    email: "fabionakano@usp.br",
    room: "A1-204E",
    lattes: "https://lattes.cnpq.br/7142543937454545",
    personal: null,
    areas: "Bioinformática, Banco de Dados, Matemática Aplicada"
  },
  {
    name: "Profa. Dra. Fátima de Lourdes dos Santos Nunes Marques",
    email: "fatima.nunes@usp.br",
    room: "210P – Prédio A1",
    lattes: "https://lattes.cnpq.br/8626964624628522",
    personal: null,
    areas: "Realidade Virtual, Processamento de Imagens, Banco de Dados, Sistemas de Auxílio ao Diagnóstico, Treinamento Médico Virtual, Mamografia, Recuperação Baseada em Conteúdo"
  },
  {
    name: "Prof. Dr. Fernando Auil",
    email: "auil@usp.br",
    room: "357 F – Prédio I1",
    lattes: "https://lattes.cnpq.br/9270505088399430",
    personal: null,
    areas: "Abordagem de Beurling da Hipótese de Riemann, Matemática Aplicada"
  },
  {
    name: "Prof. Dr. Flávio Luiz Coutinho",
    email: "flcoutinho@usp.br",
    room: "357 F – Prédio I1",
    lattes: "https://lattes.cnpq.br/3100288618568772",
    personal: null,
    areas: "Rastreamento de olhar, razão cruzada, compensação de movimentos de cabeça e interação humano computador"
  },
  {
    name: "Profa. Dra. Gisele da Silva Craveiro",
    email: "giselesc@usp.br",
    room: "252 – Edifício I1",
    lattes: "https://lattes.cnpq.br/0361123363747622",
    personal: null,
    areas: "Impactos de Sistemas de Informação na Sociedade, Governo eletrônico, Dados Abertos, Governo Aberto, Cultura livre e cultura digital"
  },
  {
    name: "Prof. Dr. Helton Hideraldo Bíscaro",
    email: "heltonhb@usp.br",
    room: "352B – Prédio I1",
    lattes: "https://lattes.cnpq.br/8794441658476782",
    personal: null,
    areas: "Estrutura de Dados, Reconstrução, Nuvem de pontos, Complexos Simpliciais, Teoria de Morse Discreta"
  },
  {
    name: "Prof. Dr. Ivandré Paraboni",
    email: "ivandre@usp.br",
    room: "320F – Edifício I1",
    lattes: "https://lattes.cnpq.br/4979536048261282",
    personal: "https://www.each.usp.br/ivandre",
    areas: "Processamento de Língua Natural, Ciências Cognitivas, Inteligência Artificial, Tecnologia da Língua Humana"
  },
  {
    name: "Prof. Dr. João Luiz Bernardes Júnior",
    email: "jlbernardes@usp.br",
    room: "110G – Edifício A1",
    lattes: "https://lattes.cnpq.br/8529032048850930",
    personal: null,
    areas: "Interação Humano-Computador, Análise e Processamento de Imagens, Computação Gráfica, Visualização Científica, Jogos Digitais, Realidade Virtual e Aumentada"
  },
  {
    name: "Prof. Dr. José de Jesús Pérez Alcázar",
    email: "jperez@usp.br",
    room: "352 F – Prédio I1",
    lattes: "https://lattes.cnpq.br/2201580020088062",
    personal: null,
    areas: "Tecnologia Web, Sistemas de Informação e Engenharia de Software, Inteligência Artificial e Bancos de Dados"
  },
  {
    name: "Prof. Dr. José Ricardo Gonçalves de Mendonça",
    email: "jricardo@usp.br",
    room: null,
    lattes: "https://lattes.cnpq.br/8792749813872106",
    personal: null,
    areas: "Física Estatística, Sistemas de Computação, Empreendedorismo de base tecnológica"
  },
  {
    name: "Profa. Dra. Karina Valdivia Delgado",
    email: "kvd@usp.br",
    room: "104F – Edifício A1",
    lattes: "https://lattes.cnpq.br/8420771612707965",
    personal: "https://www.ime.usp.br/~kvd",
    areas: "Inteligência Artificial, Planejamento Probabilístico, Tomada de decisão, Processos de decisão markovianos"
  },
  {
    name: "Prof. Dr. Karla Roberta Pereira Sampaio Lima",
    email: "ksampaiolima@usp.br",
    room: "104P – Edifício A1",
    lattes: "https://lattes.cnpq.br/8474346566632932",
    personal: null,
    areas: "Otimização Combinatória e Teoria dos Grafos"
  },
  {
    name: "Profa. Dra. Luciane Meneguin Ortega",
    email: "luciane.ortega@usp.br",
    room: "210C – Edifício A1",
    lattes: "https://lattes.cnpq.br/8594007840837513",
    personal: null,
    areas: "Empreendedorismo, Inovação Tecnológica, Inovação Social, Pequenas e Médias Empresas"
  },
  {
    name: "Prof. Dr. Luciano Antonio Digiampietri",
    email: "digiampietri@usp.br",
    room: "110P – Edifício A1",
    lattes: "https://lattes.cnpq.br/1689147340536405",
    personal: "https://each.usp.br/digiampietri",
    areas: "Gerenciamento e Composição Automática de Serviços Web Semânticos, Bioinformática, Mineração de Dados, Análise de Redes Sociais, Educação em Sistemas de Informação"
  },
  {
    name: "Prof. Dr. Luciano Vieira de Araújo",
    email: "lvaraujo@usp.br",
    room: "T10P – Edifício A1",
    lattes: "https://lattes.cnpq.br/2459050725301964",
    personal: null,
    areas: "Banco de Dados, Business Intelligence, Data Warehouse, Bioinformática, Informática em Saúde, HIV, Hepatites, Natural User Interface"
  },
  {
    name: "Prof. Dr. Marcelo de Souza Lauretto",
    email: "marcelolauretto@usp.br",
    room: "104P – Edifício A1",
    lattes: "https://lattes.cnpq.br/2488734578237992",
    personal: "https://www.each.usp.br/lauretto",
    areas: "Testes de Hipóteses Bayesianos, Bioestatística, Bioinformática, Computação Numérica, Inteligência Artificial, Machine Learning, Análise de Riscos, Métodos de Monte Carlo"
  },
  {
    name: "Prof. Dr. Marcelo Fantinato",
    email: "m.fantinato@usp.br",
    room: "110I – Edifício A1",
    lattes: "https://lattes.cnpq.br/8207954538307988",
    personal: "https://www.each.usp.br/fantinato",
    areas: "Mineração de Processos, Gestão de Processos de Negócio (BPM), Internet das Coisas (IoT), Brinquedos Inteligentes e Robôs de Companhia"
  },
  {
    name: "Prof. Dr. Marcelo Medeiros Eler",
    email: "marceloeler@usp.br",
    room: null,
    lattes: "https://lattes.cnpq.br/0170428647417667",
    personal: null,
    areas: "Engenharia de Software, Teste de Software, Geração automática de dados de teste, Governo Eletrônico, Gestão de TI"
  },
  {
    name: "Prof. Dr. Marcelo Morandini",
    email: "m.morandini@usp.br",
    room: "322E – Edifício I1",
    lattes: "https://lattes.cnpq.br/7235951485247158",
    personal: "https://www.each.usp.br/morandini",
    areas: "Engenharia de Software, Interação Humano-Computador, Usabilidade, Ergonomia e Testes de Software"
  },
  {
    name: "Prof. Dr. Marcio Moretto Ribeiro",
    email: "marciomr@usp.br",
    room: null,
    lattes: "https://lattes.cnpq.br/2153927915438535",
    personal: null,
    areas: "Lógicas de Descrição e Revisão de Crenças"
  },
  {
    name: "Prof. Dr. Marcos Lordello Chaim",
    email: "chaim@usp.br",
    room: "322 N – Edifício I1",
    lattes: "https://lattes.cnpq.br/6414738466336890",
    personal: "https://www.each.usp.br/chaim",
    areas: "Engenharia de Software, Teste e Depuração de Software, Manutenção de Software, Métodos de Desenvolvimento de Software, Linguagens de Programação"
  },
  {
    name: "Prof. Dr. Masayuki Oka Hase",
    email: "mhase@usp.br",
    room: "202A – Edifício I1",
    lattes: "https://lattes.cnpq.br/9979732565759430",
    personal: null,
    areas: "Física Estatística, Redes Complexas"
  },
  {
    name: "Prof. Dr. Norton Trevisan Roman",
    email: "norton@usp.br",
    room: "110R – Edifício A1",
    lattes: "https://lattes.cnpq.br/4440731926425760",
    personal: "https://www.each.usp.br/norton",
    areas: "Processamento de Língua Natural (Linguística Computacional), Inteligência Artificial, Educação em Informática"
  },
  {
    name: "Profa. Dra. Patrícia Rufino Oliveira",
    email: "proliveira@usp.br",
    room: "322A – Edifício I1",
    lattes: "https://lattes.cnpq.br/9174573815394512",
    personal: null,
    areas: "Inteligência Artificial, Computação Bioinspirada, Redes Neurais Artificiais, Processamento de Imagens Digitais, Visão Computacional, Análise de Componentes Independentes"
  },
  {
    name: "Prof. Dr. Renan Cerqueira Afonso Alves",
    email: "renanalves@usp.br",
    room: null,
    lattes: "https://lattes.cnpq.br/4974090084595688",
    personal: null,
    areas: "Redes de sensores sem fio, Internet das coisas, Modelagem de redes de computadores"
  },
  {
    name: "Prof. Dr. Regis Rossi Alves Faria",
    email: "regis@usp.br",
    room: "357H – Edifício I1",
    lattes: "https://lattes.cnpq.br/9990463602315076",
    personal: null,
    areas: "Computação sônica/musical, Processamento de sinais/áudio, Sonologia, Tecnologia da música, Bioacústica, Sistemas musicais interativos"
  },
  {
    name: "Profa. Dra. Sarajane Marques Peres",
    email: "sarajane@usp.br",
    room: "320A – Edifício I1",
    lattes: "https://lattes.cnpq.br/6265936760089757",
    personal: "https://www.each.usp.br/sarajane",
    areas: "Inteligência Computacional, Aprendizado de Máquina, Reconhecimento de Padrões"
  },
  {
    name: "Prof. Dr. Valdinei Freire da Silva",
    email: "valdinei.freire@usp.br",
    room: "110O – Edifício A1",
    lattes: "https://lattes.cnpq.br/0813823100105934",
    personal: "https://www.each.usp.br/valdinei",
    areas: "Inteligência Artificial, Processos Markovianos de Decisão, Aprendizado por Reforço, Sistemas de Recomendação, Robótica Inteligente"
  },
  {
    name: "Profa. Dra. Violeta Sun",
    email: "violeta@usp.br",
    room: "110M – Edifício A1",
    lattes: "https://lattes.cnpq.br/1018507649746734",
    personal: null,
    areas: "Gestão de TI, Governança de TI, Gestão de TI na Saúde, Gestão de Projetos, Aplicação de TI na Área Pública"
  }
];

let docentesFiltered = [...DOCENTES_DATA];

function initDocentes() {
  docentesFiltered = [...DOCENTES_DATA];
  renderDocentes(docentesFiltered);
  updateDocentesCount(docentesFiltered.length);
}

function filterDocentes(query) {
  const q = query.toLowerCase().trim();
  docentesFiltered = q
    ? DOCENTES_DATA.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.email.toLowerCase().includes(q) ||
        d.areas.toLowerCase().includes(q) ||
        (d.room && d.room.toLowerCase().includes(q))
      )
    : [...DOCENTES_DATA];
  renderDocentes(docentesFiltered);
  updateDocentesCount(docentesFiltered.length);
}

function updateDocentesCount(n) {
  const el = document.getElementById('docentes-count');
  if (el) el.textContent = `${n} docente${n !== 1 ? 's' : ''} encontrado${n !== 1 ? 's' : ''}`;
}

function renderDocentes(list) {
  const container = document.getElementById('docentes-grid');
  if (!container) return;

  if (!list.length) {
    container.innerHTML = `<div class="empty-state"><p>Nenhum docente encontrado.</p></div>`;
    return;
  }

  container.innerHTML = '';

  list.forEach((doc, i) => {
    const initials = doc.name
      .replace(/^(Prof\.|Profa\.|Dr\.|Dra\.)\s*/gi, '')
      .split(' ')
      .filter(w => w.length > 2)
      .slice(0, 2)
      .map(w => w[0].toUpperCase())
      .join('');

    const avatarColor = hashStringToColor(doc.name);
    const card = document.createElement('div');
    card.className = 'docente-card card-shine anim-fade-up';
    card.style.animationDelay = `${i * 0.04}s`;

    const linksHTML = [
      doc.lattes ? `<a href="${doc.lattes}" target="_blank" rel="noopener" class="docente-link" title="Currículo Lattes">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        Lattes
      </a>` : '',
      doc.personal ? `<a href="${doc.personal}" target="_blank" rel="noopener" class="docente-link" title="Página pessoal">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        Site
      </a>` : ''
    ].filter(Boolean).join('');

    card.innerHTML = `
      <div class="docente-card-top">
        <div class="docente-avatar" style="background: ${hexToRgba(avatarColor, 0.15)}; border-color: ${hexToRgba(avatarColor, 0.35)}; color: ${avatarColor};">
          ${initials}
        </div>
        <div class="docente-info">
          <div class="docente-name">${doc.name}</div>
          <a href="mailto:${doc.email}" class="docente-email">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            ${doc.email}
          </a>
          ${doc.room ? `<div class="docente-room">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            ${doc.room}
          </div>` : ''}
        </div>
      </div>
      <div class="docente-areas">${doc.areas}</div>
      ${linksHTML ? `<div class="docente-links">${linksHTML}</div>` : ''}
    `;

    container.appendChild(card);
  });
}
