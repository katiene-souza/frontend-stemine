import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  MENTORING_PAGE_CONTENT,
  VALIDATION_ERROR_MESSAGES,
} from "../constants/Messages";
import { COLORS_APP } from "../constants/Colors";

import { useAuth } from "../contexts/AuthContext";

import MentorCard from "../components/ui/MentorCard";

// Dados mockados de mentoras
const mockMentors = [
  {
    id: 1,
    name: "Eng. Caroline Santos",
    title: "Engenheira da Computação",
    company: "Google",
    rating: 5,
    sessionsCount: 89,
    experienceYears: "10 anos exp.",
    specialties: ["Backend", "Liderança", "Hardware"],
    description:
      "Apaixonada por desenvolver soluções inovadoras e capacitar novas talentos em tecnologia. Experiência robusta em sistemas escaláveis.",
    mentoringSlots: 2,
  },
  {
    id: 2,
    name: "Dra. Ana Paula Lima",
    title: "Cientista de Dados Sênior",
    company: "Microsoft",
    rating: 4.8,
    sessionsCount: 75,
    experienceYears: "8 anos exp.",
    specialties: ["Machine Learning", "Análise de Dados", "Python"],
    description:
      "Auxilio mulheres a desvendar o mundo dos dados, transformando números em insights poderosos para a carreira e negócios.",
    mentoringSlots: 3,
  },
  {
    id: 3,
    name: "Arq. Bruna Mendes",
    title: "Arquiteta de Soluções Cloud",
    company: "Amazon Web Services",
    rating: 4.9,
    sessionsCount: 92,
    experienceYears: "12 anos exp.",
    specialties: ["Cloud Computing", "DevOps", "Cybersegurança"],
    description:
      "Com vasta experiência em infraestrutura e segurança, ajudo a construir carreiras sólidas no universo da nuvem e desenvolvimento.",
    mentoringSlots: 1,
  },
];

