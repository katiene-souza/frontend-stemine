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

const initialMockVacancies = [
  {
    id: "v001",
    title: "Desenvolvedor(a) Front-end Pleno",
    company: "TechSolutions Ltda.",
    description:
      "Buscamos profissional experiente em React para atuar no desenvolvimento de interfaces de usuário.",
    requirements:
      "Experiência com React, JavaScript/TypeScript, HTML/CSS, Git. Conhecimento em Material-UI é um diferencial.",
    benefits:
      "Vale-refeição, Plano de saúde, Home Office flexível, Day off de aniversário.",
    location: "Belo Horizonte, MG",
    type: "CLT",
    level: "Pleno",
    applicationLink:
      "https://www.google.com/search?q=vaga+frontend+techsolutions",
    postedDate: "2025-06-30",
  },
  {
    id: "v002",
    title: "Cientista de Dados Júnior",
    company: "Data Insights S.A.",
    description:
      "Oportunidade para iniciar carreira em ciência de dados, auxiliando na análise e modelagem de grandes volumes de dados.",
    requirements:
      "Conhecimento em Python, SQL, Estatística básica. Desejável experiência com Pandas/NumPy.",
    benefits:
      "Bolsa de estudo para cursos, Vale-transporte, Convênio academia.",
    location: "São Paulo, SP",
    type: "Estágio",
    level: "Júnior",
    applicationLink:
      "https://www.google.com/search?q=vaga+data+insights+junior",
    postedDate: "2025-07-01",
  },
  {
    id: "v003",
    title: "Especialista em Cibersegurança",
    company: "SecureNet Corp.",
    description:
      "Procuramos especialista em segurança para proteger nossos sistemas e redes contra ameaças cibernéticas.",
    requirements:
      "Experiência em pentests, análise de vulnerabilidades, SIEM. Certificações serão um diferencial.",
    benefits: "Plano odontológico, Aulas de inglês, Participação nos lucros.",
    location: "Remoto",
    type: "CLT",
    level: "Sênior",
    applicationLink:
      "https://www.google.com/search?q=vaga+ciberseguranca+securenet",
    postedDate: "2025-07-05",
  },
];

const VacanciesPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const isAdminUser = isAuthenticated && user?.roles.includes("ROLE_ADMIN");

  const [vacancies, setVacancies] = useState(initialMockVacancies);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState(
    OPTIONS_INFORMATION_JSON.vacancyLocation[0].label
  );
  const [typeFilter, setTypeFilter] = useState(
    OPTIONS_INFORMATION_JSON.vacancyType[0].label
  );
  const [levelFilter, setLevelFilter] = useState(
    OPTIONS_INFORMATION_JSON.vacancyLevel[0].label
  );

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingVacancyData, setEditingVacancyData] = useState(null);

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [vacancyToDelete, setVacancyToDelete] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

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

  // Filtro
  const filteredVacancies = vacancies.filter((vacancy) => {
    const matchesSearch =
      vacancy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacancy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacancy.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      locationFilter === OPTIONS_INFORMATION_JSON.vacancyLocation[0].label ||
      vacancy.location === locationFilter;
    const matchesType =
      typeFilter === OPTIONS_INFORMATION_JSON.vacancyType[0].label ||
      vacancy.type === typeFilter;
    const matchesLevel =
      levelFilter === OPTIONS_INFORMATION_JSON.vacancyLevel[0].label ||
      vacancy.level === levelFilter;

    return matchesSearch && matchesLocation && matchesType && matchesLevel;
  });

  // --- Funções de Ação ---
  const handleApply = (applicationLink, vacancyTitle) => {
    if (!isAuthenticated) {
      showSnackbar(
        VALIDATION_ERROR_MESSAGES.authentication.login_required,
        "info"
      );
      navigate("/login"); // Redireciona para login
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

  // --- Funções de Admin (Protegidas) ---
  const handleOpenFormModal = () => {
    if (!isAdminUser) {
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
    if (!isAdminUser) {
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

  const handleDeleteVacancy = (vacancyId, vacancyTitle) => {
    if (!isAdminUser) {
      showSnackbar(
        VALIDATION_ERROR_MESSAGES.authentication.permission_denied,
        "error"
      );
      return;
    }
    setVacancyToDelete({ id: vacancyId, title: vacancyTitle }); // Define qual vaga será deletada
    setConfirmDialogOpen(true); // Abre o diálogo
  };

  // NOVO: handleConfirmDeleteVacancy - Lógica real de exclusão após confirmação
  const handleConfirmDeleteVacancy = () => {
    if (vacancyToDelete) {
      setVacancies((prevVacancies) =>
        prevVacancies.filter((v) => v.id !== vacancyToDelete.id)
      );
      showSnackbar(
        `Vaga "${vacancyToDelete.title}" excluída com sucesso!`,
        "success"
      );
      setVacancyToDelete(null); // Limpa o estado
    }
    setConfirmDialogOpen(false); // Fecha o diálogo
  };

  const handleCancelDeleteVacancy = () => {
    setVacancyToDelete(null);
    setConfirmDialogOpen(false);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingVacancyData(null);
  };

  const handleSubmitVacancyForm = (formData) => {
    if (!isAdminUser) {
      showSnackbar(
        VALIDATION_ERROR_MESSAGES.authentication.permission_denied,
        "error"
      );
      return;
    }

    if (editingVacancyData) {
      // Lógica de Edição
      setVacancies((prevVacancies) =>
        prevVacancies.map((v) => (v.id === formData.id ? formData : v))
      );
      showSnackbar(FEEDBACK_MESSAGES.successful_vacancy_edition, "success");
    } else {
      // Lógica de Cadastro
      const newId = `v${
        Math.max(...vacancies.map((v) => parseInt(v.id.substring(1)))) + 1
      }`;
      setVacancies((prevVacancies) => [
        ...prevVacancies,
        { ...formData, id: newId },
      ]);
      showSnackbar(
        FEEDBACK_MESSAGES.successful_vacancy_registration,
        "success"
      );
    }
    handleCloseFormModal();
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
        {isAdminUser && (
          <Button
            variant="contained"
            onClick={handleOpenFormModal}
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
            {VACANCY_PAGE_CONTENT.admin_add_vacancy_button}
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
          fullWidth={!["sm", "md", "lg"].includes("sm")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: { sm: 1 }, minWidth: { sm: "200px" } }}
        />

        {/* Dropdown de Localização */}
        <TextField
          select
          label="Localização"
          variant="outlined"
          fullWidth
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          sx={{ width: { xs: "100%", sm: "auto" }, minWidth: { sm: "180px" } }}
        >
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
          onChange={(e) => setTypeFilter(e.target.value)}
          sx={{ width: { xs: "100%", sm: "auto" }, minWidth: { sm: "150px" } }}
        >
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
          onChange={(e) => setLevelFilter(e.target.value)}
          sx={{ width: { xs: "100%", sm: "auto" }, minWidth: { sm: "150px" } }}
        >
          {OPTIONS_INFORMATION_JSON.vacancyLevel.map((option) => (
            <MenuItem key={option.id} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Contagem de Vagas Encontradas */}
      <Typography
        variant="body1"
        sx={{ color: COLORS_APP.text.secondary, mb: { xs: 3, md: 4 } }}
      >
        {filteredVacancies.length}{" "}
        {VACANCY_PAGE_CONTENT.vacancies_found_message}
      </Typography>

      {/* Listagem de VacancyCards (Flexbox) */}
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
        {filteredVacancies.map((vacancy) => (
          <Box
            key={vacancy.id}
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
          >
            <VacancyCard
              id={vacancy.id}
              title={vacancy.title}
              company={vacancy.company}
              description={vacancy.description}
              requirements={vacancy.requirements}
              benefits={vacancy.benefits}
              location={vacancy.location}
              type={vacancy.type}
              level={vacancy.level}
              applicationLink={vacancy.applicationLink}
              postedDate={vacancy.postedDate}
              isAdm={isAdminUser}
              onApplyClick={handleApply}
              onEditClick={handleEditVacancy}
              onDeleteClick={handleDeleteVacancy}
            />
          </Box>
        ))}
        {filteredVacancies.length === 0 && (
          <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              {VACANCY_PAGE_CONTENT.no_vacancies_found}
            </Typography>
          </Box>
        )}
      </Box>

      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={handleCancelDeleteVacancy}
        onConfirm={handleConfirmDeleteVacancy}
        title={`Excluir "${vacancyToDelete?.title || "Vaga"}"?`}
        message={
          `Tem certeza que deseja excluir a vaga "${
            vacancyToDelete?.title || "esta vaga"
          }?" ` + VACANCY_PAGE_CONTENT.admin_confirmation_exclusion_message
        }
        confirmText="Excluir"
        confirmColor="error"
      />

      {/* Renderiza a VacancyFormModal */}
      <VacancyFormModal
        open={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSubmit={handleSubmitVacancyForm}
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
