import { useEffect, useState } from "react"; // Importe useEffect para lógica de autenticação inicial
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Snackbar, 
  Alert, 
} from "@mui/material";

import { colors } from "../constants/Colors";
import { register_course as CourseMessages, error_messages } from "../constants/Messages"; 
import { options } from "../utils/OptionsInformationJson";
import { useAuth } from "../contexts/AuthContext";
import CourseCard from "../components/ui/CourseCard"; 
import CourseFormModal from "../components/CourseFormModal";
import { useNavigate } from "react-router-dom";


// Dados de exemplo INICIAIS para os cursos (mock)
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
    durationValue: "8", 
    durationUnit: "semanas", 
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
  const { user, isAuthenticated } = useAuth(); // Pega o user e isAuthenticated do contexto
  const navigate = useNavigate(); // Hook para redirecionamento

  // Calcule isAdminUser aqui, como você já faz
  const isAdminUser = isAuthenticated && user?.role === 'admin';

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        navigate('/login'); 
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);


  const [courses, setCourses] = useState(initialExampleCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState(options.level[0].label);
  const [categoryFilter, setCategoryFilter] = useState(
    options.category[0].label
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourseData, setEditingCourseData] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');


  // Filtra os cursos (lógica existente)
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = levelFilter === options.level[0].label || course.level === levelFilter;
    const matchesCategory = categoryFilter === options.category[0].label || 
                           course.categories.includes(categoryFilter); 
    return matchesSearch && matchesLevel && matchesCategory;
  });

  // --- Funções de Feedback e Ação ---
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') { return; }
    setSnackbarOpen(false);
  };
  const handleSubscribe = (courseTitle) => {
    showSnackbar(`Inscrito no curso: ${courseTitle}`, 'info');
  };

  // Funções de Admin (protegidas)
  const handleEditCourse = (courseId) => {
    if (!isAdminUser) { showSnackbar(error_messages.auth.permission_denied, 'error'); return; }
    const courseToEdit = courses.find((c) => c.id === courseId);
    setEditingCourseData(courseToEdit);
    setIsModalOpen(true);
  };

  const handleDeleteCourse = (courseId, courseTitle) => {
    if (!isAdminUser) { showSnackbar(error_messages.auth.permission_denied, 'error'); return; }
    if (window.confirm(`Tem certeza que deseja excluir o curso "${courseTitle}"?`)) {
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
      showSnackbar(`Curso "${courseTitle}" excluído com sucesso!`, 'success');
    }
  };

  const handleOpenModal = () => {
    if (!isAdminUser) { showSnackbar(error_messages.auth.permission_denied, 'error'); return; }
    setEditingCourseData(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCourseData(null);
  };

  const handleSubmitCourse = (formData) => {
    if (!isAdminUser) { showSnackbar(error_messages.auth.permission_denied, 'error'); return; }
    if (editingCourseData) {
      setCourses((prevCourses) => prevCourses.map((c) => (c.id === formData.id ? formData : c)));
      showSnackbar("Curso atualizado com sucesso!", "success");
    } else {
      const newId = Math.max(...courses.map((c) => c.id)) + 1;
      setCourses((prevCourses) => [...prevCourses, { ...formData, id: newId }]);
      showSnackbar("Curso cadastrado com sucesso!", "success");
    }
    handleCloseModal();
  };


  // Se o usuário não está autenticado, renderize algo temporário enquanto redireciona.
  // Ou melhor, apenas não renderize nada (null) e o useEffect cuidará do redirecionamento.
  if (!isAuthenticated && !user) { 
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Redirecionando para a página de login...
        </Typography>
        <Snackbar
          open={true}
          autoHideDuration={2000}
          message="Você precisa estar logado para acessar esta página."
          severity="info"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
             <Alert severity="info" sx={{ width: '100%' }}>
                Você precisa estar logado para acessar esta página.
             </Alert>
        </Snackbar>
      </Container>
    );
  }


  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, sm: 4, md: 8 } }}>
      {/* Cabeçalho da Página de Cursos */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 4, md: 6 } }}>
        <Typography variant="h4" component="h1" sx={{ color: colors.text.primary, fontWeight: 'bold' }}>
          {CourseMessages.title}
        </Typography>
        {isAdminUser && (
          <Button
            variant="contained"
            onClick={handleOpenModal}
            sx={{
              backgroundColor: colors.brand_colors.stemine_purple,
              color: colors.white,
              textTransform: 'none',
              borderRadius: '50px',
              padding: { xs: "8px 16px", md: "10px 20px" },
              fontSize: { xs: "0.85rem", md: "0.95rem" },
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: colors.brand_colors.stemine_purple_dark,
              },
            }}
          >
            {CourseMessages.is_adm_text_button}
          </Button>
        )}
      </Box>

      {/* Seção de Busca e Filtros - VISÍVEL PARA TODOS */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 3 }, mb: { xs: 4, md: 5 } }}>
        <TextField
          label={CourseMessages.search}
          variant="outlined"
          fullWidth={!['sm', 'md', 'lg'].includes('sm')}
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
      <Typography variant="body1" sx={{ color: colors.text.secondary, mb: { xs: 3, md: 4 } }}>
        {filteredCourses.length} {CourseMessages.courses_found}
      </Typography>

      {/* Listagem de CourseCards (Flexbox) */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, 
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          gap: { xs: '24px', sm: '32px', md: '16px' }, 
        }}
      >
        {filteredCourses.map((course) => (
          <Box
            key={course.id}
            sx={{
              flex: {
                xs: '1 1 100%',
                sm: '1 1 calc(50% - 16px)',
                md: '1 1 calc(33.33% - 10.67px)',
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
              duration={course.durationValue + ' ' + course.durationUnit}
              companyLogoUrl={course.companyLogoUrl}
              onSubscribeClick={() => handleSubscribe(course.title)}
              
              isAdm={isAdminUser}
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

      {/* Renderiza a CourseFormModal (ela só estará aberta se isModalOpen for true) */}
      <CourseFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitCourse}
        initialData={editingCourseData}
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