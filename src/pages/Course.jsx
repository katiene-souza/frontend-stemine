import { useState } from "react"; // Importe useEffect para lógica de autenticação inicial
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Snackbar, // Importe Snackbar
  Alert,    // Importe Alert
} from "@mui/material";

import { colors } from "../constants/Colors";
// Renomeei register_course para CourseMessages para consistência com o uso anterior
import { register_course as CourseMessages, error_messages } from "../constants/Messages"; 
import { options } from "../utils/OptionsInformationJson";
import { useAuth } from "../contexts/AuthContext"; // Importe useAuth

import CourseCard from "../components/ui/CourseCard"; // Verifique o caminho correto, antes era ../components/CourseCard
import CourseFormModal from "../components/CourseFormModal";


// Dados de exemplo INICIAIS para os cursos (mock, substitua por dados reais do backend)
const initialExampleCourses = [
  {
    id: 1,
    imageUrl:
      "https://storage.googleapis.com/star-lab/blog/OGs/react.png",
    level: "Intermediário",
    categories: ["Tecnologia", "Matemática"],
    title: "Desenvolvimento Front-end com React",
    description:
      "Acesse os melhores cursos com certificado para se especializar e se destacar nas áreas STEM. Este curso abrange desde os fundamentos até tópicos avançados de React.",
    durationValue: "8", // Separado para o formulário
    durationUnit: "semanas", // Separado para o formulário
    companyLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png",
  },
  {
    id: 2,
    imageUrl:
      "https://via.placeholder.com/300x160/F0F0F0/000000?text=Curso+Liderança+2",
    level: "Básico",
    categories: ["Liderança", "Carreira"], 
    title: "Liderança Feminina",
    description:
      "Conectamos você com mentoras profissionais e experientes que fornecem orientação personalizada para acelerar sua carreira em liderança.",
    durationValue: "8",
    durationUnit: "semanas",
    companyLogoUrl: "https://via.placeholder.com/80x30?text=LOGO+EMPRESA+B",
  },
  {
    id: 3,
    imageUrl:
      "https://via.placeholder.com/300x160/F0F0F0/000000?text=Curso+Engenharia+3",
    level: "Avançado",
    categories: ["Engenharia", "Ciência"],
    title: "Engenharia de Software", 
    description:
      "Acesse os melhores cursos com certificado para se especializar e se destacar nas áreas STEM. Este curso aprofunda em tópicos de engenharia de software.",
    durationValue: "8",
    durationUnit: "semanas",
    companyLogoUrl: "https://via.placeholder.com/80x30?text=LOGO+EMPRESA+C",
  },
  {
    id: 4,
    imageUrl:
      "https://via.placeholder.com/300x160/F0F0F0/000000?text=Curso+Dados+4",
    level: "Intermediário",
    categories: ["Dados", "Matemática"],
    title: "Introdução à Ciência de Dados",
    description:
      "Explore o mundo dos dados, desde a coleta e limpeza até a análise e visualização de dados complexos.",
    durationValue: "10",
    durationUnit: "semanas",
    companyLogoUrl: "https://via.placeholder.com/80x30?text=LOGO+EMPRESA+D",
  },
];

