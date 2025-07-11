import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import CourseService from "../services/courseService";

import {
  COURSE_PAGE_CONTENT,
  FEEDBACK_MESSAGES,
  VALIDATION_ERROR_MESSAGES,
} from "../constants/Messages";
import { COLORS_APP } from "../constants/Colors";
import { OPTIONS_INFORMATION_JSON } from "../utils/OptionsInformationJson";

import CourseCard from "../components/ui/CourseCard";
import ConfirmationDialog from "../components/ui/ConfirmationDialog";
import CourseFormModal from "../components/ui/CourseFormModal";

const CoursesPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourseData, setEditingCourseData] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async (filters = {}) => {
    setLoading(true);
    setApiMessage({ text: "", type: "" });
    try {
      const response = await CourseService.searchCourses(filters);
      setCourses(response.data);
    } catch (error) {
      console.error("Erro ao carregar cursos:", error);
      setApiMessage({
        text: "Erro ao carregar cursos. Tente novamente.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLevelFilterChange = (e) => {
    setLevelFilter(e.target.value);
    fetchCourses({
      title: searchTerm,
      level: e.target.value,
      categories: categoryFilter,
    });
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
    fetchCourses({
      title: searchTerm,
      level: levelFilter,
      categories: e.target.value,
    });
  };

  const handleApplyFilter = () => {
    fetchCourses({
      title: searchTerm,
      level: levelFilter,
      categories: categoryFilter,
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setLevelFilter("");
    setCategoryFilter("");
    fetchCourses({});
  };

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
        showSnackbar(
          `Link do curso '${courseTitle}' não disponível.`,
          "warning"
        );
      }
    }
  };

  const handleEditCourse = (courseId) => {
    if (!isAdmin()) {
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

  const handleDeleteCourseTrigger = (courseId, courseTitle) => {
    if (!isAdmin()) {
      showSnackbar(
        VALIDATION_ERROR_MESSAGES.authentication.permission_denied,
        "error"
      );
      return;
    }
    setCourseToDelete({ id: courseId, title: courseTitle });
    setConfirmDialogOpen(true);
  };

  const handleConfirmDeleteCourse = async () => {
    if (courseToDelete) {
      setLoading(true);
      setApiMessage({ text: "", type: "" });
      try {
        await CourseService.deleteCourse(courseToDelete.id);
        showSnackbar(
          `Curso "${courseToDelete.title}" excluído com sucesso!`,
          "success"
        );
        fetchCourses();
        setCourseToDelete(null);
      } catch (error) {
        console.error("Erro ao excluir curso:", error);
        const errorMessage =
          error.response?.data?.message ||
          FEEDBACK_MESSAGES.error_course_deletion;
        setApiMessage({ text: errorMessage, type: "error" });
      } finally {
        setLoading(false);
      }
    }
    setConfirmDialogOpen(false);
  };

  const handleCancelDeleteCourse = () => {
    setCourseToDelete(null);
    setConfirmDialogOpen(false);
  };

  const handleOpenModal = () => {
    if (!isAdmin()) {
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
    setApiMessage({ text: "", type: "" });
  };

  const handleSubmitCourse = async (formData) => {
    if (!isAdmin()) {
      showSnackbar(
        VALIDATION_ERROR_MESSAGES.authentication.permission_denied,
        "error"
      );
      return;
    }
    setLoading(true);
    setApiMessage({ text: "", type: "" });
    try {
      if (editingCourseData) {
        await CourseService.updateCourse(formData.id, formData);
        showSnackbar(FEEDBACK_MESSAGES.sucessful_course_edition, "success");
      } else {
        await CourseService.createCourse(formData);
        showSnackbar(
          FEEDBACK_MESSAGES.sucessful_course_registration,
          "success"
        );
      }
      fetchCourses();
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar curso:", error);
      const errorMessage =
        error.response?.data?.message || FEEDBACK_MESSAGES.error_course_save;
      setApiMessage({ text: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, sm: 4, md: 8 } }}
    >
     
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
        {isAdmin() && (
          <Button
            variant="contained"
            onClick={handleOpenModal}
            disabled={loading}
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
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              COURSE_PAGE_CONTENT.admin_add_course_button
            )}
          </Button>
        )}
      </Box>


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
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleApplyFilter();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleApplyFilter}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
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
          onChange={handleLevelFilterChange}
          sx={{
            width: { xs: "100%", sm: "auto" },
            minWidth: { sm: "150px" },
          }}
        >
          <MenuItem value="">Todos</MenuItem>{" "}
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
          onChange={handleCategoryFilterChange}
          sx={{
            width: { xs: "100%", sm: "auto" },
            minWidth: { sm: "180px" },
          }}
        >
          <MenuItem value="">Todas</MenuItem>{" "}
          {OPTIONS_INFORMATION_JSON.categories.map((option) => (
            <MenuItem key={option.id} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="outlined"
          onClick={handleClearFilters}
          sx={{
            width: { xs: "100%", sm: "auto" },
            minWidth: { sm: "120px" },
            color: COLORS_APP.brand_colors.stemine_purple,
            borderColor: COLORS_APP.brand_colors.stemine_purple,
            borderRadius: "50px",
          }}
        >
          Limpar
        </Button>
      </Box>


      <Typography
        variant="body1"
        sx={{ color: COLORS_APP.text.secondary, mb: { xs: 3, md: 4 } }}
      >
        {courses.length} {COURSE_PAGE_CONTENT.courses_found_message}
      </Typography>

      {apiMessage.text && (
        <Alert severity={apiMessage.type} sx={{ mb: 3 }}>
          {apiMessage.text}
        </Alert>
      )}

      {loading && !apiMessage.text && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && !apiMessage.text && courses.length === 0 && (
        <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            {COURSE_PAGE_CONTENT.no_courses_found}
          </Typography>
        </Box>
      )}



      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "stretch",
          gap: { xs: "24px", sm: "32px", md: "24px" },
        }}
      >
        {courses.map((course) => (
          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 16px)",
                md: "1 1 calc(50% - 16px)",
              },
              maxWidth: {
                xs: "100%",
                sm: "calc(50% - 16px)",
                md: "calc(50% - 16px)",
              },
              boxSizing: "border-box",
            }}
            key={course.id}
          >
            <CourseCard
              course={course}
              isAdm={isAdmin()}
              onSubscribeClick={() =>
                handleSubscribe(course.courseUrl, course.title)
              }
              onEditClick={() => handleEditCourse(course.id)}
              onDeleteClick={() =>
                handleDeleteCourseTrigger(course.id, course.title)
              }
            />
          </Box>
        ))}
      </Box>


      <CourseFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSubmitCourse}
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
          }"? ` +
          COURSE_PAGE_CONTENT.course_exclusion_modal.confirmation_message
        }
        confirmText="Excluir"
        confirmColor="error"
      />


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
