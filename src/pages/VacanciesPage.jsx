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
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import VacancyService from "../services/VacancyService";

import VacancyCard from "../components/ui/VacancyCard";
import VacancyFormModal from "../components/ui/VacancyFormModal";

import { COLORS_APP } from "../constants/Colors";
import { OPTIONS_INFORMATION_JSON } from "../utils/OptionsInformationJson";

import {
  FEEDBACK_MESSAGES,
  VACANCY_PAGE_CONTENT,
  VALIDATION_ERROR_MESSAGES,
} from "../constants/Messages";
import ConfirmationDialog from "../components/ui/ConfirmationDialog";

const VacanciesPage = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [vacancies, setVacancies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingVacancyData, setEditingVacancyData] = useState(null);

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [vacancyToDelete, setVacancyToDelete] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState({ text: "", type: "" });

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

  useEffect(() => {
    fetchVacancies();
  }, []);

  const fetchVacancies = async (filters = {}) => {
    setLoading(true);
    setApiMessage({ text: "", type: "" });
    try {
      const response = await VacancyService.searchVacancies(filters);
      setVacancies(response.data);
    } catch (error) {
      console.error("Erro ao carregar vagas:", error);
      setApiMessage({
        text: "Erro ao carregar vagas. Tente novamente.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilter = () => {
    fetchVacancies({
      title: searchTerm,
      location:
        locationFilter === OPTIONS_INFORMATION_JSON.vacancyLocation[0].label
          ? ""
          : locationFilter,
      type:
        typeFilter === OPTIONS_INFORMATION_JSON.vacancyType[0].label
          ? ""
          : typeFilter,
      level:
        levelFilter === OPTIONS_INFORMATION_JSON.vacancyLevel[0].label
          ? ""
          : levelFilter,
    });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
    setTypeFilter("");
    setLevelFilter("");
    fetchVacancies({});
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleLocationFilterChange = (e) => {
    setLocationFilter(e.target.value);
    fetchVacancies({
      title: searchTerm,
      location: e.target.value,
      type: typeFilter,
      level: levelFilter,
    });
  };
  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
    fetchVacancies({
      title: searchTerm,
      location: locationFilter,
      type: e.target.value,
      level: levelFilter,
    });
  };
  const handleLevelFilterChange = (e) => {
    setLevelFilter(e.target.value);
    fetchVacancies({
      title: searchTerm,
      location: locationFilter,
      type: typeFilter,
      level: e.target.value,
    });
  };

  const handleApply = (applicationLink, vacancyTitle) => {
    if (!isAuthenticated) {
      showSnackbar(
        VALIDATION_ERROR_MESSAGES.authentication.login_required,
        "info"
      );
      navigate("/login");
    } else {
      if (applicationLink) {
        window.open(applicationLink, "_blank");
        showSnackbar(
          `Redirecionando para candidatura: ${vacancyTitle}`,
          "info"
        );
      } else {
        showSnackbar(
          `Link de candidatura para '${vacancyTitle}' não disponível.`,
          "warning"
        );
      }
    }
  };

  const handleOpenFormModal = () => {
    if (!isAdmin()) {
      showSnackbar(
        VALIDATION_ERROR_MESSAGES.authentication.permission_denied,
        "error"
      );
      return;
    }
    setEditingVacancyData(null);
    setIsFormModalOpen(true);
  };

  const handleEditVacancy = (vacancyId) => {
    if (!isAdmin()) {
      showSnackbar(
        VALIDATION_ERROR_MESSAGES.authentication.permission_denied,
        "error"
      );
      return;
    }
    const vacancyToEdit = vacancies.find((v) => v.id === vacancyId);
    setEditingVacancyData(vacancyToEdit);
    setIsFormModalOpen(true);
  };

  const handleDeleteVacancyTrigger = (vacancyId, vacancyTitle) => {
    if (!isAdmin()) {
      showSnackbar(
        VALIDATION_ERROR_MESSAGES.authentication.permission_denied,
        "error"
      );
      return;
    }
    setVacancyToDelete({ id: vacancyId, title: vacancyTitle });
    setConfirmDialogOpen(true);
  };

  const handleConfirmDeleteVacancy = async () => {
    if (vacancyToDelete) {
      setLoading(true);
      setApiMessage({ text: "", type: "" });
      try {
        await VacancyService.deleteVacancy(vacancyToDelete.id);
        showSnackbar(
          `Vaga "${vacancyToDelete.title}" excluída com sucesso!`,
          "success"
        );
        fetchVacancies();
        setVacancyToDelete(null);
      } catch (error) {
        console.error("Erro ao excluir vaga:", error);
        const errorMessage =
          error.response?.data?.message ||
          FEEDBACK_MESSAGES.error_vacancy_deletion;
        setApiMessage({ text: errorMessage, type: "error" });
      } finally {
        setLoading(false);
      }
    }
    setConfirmDialogOpen(false);
  };

  const handleCancelDeleteVacancy = () => {
    setVacancyToDelete(null);
    setConfirmDialogOpen(false);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingVacancyData(null);
    setApiMessage({ text: "", type: "" });
  };

  const handleSubmitVacancyForm = async (formData) => {
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
      const dataToSend = {
        ...formData,
        postedDate: formData.postedDate,
        id:
          formData.id &&
          typeof formData.id === "string" &&
          formData.id.startsWith("v")
            ? parseInt(formData.id.substring(1))
            : formData.id,
      };

      let response;
      if (editingVacancyData) {
        response = await VacancyService.updateVacancy(
          editingVacancyData.id,
          dataToSend
        );
        showSnackbar(FEEDBACK_MESSAGES.successful_vacancy_edition, "success");
      } else {
        response = await VacancyService.createVacancy(dataToSend);
        showSnackbar(
          FEEDBACK_MESSAGES.successful_vacancy_registration,
          "success"
        );
      }
      fetchVacancies();
      handleCloseFormModal();
    } catch (error) {
      console.error("Erro ao salvar vaga:", error);
      const errorMessage =
        error.response?.data?.message || FEEDBACK_MESSAGES.error_vacancy_save;
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
      {/* Cabeçalho da Página de Vagas */}
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
          {VACANCY_PAGE_CONTENT.title}
        </Typography>
        {isAdmin() && (
          <Button
            variant="contained"
            onClick={handleOpenFormModal}
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
              VACANCY_PAGE_CONTENT.admin_add_vacancy_button
            )}
          </Button>
        )}
      </Box>

      {/* Seção de Busca e Filtros */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 3 },
          mb: { xs: 4, md: 5 },
        }}
      >
        {/* Campo de Busca */}
        <TextField
          label={VACANCY_PAGE_CONTENT.search_placeholder}
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
          sx={{ flex: { sm: 1 }, minWidth: { sm: "200px" } }}
        />

        {/* Dropdown de Localização */}
        <TextField
          select
          label="Localização"
          variant="outlined"
          fullWidth
          value={locationFilter}
          onChange={handleLocationFilterChange}
          sx={{ width: { xs: "100%", sm: "auto" }, minWidth: { sm: "180px" } }}
        >
          <MenuItem value="">Todas</MenuItem>
          {OPTIONS_INFORMATION_JSON.vacancyLocation.map((option) => (
            <MenuItem key={option.id} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        {/* Dropdown de Tipo de Contrato */}
        <TextField
          select
          label="Tipo"
          variant="outlined"
          fullWidth
          value={typeFilter}
          onChange={handleTypeFilterChange}
          sx={{ width: { xs: "100%", sm: "auto" }, minWidth: { sm: "150px" } }}
        >
          <MenuItem value="">Todos</MenuItem>
          {OPTIONS_INFORMATION_JSON.vacancyType.map((option) => (
            <MenuItem key={option.id} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        {/* Dropdown de Nível */}
        <TextField
          select
          label="Nível"
          variant="outlined"
          fullWidth
          value={levelFilter}
          onChange={handleLevelFilterChange}
          sx={{ width: { xs: "100%", sm: "auto" }, minWidth: { sm: "150px" } }}
        >
          <MenuItem value="">Todos</MenuItem>
          {OPTIONS_INFORMATION_JSON.vacancyLevel.map((option) => (
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
          }}
        >
          Limpar
        </Button>
      </Box>

      {/* Contagem de Vagas Encontradas */}
      <Typography
        variant="body1"
        sx={{ color: COLORS_APP.text.secondary, mb: { xs: 3, md: 4 } }}
      >
        {vacancies.length} {VACANCY_PAGE_CONTENT.vacancies_found_message}
      </Typography>

      {/* Mensagens da API */}
      {apiMessage.text && (
        <Alert severity={apiMessage.type} sx={{ mb: 3 }}>
          {apiMessage.text}
        </Alert>
      )}

      {/* Exibe o spinner de carregamento da lista de vagas */}
      {loading && !apiMessage.text && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && !apiMessage.text && vacancies.length === 0 && (
        <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            {VACANCY_PAGE_CONTENT.no_vacancies_found}
          </Typography>
        </Box>
      )}

      {/* Listagem de VacancyCards (Grid) */}
      <Grid container spacing={3}>
        {vacancies.map((vacancy) => (
          <Grid item xs={12} sm={6} md={6} key={vacancy.id}>
            <VacancyCard
              vacancy={vacancy}
              isAdm={isAdmin()}
              onApplyClick={ () =>
                handleApply(vacancy.applicationLink, vacancy.title)
              }
              onEditClick={() => handleEditVacancy(vacancy.id)}
              onDeleteClick={() =>
                handleDeleteVacancyTrigger(vacancy.id, vacancy.title)
              }
            />
          </Grid>
        ))}
      </Grid>

      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={handleCancelDeleteVacancy}
        onConfirm={handleConfirmDeleteVacancy}
        title={`Excluir "${vacancyToDelete?.title || "Vaga"}"?`}
        message={
          `Tem certeza que deseja excluir a vaga "${
            vacancyToDelete?.title || "esta vaga"
          }"? ` + VACANCY_PAGE_CONTENT.admin_confirmation_exclusion_message
        }
        confirmText="Excluir"
        confirmColor="error"
      />

      {/* Renderiza a VacancyFormModal */}
      <VacancyFormModal
        open={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSave={handleSubmitVacancyForm}
        initialData={editingVacancyData}
      />

      {/* Snackbar para feedback */}
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

export default VacanciesPage;
