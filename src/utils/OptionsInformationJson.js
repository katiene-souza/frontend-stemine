export const options = {
  level: [
    {
      id: "all_levels",
      label: "Todos os níveis",
    },
    {
      id: "beginner",
      label: "Básico",
    },
    {
      id: "intermediate",
      label: "Intermediário",
    },
    {
      id: "advanced",
      label: "Avançado",
    },
  ],
  courseTime: [
    {
      id: "all_units",
      label: "Todas as unidades",
    },
    {
      id: "hours",
      label: "Horas",
    },
    {
      id: "weeks",
      label: "Semanas",
    },
    {
      id: "days",
      label: "Dias",
    },
    {
      id: "months",
      label: "Meses",
    },
    {
      id: "years",
      label: "Anos",
    },
  ],
  category: [
    {
      id: "all_categories",
      label: "Todas as categorias",
    },
    {
      id: "science",
      label: "Ciência",
    },
    {
      id: "technology",
      label: "Tecnologia",
    },
    {
      id: "engineering",
      label: "Engenharia",
    },
    {
      id: "mathematics",
      label: "Matemática",
    },
    {
      id: "leadership",
      label: "Liderança",
    },
    {
      id: "career",
      label: "Carreira",
    },
    {
      id: "data_science",
      label: "Ciência de Dados",
    },
  ],
   areaOfInterest: [
    {
      group: "Ciências Exatas e da Terra",
      options: [
        { id: "fisica", label: "Física" },
        { id: "quimica", label: "Química" },
        { id: "matematica_exatas", label: "Matemática" }, // ID ajustado para evitar conflito com 'mathematics'
        { id: "estatistica", label: "Estatística" },
        { id: "geologia", label: "Geologia" },
        { id: "oceanografia", label: "Oceanografia" },
        { id: "meteorologia", label: "Meteorologia" },
        { id: "geofisica", label: "Geofísica" },
      ],
    },
    {
      group: "Ciências Biológicas e da Saúde (Pesquisa e Tecnologia)",
      options: [
        { id: "biologia", label: "Biologia (Genética, Microbiologia, Bioquímica, Biotecnologia)" },
        { id: "farmacia_pesquisa", label: "Farmácia (Pesquisa e Desenvolvimento)" },
        { id: "medicina_pesquisa", label: "Medicina (Pesquisa Clínica, Bioinformática)" },
        { id: "biomedicina", label: "Biomedicina" },
        { id: "enfermagem_tec", label: "Enfermagem (Tecnologia em Saúde)" },
        { id: "nutricao_alimentos", label: "Nutrição (Ciência dos Alimentos)" },
      ],
    },
    {
      group: "Engenharias (Diversas Disciplinas)",
      options: [
        { id: "eng_civil", label: "Engenharia Civil" },
        { id: "eng_mecanica", label: "Engenharia Mecânica" },
        { id: "eng_eletrica", label: "Engenharia Elétrica" },
        { id: "eng_quimica", label: "Engenharia Química" },
        { id: "eng_producao", label: "Engenharia de Produção" },
        { id: "eng_ambiental", label: "Engenharia Ambiental" },
        { id: "eng_materiais", label: "Engenharia de Materiais" },
        { id: "eng_alimentos", label: "Engenharia de Alimentos" },
        { id: "eng_biomedica", label: "Engenharia Biomédica" },
        { id: "eng_aeroespacial", label: "Engenharia Aeroespacial" },
        { id: "eng_petroleo", label: "Engenharia de Petróleo" },
      ],
    },
    {
      group: "Tecnologia da Informação",
      options: [
        { id: "eng_software", label: "Engenharia de Software (Front-end, Back-end, Full Stack, Mobile)" },
        { id: "ciencia_dados_ia", label: "Ciência de Dados e Inteligência Artificial (Análise de Dados, Machine Learning, Deep Learning)" },
        { id: "ciberseguranca", label: "Cibersegurança" },
        { id: "devops_cloud", label: "DevOps e Cloud Computing" },
        { id: "ux_ui_design", label: "UX/UI Design" },
        { id: "gerenciamento_projetos_ti", label: "Gerenciamento de Projetos em TI" },
        { id: "redes_infra", label: "Redes e Infraestrutura" },
        { id: "qualidade_software", label: "Qualidade de Software (QA)" },
      ],
    },
  ],
  experienceLevel: [
    { id: "iniciante_estudante", label: "Iniciante / Estudante: Sem experiência ou começando os estudos." },
    { id: "transicao_carreira", label: "Transição de Carreira: Vindo de outra área e buscando migrar para STEM." },
    { id: "junior", label: "Júnior: Já atua na área, mas com pouca experiência profissional." },
    { id: "pleno_intermediario", label: "Pleno / Intermediário: Alguma experiência, buscando aprofundamento." },
  ],
    timeAvailability: [
    {
      day: "Segunda-feira",
      periods: [
        { id: "seg_manha", label: "Manhã (até 12h)" },
        { id: "seg_tarde", label: "Tarde (entre 14h e 16h)" },
        { id: "seg_noite", label: "Noite (entre 18h - 20h)" },
      ],
    },
    {
      day: "Terça-feira",
      periods: [
        { id: "ter_manha", label: "Manhã (até 12h)" },
        { id: "ter_tarde", label: "Tarde (entre 14h e 16h)" },
        { id: "ter_noite", label: "Noite (entre 18h - 20h)" },
      ],
    },
    {
      day: "Quarta-feira",
      periods: [
        { id: "qua_manha", label: "Manhã (até 12h)" },
        { id: "qua_tarde", label: "Tarde (entre 14h e 16h)" },
        { id: "qua_noite", label: "Noite (entre 18h - 20h)" },
      ],
    },
    {
      day: "Quinta-feira",
      periods: [
        { id: "qui_manha", label: "Manhã (até 12h)" },
        { id: "qui_tarde", label: "Tarde (entre 14h e 16h)" },
        { id: "qui_noite", label: "Noite (entre 18h - 20h)" },
      ],
    },
    {
      day: "Sexta-feira",
      periods: [
        { id: "sex_manha", label: "Manhã (até 12h)" },
        { id: "sex_tarde", label: "Tarde (entre 14h e 16h)" },
        { id: "sex_noite", label: "Noite (entre 18h - 20h)" },
      ],
    },
    {
      day: "Sábado",
      periods: [
        { id: "sab_manha", label: "Manhã (até 12h)" },
        { id: "sab_tarde", label: "Tarde (entre 14h e 16h)" },
        { id: "sab_noite", label: "Noite (entre 18h - 20h)" },
      ],
    },
    {
      day: "Domingo",
      periods: [
        { id: "dom_manha", label: "Manhã (até 12h)" },
        { id: "dom_tarde", label: "Tarde (entre 14h e 16h)" },
        { id: "dom_noite", label: "Noite (entre 18h - 20h)" },
      ],
    },
  ],
    challengeOptions: [
    { id: "sindrome_impostora", label: "Síndrome da Impostora" },
    { id: "falta_autoconfianca", label: "Falta de Autoconfiança" },
    { id: "networking_contatos", label: "Networking e Contatos" },
    { id: "equilibrio_carreira_vida", label: "Equilíbrio Carreira/Vida Pessoal" },
    { id: "desenv_habilidades_tec", label: "Desenvolvimento de Habilidades Técnicas" },
    { id: "progressao_carreira", label: "Progressão na Carreira" },
    { id: "transicao_carreira_opt", label: "Transição de Carreira" }, // Ajustado ID
    { id: "busca_emprego", label: "Busca por Emprego" },
    { id: "outros_desafios", label: "Outros" }, // Ajustado ID
  ],
};