const CoursesPage = () => {
  // Puxa o user e isAuthenticated do contexto de autenticação
  const { user, isAuthenticated } = useAuth(); 
  
  // Calcula se o usuário é um admin, para controlar a visibilidade
  const isAdminUser = isAuthenticated && user?.role === 'admin'; 

  // Estado para a lista de cursos (agora é gerenciável)
  const [courses, setCourses] = useState(initialExampleCourses); 

  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState(options.level[0].label);
  const [categoryFilter, setCategoryFilter] = useState(
    options.category[0].label
  );

  // Estados para a modal de cadastro/edição
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [editingCourseData, setEditingCourseData] = useState(null); // Armazena dados do curso a ser editado

  // Estados para o Snackbar de feedback
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');


  // Filtra os cursos baseados nos termos de busca e filtros selecionados
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = levelFilter === options.level[0].label || course.level === levelFilter;
    
    // Para categoria, se for filtro multi-select, a lógica de course.categories.includes(categoryFilter)
    // precisaria ser course.categories.some(cat => categoryFilter.includes(cat)) ou similar
    const matchesCategory = categoryFilter === options.category[0].label || 
                           course.categories.includes(categoryFilter); 
    return matchesSearch && matchesLevel && matchesCategory;
  });

  // Função para exibir o Snackbar
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Função para fechar o Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };


  // --- Funções de Ação nos Cards (Protegidas para Admin) ---

  const handleSubscribe = (courseTitle) => {
    showSnackbar(`Inscrito no curso: ${courseTitle}`, 'info');
    // Lógica real de inscrição
  };

  const handleEditCourse = (courseId) => {
    if (!isAdminUser) { // Apenas admins podem editar
      showSnackbar(error_messages.auth.permission_denied, 'error');
      return;
    }
    const courseToEdit = courses.find((c) => c.id === courseId);
    setEditingCourseData(courseToEdit); // Passa os dados do curso para o formulário
    setIsModalOpen(true); // Abre a modal
  };

  const handleDeleteCourse = (courseId, courseTitle) => {
    if (!isAdminUser) { // Apenas admins podem deletar
      showSnackbar(error_messages.auth.permission_denied, 'error');
      return;
    }
    if (window.confirm(`Tem certeza que deseja excluir o curso "${courseTitle}"?`)) {
      // Filtra o curso da lista (simulação de exclusão)
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
      showSnackbar(`Curso "${courseTitle}" excluído com sucesso!`, 'success');
    }
  };

  // --- Funções da Modal de Cadastro/Edição ---

  const handleOpenModal = () => {
    if (!isAdminUser) { // Apenas admins podem abrir a modal para cadastrar
      showSnackbar(error_messages.auth.permission_denied, 'error');
      return;
    }
    setEditingCourseData(null); // Garante que o formulário está limpo para um novo cadastro
    setIsModalOpen(true); // Abre a modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Fecha a modal
    setEditingCourseData(null); // Limpa os dados de edição ao fechar
  };

  const handleSubmitCourse = (formData) => {
    if (!isAdminUser) { // Protege a submissão do formulário
      showSnackbar(error_messages.auth.permission_denied, 'error');
      return;
    }

    // Lógica de cadastro/edição (simulação)
    if (editingCourseData) {
      // Edição: Atualiza o curso na lista
      setCourses((prevCourses) =>
        prevCourses.map((c) => (c.id === formData.id ? formData : c))
      );
      showSnackbar("Curso atualizado com sucesso!", "success");
    } else {
      // Cadastro: Adiciona novo curso à lista
      const newId = Math.max(...courses.map((c) => c.id)) + 1; // ID simples
      setCourses((prevCourses) => [...prevCourses, { ...formData, id: newId }]);
      showSnackbar("Curso cadastrado com sucesso!", "success");
    }
    handleCloseModal(); // Fecha a modal após a ação
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, sm: 4, md: 8 } }}
    >
      {/* Cabeçalho da Página de Cursos */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: { xs: 4, md: 6 },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ color: colors.text.primary, fontWeight: "bold" }}
        >
          {CourseMessages.title} {/* Usando CourseMessages para o título */}
        </Typography>
        {/* Botão "Cadastrar curso" visível SOMENTE para admins */}
        {isAdminUser && (
          <Button
            variant="contained"
            onClick={handleOpenModal}
            sx={{
              backgroundColor: colors.brand_colors.stemine_purple,
              color: colors.white,
              textTransform: "none",
              borderRadius: '50px',
              padding: { xs: "8px 16px", md: "10px 20px" },
              fontSize: { xs: "0.85rem", md: "0.95rem" },
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: colors.brand_colors.stemine_purple_dark,
              },
            }}
          >
            {CourseMessages.is_adm_text_button} {/* Usando CourseMessages para o texto do botão */}
          </Button>
        )}
      </Box>

      {/* Seção de Busca e Filtros - VISÍVEL PARA TODOS */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 3 },
          mb: { xs: 4, md: 5 },
        }}
      >
        <TextField
          label={CourseMessages.search} 
          variant="outlined"
          fullWidth={!["sm", "md", "lg"].includes("sm")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            flex: { sm: 1 },
            minWidth: { sm: "200px" },
          }}
        />

        <TextField
          select
          label="Nível"
          variant="outlined"
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          sx={{
            width: { xs: "100%", sm: "auto" },
            minWidth: { sm: "150px" },
          }}
        >
          {options.level.map((option) => (
            <MenuItem key={option.id} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Categoria"
          variant="outlined"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{
            width: { xs: "100%", sm: "auto" },
            minWidth: { sm: "180px" },
          }}
        >
          {options.category.map((option) => (
            <MenuItem key={option.id} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Contagem de Cursos Encontrados */}
      <Typography
        variant="body1"
        sx={{ color: colors.text.secondary, mb: { xs: 3, md: 4 } }}
      >
        {filteredCourses.length} {CourseMessages.courses_found} {/* Usando CourseMessages */}
      </Typography>

      {/* Listagem de CourseCards (Flexbox) */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, 
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          gap: { xs: '24px', sm: '32px', md: '16px' }, // Ajuste gap para 3 cards por linha
        }}
      >
        {filteredCourses.map((course) => (
          <Box
            key={course.id}
            sx={{
              flex: {
                xs: '1 1 100%',
                sm: '1 1 calc(50% - 16px)',
                md: '1 1 calc(33.33% - 10.67px)', // Calcula 3 items por linha com gap
              },
              maxWidth: {
                xs: '100%',
                sm: 'calc(50% - 16px)',
                md: 'calc(33.33% - 10.67px)',
              },
              boxSizing: 'border-box',
            }}
          >
            <CourseCard
              imageUrl={course.imageUrl}
              level={course.level}
              categories={course.categories}
              title={course.title}
              description={course.description}
              // Passa durationValue e durationUnit para o card
              duration={course.durationValue + ' ' + course.durationUnit} 
              companyLogoUrl={course.companyLogoUrl}
              onSubscribeClick={() => handleSubscribe(course.title)}
              
              isAdm={isAdminUser} // Passa o isAdminUser real para o CourseCard
              // Passa o ID completo do curso para as ações de edição/exclusão
              onEditClick={() => handleEditCourse(course.id)} 
              onDeleteClick={() => handleDeleteCourse(course.id, course.title)}
            />
          </Box>
        ))}
        {filteredCourses.length === 0 && (
          <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Nenhum curso encontrado com os filtros selecionados.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Renderiza a CourseFormModal */}
      <CourseFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitCourse}
        initialData={editingCourseData} // Passa os dados do curso para edição
      />

      {/* Snackbar para feedback de sucesso/erro */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CoursesPage;