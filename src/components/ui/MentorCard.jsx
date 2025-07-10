import { Box, Typography, Paper, Button, Avatar } from "@mui/material";
import { COLORS_APP } from "../../constants/Colors";
import PersonIcon from "@mui/icons-material/Person";
import { MENTORING_PAGE_CONTENT } from "../../constants/Messages";
// Adicione ícones para editar e deletar
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';

// Componente auxiliar para as tags de especialidade
const SpecialtyTag = ({ text, color }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      marginRight: "8px",
      marginBottom: "4px",
    }}
  >
    <Box
      sx={{
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        backgroundColor: color || COLORS_APP.brand_colors.stemine_purple,
        marginRight: "4px",
      }}
    />
    <Typography
      variant="caption"
      sx={{ color: COLORS_APP.text.secondary, fontSize: "0.75rem" }}
    >
      {text}
    </Typography>
  </Box>
);

const MentorCard = ({
  name,
  title,
  company,
  rating,
  sessionsCount,
  experienceYears,
  specialties = [],
  description,
  mentoringSlots,
  isAdm = false,
  //onScheduleMentoring,
  onViewProfile,
  // onEditClick,     // Se for para admin editar o mentor
  // onDeleteClick,   // Se for para admin deletar o mentor
  ...rest
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        backgroundColor: COLORS_APP.white,
        border: `1px solid ${COLORS_APP.border.light}`,
      }}
      {...rest}
    >
      <Box
        sx={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {/* Parte superior do Card: Avatar, Nome, Título, Empresa, Avaliação, Experiência */}
        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
          {/* Avatar (poderia ser imagem real se disponível) */}
          <Avatar
            sx={{
              bgcolor: COLORS_APP.brand_colors.stemine_purple,
              width: 48,
              height: 48,
              marginRight: 2,
              fontSize: "1.25rem",
            }}
          >
            {name ? name[0].toUpperCase() : <PersonIcon />}
          </Avatar>

          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: COLORS_APP.text.primary,
                lineHeight: 1.2,
              }}
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: COLORS_APP.text.secondary }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: COLORS_APP.text.secondary }}
            >
              {company}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
              <Typography
                variant="body2"
                sx={{ color: COLORS_APP.text.secondary, mr: 1 }}
              >
                ⭐ {rating} ({sessionsCount}{" "}
                {MENTORING_PAGE_CONTENT.mentor_card.sessions_completed})
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: COLORS_APP.text.secondary }}
              >
                {experienceYears}
              </Typography>
            </Box>
          </Box>
          {/* Opcional: Botões de Admin aqui, se for para gerenciar mentoras diretamente na lista */}
          {/* {isAdm && (
            <Box sx={{ display: 'flex', gap: '4px', position: 'absolute', top: 8, right: 8 }}>
              <IconButton size="small" onClick={onEditClick} sx={{ bgcolor: COLORS_APP.background.light }}>
                <EditIcon fontSize="small" sx={{ color: COLORS_APP.text.primary }} />
              </IconButton>
              <IconButton size="small" onClick={onDeleteClick} sx={{ bgcolor: COLORS_APP.background.light }}>
                <DeleteIcon fontSize="small" sx={{ color: COLORS_APP.status.error }} />
              </IconButton>
            </Box>
          )} */}
        </Box>

        {/* Especialidades */}
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: "bold", color: COLORS_APP.text.primary, mb: 1 }}
        >
          {MENTORING_PAGE_CONTENT.mentor_card.specialties_mentor}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2 }}>
          {specialties.map((spec, index) => (
            <SpecialtyTag
              key={index}
              text={spec}
              color={COLORS_APP.brand_colors.stemine_purple}
            />
          ))}
        </Box>

        {/* Descrição */}
        <Typography
          variant="body2"
          sx={{
            color: COLORS_APP.text.secondary,
            mb: 2,
            flexGrow: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          Descrição: {description}
        </Typography>

        {/* Slots de Mentoria (Visível para Admin para gestão) */}
        {isAdm && (
          <Typography
            variant="body2"
            sx={{
              color: COLORS_APP.brand_colors.stemine_purple,
              fontWeight: "bold",
              mb: 2,
            }}
          >
            {mentoringSlots}{" "}
            {MENTORING_PAGE_CONTENT.availability_info.mentoring_quantity_label}
          </Typography>
        )}

        {/* Botões de Ação (Agendar e Ver Perfil) */}
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 1, mt: "auto" }}
        >
          {/*           <Button
            variant="contained"
            disabled
            onClick={onScheduleMentoring}
            sx={{
              backgroundColor: COLORS_APP.brand_colors.stemine_purple,
              color: COLORS_APP.white,
              textTransform: 'none',
              padding: '8px 16px',
              fontWeight: 'bold',
              borderRadius: '4px',
              '&:hover': { backgroundColor: COLORS_APP.brand_colors.stemine_purple_dark },
            }}
          >
            {MENTORING_PAGE_CONTENT.mentor_card.schedule_mentoring_button}
          </Button>*/}
          <Button
            variant="outlined"
            disabled
            onClick={onViewProfile}
            sx={{
              borderColor: COLORS_APP.brand_colors.stemine_purple,
              color: COLORS_APP.brand_colors.stemine_purple,
              textTransform: "none",
              padding: "8px 16px",
              fontWeight: "bold",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: COLORS_APP.brand_colors.stemine_purple_light,
              },
            }}
          >
            {MENTORING_PAGE_CONTENT.mentor_card.full_profile_button}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default MentorCard;
