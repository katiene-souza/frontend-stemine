export const LandingPage = {
  title: "Conectando mulheres impulsionando carreiras em STEM.",
  text_title:
    "Conecte-se com mentoras experientes que superaram os mesmos desafios que você. Acelere sua carreira e conquiste seus objetivos em Ciência, Tecnologia, Engenharia e Matemática com a confiança que você merece.",

  operation: {
    learning: {
      title: "Trilhas de Aprendizado",
      description:
        "Acesse os melhores cursos com certificado para se especializar e se destacar nas áreas STEM.",
    },
    mentoring: {
      title: "Mentorias Exclusivas",
      description:
        "Conectamos você com mentores profissionais e experientes que fornece orientação personalizada para acelerar sua carreira.",
    },
    working: {
      title: "Oportunidades de Carreira",
      description:
        "Conexão com empresas que buscam talentos femininos para suas equipes.",
    },
    community: {
      title: "Conecte-se com outras mulheres",
      description:
        "Interaja e compartilhe experiências com uma rede de mulheres que, assim como você, buscam apoio e crescimento em STEM.",
    },
  },

  explanation: {
    title: "Por que a STEMINE?",
    description:
      "Somos a plataforma ideal para aumentar a representatividade feminina em STEM, oferecendo recursos e apoio específicos para mulheres que desejam iniciar ou avançar nessas carreiras.",
  },

  call_to_action: {
    title: "Pronta para transformar sua carreira?",
    description:
      "Junte-se a comunidade de mulheres que já estão revolucionando o mundo STEM. Seu futuro começa aqui!",
    button: "Quero Começar",
  },
};

export const MenuButtons = {
  header: {
    start: "Início",
    course: "Cursos",
    mentoring: "Mentorias",
    community: "Comunidade",
    selections: "Vagas",
    to_enter: "Entrar",
  },

  footer: {
    description:
      "Transformando o futuro da STEM através da inclusão de mulheres em Ciência, Tecnologia, Engenharia e Matemática.",
    links: MenuButtons.header,
    contact: {
      email: "contato@stemine.com.br",
      cellphone: "(11) 99999-9999",
      location: "Belo Horizonte, Brasil",
    },
    rights_reserved: "© 2025 STEMINE. Todos os direitos reservados.",
  },
};

export const Course = {
  title: "Explore os cursos",
  search: "Buscar curso",
  text_button: "Inscrever-se",
  is_adm_text_button: "Cadastrar curso",
};

export const Mentoring = {
  title: "Programa de Mentorias",

  is_adm: {
    text_button: "Cadastrar mentora",
    mentors: "Nossas mentoras",
    contact: "Contatar mentora",
  },

  explanation: {
    title: "Como funciona a Mentoria na STEMINE?",
    description_one_p:
      "Nosso programa de mentoria conecta mulheres que estão começando nas áreas STEM com profissionais experientes do mercado. As mentorias são totalmente personalizadas para seus objetivos e nível de conhecimento.",
    description_second_p:
      "O programa inclui 5 sessões obrigatórias, com duração de uma hora cada, que podem ocorrer semanalmente ou quinzenalmente. Você terá acesso a orientações práticas, revisão de estudos, dicas de carreira e muito mais para impulsionar seu desenvolvimento!",
    text_button: "Quero me inscrever na mentoria",
    registration_sucess:
      "Inscrição realiza com sucesso! Acesse seu perfil para acompanhar o status.",
  },

  operation: {
    inscription: {
      title: "Inscrição",
      description:
        "Clique em 'Quero me Inscrever na Mentoria', leia atentamente os termos e aceite. Quanto mais informações no seu perfil, maiores suas chances de encontrar a mentora ideal e ser aprovada no programa!",
    },
    Assessment: {
      title: "Avaliação e Match",
      description: "Nossa equipe analisa seu perfil e encontra a mentora ideal",
    },
    connection: {
      title: "Conexão",
      description:
        "Apresentamos você à sua mentora e facilitamos o primeiro contato para que vocês possam planejar as sessões.",
    },
    Development: {
      title: "Desenvolvimento contínuo",
      description:
        "Inicie sua jornada de crescimento profissional com apoio personalizado e expertise da sua mentora",
    },
  },

  more_information: {
    quantity_mentoring: "Mentorias disponíveis este mês: ",
    explication_quantity_mentoring:
      "A quantidade de mentorias é ajustada mensalmente com base na disponibilidade dos nossos profissionais. Cada inscrição impacta o número de vagas restantes.",
    quantity_per_category: "Categoria com mentorias disponíveis este mês: ",
    explication_quantity_per_category:
      "A disponibilidade em cada categoria depende diretamente do número de mentoras qualificadas e de sua capacidade de atendimento.",
  },

  register_mentors: {
    title: "Torne-se uma Mentora STEMINE!",
    subtitle:
      "Sua experiência pode transformar a carreira de outras mulheres em STEM.",
    description:
      "Faça parte da nossa rede de apoio e empoderamento. Conectamos você com mentoradas que buscam orientação e inspiração para crescer em Ciência, Tecnologia, Engenharia e Matemática. É uma oportunidade de impactar vidas, compartilhar conhecimento e receber um certificado de participação.",
    mentored_rules:
      "Para ser uma mentora, você precisa ser mulher, ter mais de 18 anos, possuir formação superior em alguma área STEM e contar com mais de dois anos de experiência profissional na área.",
  },
};

export const registrationForms = {
    login: {
        sing_in: "Acessar sua conta",
        email: "E-mail",
        password: "Senha", 
        is_adm: {
            title: "Acesse para Administradores",
            acess_adm: "Entrar como administrador",
        },
        call_to_action: "Ainda não tem uma conta?",
        link_call_to_action: "Cadastra-se aqui",
        to_enter: "Entrar",
    }, 

    register: {
        title: "Crie sua Conta STEMINE",
        // Informações básicas
        name: "Nome completo",
        email: "E-mail",
        password: "Senha",
        confirm_password: "Confirmar Senha",
        date_of_birth: "Data de nascimento",
        profile_photo: "Foto de perfil (opcional)",

        // Perfil da mentorada
        area_of_interest: "Área de interesse ou atuação",
        experience_level: "Nível de experiência na área",
        Purpose_of_mentoring: "Seu objetivo com a mentoria",
        time_availability: "Disponibilidade de horário",
        biografy: "Fale sobre você (conte-nos sua trajetória e ambições)",
        disability: {
            title: "Você é uma pessoa com deficiência?",
            text_button_yes: "sim",
            text_button_no: "Não",
            what_disability: "Qual é a sua deficência? ",
            adaptation: "Precisa de alguma adptação? se sim, descreve abaixo: ",
            explanation: "Entendemos que esta é uma informação pessoal. Solicitamos para garantir a acessibilidade e o melhor suporte a todas as usuárias da plataforma. Sua resposta nos ajuda a oferecer um ambiente mais inclusivo."
        },

        //Informações opcionais
        Links: {
            linkedin: "LinkedIn",
            portfolio: "Portfólio",
            git_hub: "GitHub",
            lattes: "Currículo lattes" 
        },
        current_challenges: "Desafios atuais",
        curriculum: "Anexar currículo",
        
        to_register: "Cadastrar",
        log_in: "Já tem uma conta?",
        link_log_in: "Fazer login",

    },

    register_mentors: {
        //informações adicionais para mentoras
    },

}