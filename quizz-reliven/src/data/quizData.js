export const quizSteps = [
  {
    id: 'gender',
    type: 'gender',
    title: 'Um plano personalizado de gerenciamento do bem-estar',
    subtitle: 'Melhore seu bem-estar com nosso plano personalizado',
    badge: 'Quiz de 3 minutos',
    options: [
      { label: 'Masculino', value: 'masculino', icon: 'male' },
      { label: 'Feminino', value: 'feminino', icon: 'female' }
    ]
  },
  {
    id: 'age',
    type: 'age',
    title: 'Qual a sua idade?',
    subtitle: 'Utilizamos a sua idade apenas para personalizar o seu plano',
    options: [
      { label: '18-24', value: '18-24' },
      { label: '25-34', value: '25-34' },
      { label: '35-44', value: '35-44' },
      { label: '45-54', value: '45-54' },
      { label: '55-64', value: '55-64' },
      { label: '65+', value: '65+' }
    ]
  },
  {
    id: 'welcome',
    type: 'welcome',
    title: 'Bem-vindo. Você está no lugar certo.',
    text: 'Esta jornada foi pensada para te ajudar a entender seus padrões e dar sentido ao que você sente. Sugerimos que encare este questionário como um momento de reflexão honesta. A Reliven não substitui diagnósticos profissionais, mas fornece caminhos baseados em ciência para te apoiar.',
    disclaimer: 'Ao clicar em continuar você concorda com nossos Termos de Uso.'
  },
  {
    id: 'q1',
    type: 'list',
    stepNumber: 1,
    title: 'Com que frequência você sente cansaço ou falta de energia, mesmo depois de descansar?',
    options: [
      { label: 'Frequentemente', value: 'frequentemente', icon: 'fatigue' },
      { label: 'Às vezes', value: 'as_vezes', icon: 'fatigue' },
      { label: 'Raramente', value: 'raramente', icon: 'fatigue' }
    ]
  },
  {
    id: 'q2',
    type: 'list',
    stepNumber: 2,
    title: 'Você costuma deixar tudo para a última hora?',
    options: [
      { label: 'Frequentemente', value: 'frequentemente', icon: 'calendar' },
      { label: 'Às vezes', value: 'as_vezes', icon: 'calendar' },
      { label: 'Nunca', value: 'nunca', icon: 'calendar' }
    ]
  },
  {
    id: 'q3',
    type: 'list',
    stepNumber: 3,
    title: 'Você costuma se distrair com facilidade?',
    options: [
      { label: 'Me distraio com facilidade', value: 'facilidade', icon: 'dazed' },
      { label: 'Perco o foco de vez em quando', value: 'as_vezes', icon: 'dazed' },
      { label: 'Raramente me distraio', value: 'raramente', icon: 'dazed' },
      { label: 'Tenho foco constante', value: 'foco', icon: 'dazed' }
    ]
  },
  {
    id: 'q4',
    type: 'list',
    stepNumber: 4,
    title: 'Com que frequência você sente preocupação ou sobrecarga?',
    options: [
      { label: 'Frequentemente', value: 'frequentemente', icon: 'worry' },
      { label: 'Às vezes', value: 'as_vezes', icon: 'worry' },
      { label: 'Raramente', value: 'raramente', icon: 'worry' }
    ]
  },
  {
    id: 'q5',
    type: 'list',
    stepNumber: 5,
    title: 'Com que frequência você apresenta mudanças de humor?',
    options: [
      { label: 'Frequentemente', value: 'frequentemente', icon: 'mood' },
      { label: 'Às vezes', value: 'as_vezes', icon: 'mood' },
      { label: 'Raramente', value: 'raramente', icon: 'mood' }
    ]
  },
  {
    id: 'q6',
    type: 'list',
    stepNumber: 6,
    title: 'Você tem se sentido em harmonia consigo e com as pessoas ao seu redor nos últimos meses?',
    options: [
      { label: 'Sim', value: 'sim', icon: 'harmony' },
      { label: 'Moderadamente', value: 'moderadamente', icon: 'harmony' },
      { label: 'Não', value: 'nao', icon: 'harmony' }
    ]
  },
  {
    id: 'q7',
    type: 'likert',
    stepNumber: 7,
    title: 'Acho difícil expressar emoções',
    subtitle: 'Você concorda com a seguinte afirmação?'
  },
  {
    id: 'q8',
    type: 'likert',
    stepNumber: 8,
    title: 'Muitas vezes me sinto sobrecarregado(a) com a quantidade de coisas que tenho que fazer',
    subtitle: 'Você concorda com a seguinte afirmação?'
  },
  {
    id: 'q9',
    type: 'likert',
    stepNumber: 9,
    title: 'Acho muitas vezes desafiador tomar decisões',
    subtitle: 'Você concorda com a seguinte afirmação?'
  },
  {
    id: 'q10',
    type: 'likert',
    stepNumber: 10,
    title: 'Com frequência, tenho dificuldade em correr atrás dos meus objetivos por medo de errar e fracassar',
    subtitle: 'Você concorda com a seguinte afirmação?'
  },
  {
    id: 'q11',
    type: 'list',
    stepNumber: 11,
    title: 'Você já achou difícil aceitar elogios porque simplesmente não acreditou que fossem sinceros?',
    options: [
      { label: 'Quase sempre', value: 'quase_sempre', icon: 'compliments' },
      { label: 'Depende', value: 'depende', icon: 'compliments' },
      { label: 'Nunca', value: 'nunca', icon: 'compliments' },
      { label: 'Não tenho certeza', value: 'nao_tenho_certeza', icon: 'compliments' }
    ]
  },
  {
    id: 'q12',
    type: 'list',
    stepNumber: 12,
    title: 'Sinto insegurança ao conversar com outras pessoas',
    options: [
      { label: 'Sim', value: 'sim', icon: 'insecurity' },
      { label: 'Não', value: 'nao', icon: 'insecurity' },
      { label: 'Não tenho certeza', value: 'nao_tenho_certeza', icon: 'insecurity' }
    ]
  },
  {
    id: 'q13',
    type: 'list',
    stepNumber: 13,
    title: 'Costumo analisar demais o comportamento do meu parceiro(a)',
    options: [
      { label: 'Sim', value: 'sim', icon: 'analyze' },
      { label: 'Não', value: 'nao', icon: 'analyze' },
      { label: 'Não tenho certeza', value: 'nao_tenho_certeza', icon: 'analyze' }
    ]
  },
  {
    id: 'q14',
    type: 'list',
    stepNumber: 14,
    title: 'Você costuma priorizar as necessidades dos outros em detrimento das suas?',
    options: [
      { label: 'Frequentemente', value: 'frequentemente', icon: 'others' },
      { label: 'Às vezes', value: 'as_vezes', icon: 'others' },
      { label: 'Nunca', value: 'nunca', icon: 'others' }
    ]
  },
  {
    id: 'q15',
    type: 'no-icon-list',
    stepNumber: 15,
    title: 'Quando foi a última vez que você sentiu empolgação e motivação?',
    options: [
      { label: 'Há algumas semanas', value: 'algumas_semanas' },
      { label: 'Há menos de um ano', value: 'menos_ano' },
      { label: 'Há mais de um ano', value: 'mais_ano' },
      { label: 'Nunca na minha vida', value: 'nunca' }
    ]
  },
  {
    id: 'q16',
    type: 'multi-select',
    stepNumber: 16,
    title: 'Há aspectos do seu bem-estar que você gostaria de abordar?',
    subtitle: 'Marque todas as opções que se aplicam',
    options: [
      { label: 'Energia baixa', value: 'energia_baixa', icon: 'low_energy' },
      { label: 'Preocupação', value: 'preocupacao', icon: 'worry' },
      { label: 'Exaustão emocional', value: 'exaustao', icon: 'emotional_exhaustion' },
      { label: 'Pensamento excessivo', value: 'overthinking', icon: 'overthinking' },
      { label: 'Irritabilidade', value: 'irritabilidade', icon: 'irritability' },
      { label: 'Estou perfeitamente bem', value: 'perfeitamente_bem', icon: 'fine' }
    ]
  },
  {
    id: 'q17',
    type: 'list',
    stepNumber: 17,
    title: 'Qual a primeira coisa que você costuma fazer ao acordar?',
    options: [
      { label: 'Olhar meu telefone', value: 'telefone', icon: 'phone' },
      { label: 'Fazer café', value: 'cafe', icon: 'coffee' },
      { label: 'Escovar os dentes e tomar banho', value: 'higiene', icon: 'shower' },
      { label: 'Outro', value: 'outro', icon: 'other' }
    ]
  },
  {
    id: 'q18',
    type: 'list',
    stepNumber: 18,
    title: 'Quanto tempo por semana você dedica à atividade física?',
    options: [
      { label: 'De 0 a 2 horas', value: '0_2_horas', icon: 'shoe' },
      { label: 'De 3 a 5 horas', value: '3_5_horas', icon: 'shoe' },
      { label: 'De 6 a 8 horas', value: '6_8_horas', icon: 'shoe' },
      { label: 'Mais de 8 horas', value: 'mais_8_horas', icon: 'shoe' }
    ]
  },
  {
    id: 'q19',
    type: 'multi-select',
    stepNumber: 19,
    title: 'Você tem algum hábito que gostaria de abandonar?',
    subtitle: 'Marque todas as opções que se aplicam',
    options: [
      { label: 'Atrasos ou falta de tempo', value: 'atrasos', icon: 'clock' },
      { label: 'Insegurança', value: 'inseguranca', icon: 'lock' },
      { label: 'Redes sociais', value: 'redes_sociais', icon: 'phone' },
      { label: 'Desejo por doces ou comida não saudável', value: 'comida_ruim', icon: 'sweets' },
      { label: 'Perder sono', value: 'perder_sono', icon: 'bed' },
      { label: 'Roer as unhas', value: 'roer_unhas', icon: 'nail' },
      { label: 'Maratonar séries', value: 'series', icon: 'tv' }
    ]
  },
  {
    id: 'q20',
    type: 'multi-select',
    stepNumber: 20,
    title: 'Há algo que você gostaria de melhorar em relação à qualidade do seu sono?',
    subtitle: 'Marque todas as opções que se aplicam',
    options: [
      { label: 'Acordar cansado(a)', value: 'acordar_cansado', icon: 'sleep_tired' },
      { label: 'Acordar durante a noite', value: 'acordar_noite', icon: 'sleep_wake' },
      { label: 'Baixa qualidade de sono', value: 'baixa_qualidade', icon: 'sleep_poor' },
      { label: 'Dificuldade em adormecer', value: 'dificuldade_adormecer', icon: 'sleep_falling' },
      { label: 'Acordar mais cedo do que gostaria', value: 'acordar_cedo', icon: 'sleep_early' },
      { label: 'Durmo bem', value: 'durmo_bem', icon: 'sleep_good' }
    ]
  },
  {
    id: 'q21',
    type: 'multi-select',
    stepNumber: 21,
    title: 'Algum dos seguintes fatores tem te preocupado mais do que antes?',
    subtitle: 'Marque todas as opções que se aplicam',
    options: [
      { label: 'Família ou relacionamento', value: 'familia', icon: 'family' },
      { label: 'Circunstâncias externas', value: 'externas', icon: 'globe' },
      { label: 'Minha aparência', value: 'aparencia', icon: 'appearance' },
      { label: 'Problemas de sono', value: 'sono', icon: 'bed' },
      { label: 'Estresse na vida profissional', value: 'profissional', icon: 'work' },
      { label: 'Outro', value: 'outro', icon: 'plus' }
    ]
  },
  {
    id: 'q22',
    type: 'multi-select',
    stepNumber: 22,
    title: 'Para ter uma vida mais feliz, o que você acha que precisa melhorar?',
    subtitle: 'Marque todas as opções que se aplicam',
    options: [
      { label: 'Meu estado de calma', value: 'calma', icon: 'calm' },
      { label: 'Meus níveis de foco', value: 'foco', icon: 'focus' },
      { label: 'Minha força de vontade', value: 'vontade', icon: 'will' },
      { label: 'Meus níveis de energia', value: 'energia', icon: 'energy' },
      { label: 'Minha força interior', value: 'forca_interior', icon: 'strength' },
      { label: 'Outro', value: 'outro', icon: 'plus' }
    ]
  },
  {
    id: 'q23',
    type: 'multi-select',
    stepNumber: 23,
    title: 'Quais dos seguintes aspectos você gostaria de desenvolver com o plano?',
    subtitle: 'Marque todas as opções que se aplicam',
    options: [
      { label: 'Parar de duvidar de mim', value: 'duvidar', icon: 'shield_broken' },
      { label: 'Desenvolver resiliência emocional', value: 'resiliencia', icon: 'resilience' },
      { label: 'Estabelecer e alcançar objetivos', value: 'objetivos', icon: 'target' },
      { label: 'Deixar de pensar demais', value: 'pensar_demais', icon: 'brain' },
      { label: 'Aprender a confiar nos outros', value: 'confiar', icon: 'trust' },
      { label: 'Melhorar minha rotina diária', value: 'rotina', icon: 'calendar' }
    ]
  },
  {
    id: 'trans_evidence',
    type: 'transition',
    title: 'A Reliven foi desenvolvida com base em práticas psicológicas fundamentadas em evidências',
    subtitle: 'Sua jornada é baseada em décadas de pesquisas',
    theme: 'evidence'
  },
  {
    id: 'q24',
    type: 'list',
    stepNumber: 24,
    title: 'O quanto você sabe sobre Técnicas Comportamentais?',
    options: [
      { label: 'Absolutamente nada', value: 'nada', icon: 'book' },
      { label: 'Não muito', value: 'pouco', icon: 'book' },
      { label: 'Bastante', value: 'bastante', icon: 'book' }
    ]
  },
  {
    id: 'q25',
    type: 'list',
    stepNumber: 25,
    title: 'Você ouviu falar da Reliven através de um especialista?',
    options: [
      { label: 'Sim', value: 'sim', icon: 'doctor' },
      { label: 'Não', value: 'nao', icon: 'doctor' }
    ]
  },
  {
    id: 'trans_specialist',
    type: 'transition',
    title: 'Nossos planos são desenvolvidos em colaboração com terapeutas qualificados',
    subtitle: '"A Reliven incorpora cuidadosamente o modelo de TCC (Terapia Cognitivo-Comportamental) para oferecer conteúdos e recursos personalizados aos seus usuários, promovendo maior bem-estar emocional"',
    theme: 'specialist'
  },
  {
    id: 'trans_community',
    type: 'transition',
    title: 'Junte-se a mais de 2.500.000 pessoas',
    subtitle: 'Faça parte de uma comunidade global em crescimento e conquiste seus objetivos conosco!',
    theme: 'community'
  },
  {
    id: 'q26',
    type: 'no-icon-list',
    stepNumber: 26,
    title: 'Estabeleça sua meta diária',
    subtitle: 'Escolha quanto tempo você gostaria de dedicar por dia ao seu desenvolvimento pessoal',
    options: [
      { label: '5 min/dia', value: '5_min' },
      { label: '10 min/dia', value: '10_min' },
      { label: '15 min/dia', value: '15_min' },
      { label: '20 min/dia', value: '20_min' }
    ]
  },
  {
    id: 'email_capture',
    type: 'email',
    title: 'Insira seu e-mail para acessar seu Resumo Pessoal',
    text: 'Respeitamos a sua privacidade e estamos comprometidos com a proteção dos seus dados pessoais. Seus dados serão tratados conforme a nossa Política de Privacidade.'
  },
  {
    id: 'name_capture',
    type: 'name',
    title: 'Qual o seu primeiro nome?',
    subtitle: 'Insira seu nome para receber seu plano'
  },
  {
    id: 'loading_analyzer',
    type: 'loading',
    title: 'Criando seu plano personalizado...'
  },
  {
    id: 'results_summary',
    type: 'results',
    title: 'Resumo do seu perfil de bem-estar'
  },
  {
    id: 'timeline_page',
    type: 'timeline',
    title: 'Um plano criado para apoiar sua jornada de bem-estar',
    subtitle: 'Com base nas suas respostas, esperamos que você melhore seu bem-estar até '
  },
  {
    id: 'checkout_page',
    type: 'checkout',
    title: 'Seu plano personalizado está pronto!'
  }
];
