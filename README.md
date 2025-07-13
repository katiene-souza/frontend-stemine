# Frontend do Projeto STEMINE

Este repositório contém o código-fonte do frontend do projeto STEMINE, desenvolvido com **React** e **Material-UI**.

<img width="944" height="535" alt="image" src="https://github.com/user-attachments/assets/e4a1f1a9-fddf-4922-8da6-e170bb40bcdc" />

### Tecnologias Utilizadas

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Router DOM](https://img.shields.io/badge/React_Router_DOM-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![CKEditor 5](https://img.shields.io/badge/CKEditor_5-333333?style=for-the-badge&logo=ckeditor5&logoColor=white)

* **React:** Biblioteca JavaScript para construção de interfaces de usuário.
* **Material-UI:** Biblioteca de componentes React para um design de interface elegante e responsivo.
* **Vite:** Ferramenta de build frontend para desenvolvimento rápido e otimização de produção.
* **Axios:** Cliente HTTP baseado em Promises para fazer requisições à API.
* **React Router DOM:** Para gerenciamento de rotas e navegação.
* **CKEditor 5 for React:** Editor de texto rico para criação de conteúdo em artigos.

### Objetivos de Desenvolvimento Sustentável (ODS)

![ODS 4 - Educação de Qualidade](https://img.shields.io/badge/ODS_4-E5243B?style=for-the-badge&logo=un&logoColor=white)
![ODS 5 - Igualdade de Gênero](https://img.shields.io/badge/ODS_5-FF3A21?style=for-the-badge&logo=un&logoColor=white)
![ODS 10 - Redução das Desigualdades](https://img.shields.io/badge/ODS_10-DD1367?style=for-the-badge&logo=un&logoColor=white)

### Estrutura do Projeto

A estrutura principal do projeto segue as convenções comuns de aplicativos React:

```
src/
├── assets/                  # Imagens e outros recursos estáticos
├── components/
│   ├── ui/                  # Componentes de UI reutilizáveis (botões, cards, tags)
│   ├── CourseFormModal.jsx  # Modal de formulário para cursos
│   ├── ConfirmationDialog.jsx # Diálogo de confirmação genérico
│   ├── Footer.jsx           # Componente de rodapé
│   ├── Header.jsx           # Componente de cabeçalho
│   └── Layout.jsx           # Componente de layout principal da aplicação
├── constants/               # Constantes globais (cores, mensagens, roles)
│   ├── Colors.js
│   ├── Messages.js
│   └── Roles.js
├── contexts/                # Contextos React (ex: AuthContext para autenticação)
│   └── AuthContext.jsx
├── pages/                   # Componentes de página (rotas)
│   ├── AdminCommunityManagementPage.jsx # Página de gerenciamento de artigos (apenas admin)
│   ├── CommunityPage.jsx    # Página de listagem de artigos
│   ├── CommunityPostDetailsPage.jsx # Página de detalhes de um artigo
│   ├── Course.jsx           # Página de listagem de cursos
│   ├── HomePage.jsx         # Página inicial
│   ├── LoginPage.jsx        # Página de login
│   ├── MentoringPage.jsx    # Página de mentoria
│   ├── RegistrationPage.jsx # Página de cadastro
│   └── VacanciesPage.jsx    # Página de listagem de vagas
├── services/                # Serviços para comunicação com o backend
│   ├── api.js               # Instância do Axios com interceptores (JWT)
│   ├── auth.js              # Serviço para autenticação (login, registro)
│   ├── community.service.js # Serviço para posts da comunidade (artigos)
│   ├── course.service.js    # Serviço para cursos
│   └── vacancy.service.js   # Serviço para vagas
├── utils/                   # Funções utilitárias (validações, dados de opções)
│   ├── CourseValidation.js
│   ├── NavItems.js
│   ├── OptionsInformationJson.js
│   ├── registrationValidation.js
│   └── vacancyValidation.js
├── App.jsx                  # Componente principal da aplicação e definição de rotas
└── main.jsx                 # Ponto de entrada da aplicação React
```

### Como Rodar o Projeto

1.  **Pré-requisitos:**
    * Node.js (versão 18 ou superior recomendada)
    * npm ou Yarn
    * O backend do projeto STEMINE rodando (geralmente em `http://localhost:8080`).

2.  **Instale as dependências:**
    Navegue até o diretório raiz do frontend no terminal e execute:

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Instale o Editor de Texto Rico (CKEditor):**
    ```bash
    npm install @ckeditor/ckeditor5-react @ckeditor/ckeditor5-build-classic
    # ou
    yarn add @ckeditor/ckeditor5-react @ckeditor/ckeditor5-build-classic
    ```

4.  **Configure a URL do Backend:**
    Crie um arquivo `.env` na raiz do projeto frontend com a URL do seu backend:

    ```
    VITE_API_BASE_URL=http://localhost:8080/api
    ```

5.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    # ou
    yarn dev
    ```
    O aplicativo estará disponível em `http://localhost:5173` (ou outra porta disponível).

### Funcionalidades Principais

* **Autenticação:** Login e cadastro de usuários (mentoradas) e administradores.
* **Gerenciamento de Usuários:** Cadastro de usuários (mentoradas) com informações detalhadas.
* **Página de Cursos:** Listagem, busca e filtragem de cursos.
* **Gerenciamento de Cursos (Admin):** Administradores podem adicionar, editar e excluir cursos.
* **Página de Vagas:** Listagem, busca e filtragem de vagas.
* **Gerenciamento de Vagas (Admin):** Administradores podem adicionar, editar e excluir vagas.
* **Comunidade (Artigos):**
    * Listagem de artigos.
    * Visualização de detalhes de artigos.
    * Gerenciamento de Artigos (Admin): Administradores podem criar, editar e excluir artigos usando um editor de texto rico.
* **Página de Mentoria:** (Funcionalidades adicionais podem ser integradas aqui).

### Rotas Principais

* `/`: Página Inicial
* `/login`: Login de Usuário
* `/register`: Cadastro de Usuário
* `/courses`: Listagem de Cursos
* `/vacancies`: Listagem de Vagas
* `/mentoring`: Página de Mentoria
* `/community`: Listagem de Artigos da Comunidade
* `/community/:id`: Detalhes de um Artigo
* `/admin/community`: Gerenciamento de Artigos (apenas para ROLE_ADMIN)
* `/unauthorized`: Página de Acesso Negado