const MentoringPage = () => {
  const { user, isAuthenticated } = useAuth();
  const isAdminUser = isAuthenticated && user?.role === "admin";

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

  const handleScheduleMentoring = (mentorName) => {
    showSnackbar(
      `Inscrição para mentoria com ${mentorName} iniciada!`,
      "success"
    );
  };

  const handleViewMentorProfile = (mentorName) => {
    showSnackbar(`Visualizando perfil completo de ${mentorName}`, "info");
  };

  const handleEditMentor = (mentorId) => {
    if (!isAdminUser) {
      showSnackbar(
        VALIDATION_ERROR_MESSAGES.authentication.permission_denied,
        "error"
      );
      return;
    }
    showSnackbar(`Editando mentora ${mentorId}`, "info");
  };

  const handleDeleteMentor = (mentorId, mentorName) => {
    if (!isAdminUser) {
      showSnackbar(
        VALIDATION_ERROR_MESSAGES.authentication.permission_denied,
        "error"
      );
      return;
    }
    if (
      window.confirm(`Tem certeza que deseja excluir a mentora ${mentorName}?`)
    ) {
      showSnackbar(`Mentora ${mentorName} excluída! (Simulação)`, "success");
    }
  };

  return (
    <Container
      maxWidth="false"
      sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, sm: 4, md: 8 } }}
    >
      {/* 1. Banner Principal (`Programa de Mentoria`) - Sem alterações */}
      <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: "bold", color: COLORS_APP.text.primary, mb: 2 }}
        >
          {MENTORING_PAGE_CONTENT.title}
        </Typography>
      </Box>

      {/* 2. Como Funciona a Mentoria na STEMINE? - Sem alterações */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: "24px", md: "32px" },
          alignItems: "stretch",
          mb: { xs: 6, md: 8 },
        }}
      >
        {/* Lado Esquerdo: Descrição */}
        <Box sx={{ flex: 1, boxSizing: "border-box" }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 4 },
              height: "100%",
              border: `1px solid ${COLORS_APP.border.light}`,
              borderRadius: "12px",
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: COLORS_APP.text.primary, mb: 2 }}
            >
              {MENTORING_PAGE_CONTENT.steps.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: COLORS_APP.text.secondary, mb: 1.5 }}
            >
              {MENTORING_PAGE_CONTENT.how_it_works.description_part_one}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: COLORS_APP.text.secondary }}
            >
              {MENTORING_PAGE_CONTENT.how_it_works.description_part_two}
            </Typography>

            <>
              <Button
                variant="contained"
                onClick={() => handleScheduleMentoring("general")}
                disabled
                sx={{
                  backgroundColor: COLORS_APP.brand_colors.stemine_purple,
                  color: COLORS_APP.white,
                  textTransform: "none",
                  padding: { xs: "12px 25px", md: "15px 30px" },
                  marginTop: "40px",
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  fontWeight: "bold",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor:
                      COLORS_APP.brand_colors.stemine_purple_dark,
                  },
                }}
              >
                {MENTORING_PAGE_CONTENT.how_it_works.enroll_button}
              </Button>
              {/*              <Typography
                variant="body1"
                sx={{
                  color: COLORS_APP.text.secondary,
                  mt: 2,
                  maxWidth: "700px",
                  marginX: "auto",
                }}
              >
                {MENTORING_PAGE_CONTENT.how_it_works.registration_success_message}
              </Typography> */}
            </>
          </Paper>
        </Box>
        {/* Lado Direito: Passos Numerados */}
        <Box sx={{ flex: 1, boxSizing: "border-box" }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 4 },
              height: "100%",
              backgroundColor: COLORS_APP.brand_colors.stemine_purple_light,
              borderRadius: "12px",
            }}
          >
            <List>
              {/* Passos ... */}
              <ListItem sx={{ alignItems: "flex-start", mb: 1.5 }}>
                <ListItemIcon sx={{ minWidth: "35px", mt: "4px" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: COLORS_APP.brand_colors.stemine_purple,
                    }}
                  >
                    1
                  </Typography>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        color: COLORS_APP.text.primary,
                      }}
                    >
                      {MENTORING_PAGE_CONTENT.steps.inscription.title}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{ color: COLORS_APP.text.secondary }}
                    >
                      {MENTORING_PAGE_CONTENT.steps.inscription.description}
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem sx={{ alignItems: "flex-start", mb: 1.5 }}>
                <ListItemIcon sx={{ minWidth: "35px", mt: "4px" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: COLORS_APP.brand_colors.stemine_purple,
                    }}
                  >
                    2
                  </Typography>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        color: COLORS_APP.text.primary,
                      }}
                    >
                      {MENTORING_PAGE_CONTENT.steps.assessment_and_match.title}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{ color: COLORS_APP.text.secondary }}
                    >
                      {
                        MENTORING_PAGE_CONTENT.steps.assessment_and_match
                          .description
                      }
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem sx={{ alignItems: "flex-start", mb: 1.5 }}>
                <ListItemIcon sx={{ minWidth: "35px", mt: "4px" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: COLORS_APP.brand_colors.stemine_purple,
                    }}
                  >
                    3
                  </Typography>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        color: COLORS_APP.text.primary,
                      }}
                    >
                      {MENTORING_PAGE_CONTENT.steps.connection.title}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{ color: COLORS_APP.text.secondary }}
                    >
                      {MENTORING_PAGE_CONTENT.steps.connection.description}
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem sx={{ alignItems: "flex-start" }}>
                <ListItemIcon sx={{ minWidth: "35px", mt: "4px" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: COLORS_APP.brand_colors.stemine_purple,
                    }}
                  >
                    4
                  </Typography>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "bold",
                        color: COLORS_APP.text.primary,
                      }}
                    >
                      {
                        MENTORING_PAGE_CONTENT.steps.continuous_development
                          .title
                      }
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{ color: COLORS_APP.text.secondary }}
                    >
                      {
                        MENTORING_PAGE_CONTENT.steps.continuous_development
                          .description
                      }
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Box>
      </Box>

      {/* 4. "Nossas mentoras" - VISÍVEL APENAS PARA ADMINS */}
      {isAdminUser && (
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: "bold",
              color: COLORS_APP.text.primary,
              mb: { xs: 4, md: 6 },
              textAlign: "center",
            }}
          >
            {MENTORING_PAGE_CONTENT.admin_section.mentors_list_title}
          </Typography>
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
            {mockMentors.map((mentor) => (
              <Box
                key={mentor.id}
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
                <MentorCard
                  name={mentor.name}
                  title={mentor.title}
                  company={mentor.company}
                  rating={mentor.rating}
                  sessionsCount={mentor.sessionsCount}
                  experienceYears={mentor.experienceYears}
                  specialties={mentor.specialties}
                  description={mentor.description}
                  mentoringSlots={mentor.mentoringSlots}
                  isAdm={isAdminUser}
                  onScheduleMentoring={() =>
                    handleScheduleMentoring(mentor.name)
                  }
                  onViewProfile={() => handleViewMentorProfile(mentor.name)}
                />
              </Box>
            ))}
          </Box>
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button
              disabled
              variant="contained"
              sx={{
                backgroundColor: COLORS_APP.brand_colors.stemine_purple,
                color: COLORS_APP.white,
                textTransform: "none",
                fontWeight: "bold",
                padding: "12px 24px",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: COLORS_APP.brand_colors.stemine_purple_dark,
                },
              }}
            >
              {MENTORING_PAGE_CONTENT.admin_section.add_mentor_button}
            </Button>
          </Box>
        </Box>
      )}

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

export default MentoringPage;
