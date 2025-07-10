import { useState } from "react";
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

import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import {
  COURSE_PAGE_CONTENT,
  FEEDBACK_MESSAGES,
  VALIDATION_ERROR_MESSAGES,
} from "../constants/Messages";
import { COLORS_APP } from "../constants/Colors";
import { OPTIONS_INFORMATION_JSON } from "../utils/OptionsInformationJson";

import CourseCard from "../components/ui/CourseCard";
import CourseFormModal from "../components/ui/CourseFormModal";
import ConfirmationDialog from "../components/ui/ConfirmationDialog";

// Dados de exemplo INICIAIS para os cursos (mock)
const initialExampleCourses = [
  {
    id: 1,
    imageUrl: "https://storage.googleapis.com/star-lab/blog/OGs/react.png",
    level: "Intermediário",
    categories: ["Tecnologia", "Matemática"],
    title: "Desenvolvimento Front-end com React",
    description:
      "Acesse os melhores cursos com certificado para se especializar e se destacar nas áreas STEM. Este curso abrange desde os fundamentos até tópicos avançados de React.",
    durationValue: "8",
    durationUnit: "semanas",
    company_logo_url:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png",
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
    company_logo_url: "https://via.placeholder.com/80x30?text=LOGO+EMPRESA+B",
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
    company_logo_url: "https://via.placeholder.com/80x30?text=LOGO+EMPRESA+C",
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
    company_logo_url: "https://via.placeholder.com/80x30?text=LOGO+EMPRESA+D",
  },
];

const CoursesPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const isAdminUser = isAuthenticated && user?.role === "admin";

  const [courses, setCourses] = useState(initialExampleCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState(
    OPTIONS_INFORMATION_JSON.level[0].label
  );
  const [categoryFilter, setCategoryFilter] = useState(
    OPTIONS_INFORMATION_JSON.category[0].label
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourseData, setEditingCourseData] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  // Filtra os cursos (lógica existente)
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel =
      levelFilter === OPTIONS_INFORMATION_JSON.level[0].label ||
      course.level === levelFilter;
    const matchesCategory =
      categoryFilter === OPTIONS_INFORMATION_JSON.category[0].label ||
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
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSubscribe = (courseUrl, courseTitle) => {
    if (!isAuthenticated) {
      showSnackbar(
        VALIDATION_ERROR_MESSAGES.authentication.login_required,
        "info"
      );
      navigate("/login"); 
    } else {
      if (courseUrl) {
        window.open(courseUrl, "_blank"); 
        showSnackbar(`Redirecionando para o curso: ${courseTitle}`, "info");
      } else {
        showSnackbar(`Link do curso '${courseTitle}' não disponível.`, "warning");
      }
    }
  }; 

  const handleEditCourse = (courseId) => {
    if (!isAdminUser) {
      showSnackbar(
        VALIDATION_ERROR_MESSAGES.authentication.permission_denied,
        "error"
      );
      return;
    }
    const courseToEdit = courses.find((c) => c.id === courseId);
    setEditingCourseData(courseToEdit);
    setIsModalOpen(true);
  };

  const handleDeleteCourse = (courseId, courseTitle) => {
    if (!isAdminUser) {
      showSnackbar(
        VALIDATION_ERROR_MESSAGES.authentication.permission_denied,
        "error"
      );
      return;
    }
    setCourseToDelete({ id: courseId, title: courseTitle });
    setConfirmDialogOpen(true);
  };

  const handleConfirmDeleteCourse = () => {
    if (courseToDelete) {
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseToDelete.id)
      );
      showSnackbar(
        `Curso "${courseToDelete.title}" excluído com sucesso!`,
        "success"
      );
      setCourseToDelete(null);
    }
    setConfirmDialogOpen(false);
  };

  const handleCancelDeleteCourse = () => {
    setCourseToDelete(null);
    setConfirmDialogOpen(false);
  };

  const handleOpenModal = () => {
    if (!isAdminUser) {
      showSnackbar(
        VALIDATION_ERROR_MESSAGES.authentication.permission_denied,
        "error"
      );
      return;
    }
    setEditingCourseData(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCourseData(null);
  };

  const handleSubmitCourse = (formData) => {
    if (!isAdminUser) {
      showSnackbar(
        VALIDATION_ERROR_MESSAGES.authentication.permission_denied,
        "error"
      );
      return;
    }
    if (editingCourseData) {
      setCourses((prevCourses) =>
        prevCourses.map((c) => (c.id === formData.id ? formData : c))
      );
      showSnackbar(FEEDBACK_MESSAGES.sucessful_course_edition, "success");
    } else {
      const newId = Math.max(...courses.map((c) => c.id)) + 1;
      setCourses((prevCourses) => [...prevCourses, { ...formData, id: newId }]);
      showSnackbar(FEEDBACK_MESSAGES.sucessful_course_registration, "success");
    }
    handleCloseModal();
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
          sx={{ color: COLORS_APP.text.primary, fontWeight: "bold" }}
        >
          {COURSE_PAGE_CONTENT.title}
        </Typography>
        {isAdminUser && (
          <Button
            variant="contained"
            onClick={handleOpenModal}
            sx={{
              backgroundColor: COLORS_APP.brand_colors.stemine_purple,
              color: COLORS_APP.white,
              textTransform: "none",
              borderRadius: "50px",
              padding: { xs: "8px 16px", md: "10px 20px" },
              fontSize: { xs: "0.85rem", md: "0.95rem" },
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: COLORS_APP.brand_colors.stemine_purple_dark,
              },
            }}
          >
            {COURSE_PAGE_CONTENT.admin_add_course_button}
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
          label={COURSE_PAGE_CONTENT.search_placeholder}
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
          {OPTIONS_INFORMATION_JSON.level.map((option) => (
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
          {OPTIONS_INFORMATION_JSON.category.map((option) => (
            <MenuItem key={option.id} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Contagem de Cursos Encontrados */}
      <Typography
        variant="body1"
        sx={{ color: COLORS_APP.text.secondary, mb: { xs: 3, md: 4 } }}
      >
        {filteredCourses.length} {COURSE_PAGE_CONTENT.courses_found_message}
      </Typography>

      {/* Listagem de CourseCards (Flexbox) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "stretch",
          gap: { xs: "24px", sm: "32px", md: "16px" },
        }}
      >
        {filteredCourses.map((course) => (
          <Box
            key={course.id}
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 16px)",
                md: "1 1 calc(33.33% - 10.67px)",
              },
              maxWidth: {
                xs: "100%",
                sm: "calc(50% - 16px)",
                md: "calc(33.33% - 10.67px)",
              },
              boxSizing: "border-box",
            }}
          >
            <CourseCard
              imageUrl={course.imageUrl}
              level={course.level}
              categories={course.categories}
              title={course.title}
              description={course.description}
              duration={course.durationValue + " " + course.durationUnit}
              company_logo_url={course.company_logo_url}
              courseUrl={course.courseUrl}
              onSubscribeClick={handleSubscribe}
              isAdm={isAdminUser}
              onEditClick={() => handleEditCourse(course.id)}
              onDeleteClick={() => handleDeleteCourse(course.id, course.title)}
            />
          </Box>
        ))}
        {filteredCourses.length === 0 && (
          <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              {COURSE_PAGE_CONTENT.no_courses_found}
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

      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={handleCancelDeleteCourse}
        onConfirm={handleConfirmDeleteCourse}
        title={`Excluir "${courseToDelete?.title || "Curso"}"?`}
        message={
          `Tem certeza que deseja excluir o curso "${
            courseToDelete?.title || "este curso"
          }?" ` +
          COURSE_PAGE_CONTENT.course_exclusion_modal.confirmation_message
        }
        confirmText="Excluir"
        confirmColor="error"
      />

      {/* Snackbar para feedback de sucesso/erro */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CoursesPage;
