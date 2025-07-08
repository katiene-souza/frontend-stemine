import { Box, Typography, Paper, Button, Avatar } from '@mui/material'; // Adicione Avatar
import { colors } from '../../constants/Colors';
import PersonIcon from '@mui/icons-material/Person'; // Ícone de pessoa para Avatar padrão
// Adicione ícones para editar e deletar, se desejar que o admin possa gerenciar o mentor diretamente aqui
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';


// Componente auxiliar para as tags de especialidade
const SpecialtyTag = ({ text, color }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '8px', marginBottom: '4px' }}>
    <Box
      sx={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: color || colors.brand_colors.stemine_purple,
        marginRight: '4px',
      }}
    />
    <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.75rem' }}>
      {text}
    </Typography>
  </Box>
);

const MentorCard = ({
  name,              // Nome da mentora
  title,             // Título (ex: Engenheira da Computação)
  company,           // Empresa (ex: Google)
  rating,            // Avaliação (ex: 5)
  sessionsCount,     // Quantidade de sessões (ex: 89 sessões)
  experienceYears,   // Anos de experiência (ex: 10 anos exp.)
  specialties = [],  // Array de especialidades (ex: ["Backend", "Liderança"])
  description,       // Breve descrição / frase de impacto
  mentoringSlots,    // Slots de mentoria disponíveis (ex: 2 mentorias disponíveis este mês)
  isAdm = false,     // Se é um admin vendo o card
  onScheduleMentoring, // Função para agendar mentoria
  onViewProfile,     // Função para ver perfil completo
  // onEditClick,     // Se for para admin editar o mentor
  // onDeleteClick,   // Se for para admin deletar o mentor
  ...rest
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: colors.white,
        border: `1px solid ${colors.border.light}`,
      }}
      {...rest}
    >
      <Box sx={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Parte superior do Card: Avatar, Nome, Título, Empresa, Avaliação, Experiência */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          {/* Avatar (poderia ser imagem real se disponível) */}
          <Avatar sx={{ 
            bgcolor: colors.brand_colors.stemine_purple, 
            width: 48, 
            height: 48, 
            marginRight: 2, 
            fontSize: '1.25rem' 
          }}>
            {name ? name[0].toUpperCase() : <PersonIcon />}
          </Avatar>
          
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: colors.text.primary, lineHeight: 1.2 }}>
              {name}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.secondary }}>
              {company}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <Typography variant="body2" sx={{ color: colors.text.secondary, mr: 1 }}>
                ⭐ {rating} ({sessionsCount} sessões)
              </Typography>
              <Typography variant="body2" sx={{ color: colors.text.secondary }}>
                {experienceYears}
              </Typography>
            </Box>
          </Box>
          {/* Opcional: Botões de Admin aqui, se for para gerenciar mentoras diretamente na lista */}
          {/* {isAdm && (
            <Box sx={{ display: 'flex', gap: '4px', position: 'absolute', top: 8, right: 8 }}>
              <IconButton size="small" onClick={onEditClick} sx={{ bgcolor: colors.background.light }}>
                <EditIcon fontSize="small" sx={{ color: colors.text.primary }} />
              </IconButton>
              <IconButton size="small" onClick={onDeleteClick} sx={{ bgcolor: colors.background.light }}>
                <DeleteIcon fontSize="small" sx={{ color: colors.status.error }} />
              </IconButton>
            </Box>
          )} */}
        </Box>

        {/* Especialidades */}
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.text.primary, mb: 1 }}>
          Especialidades:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
          {specialties.map((spec, index) => (
            <SpecialtyTag key={index} text={spec} color={colors.brand_colors.stemine_purple} />
          ))}
        </Box>

        {/* Descrição */}
        <Typography variant="body2" sx={{ color: colors.text.secondary, mb: 2, flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          Descrição: {description}
        </Typography>
        
        {/* Slots de Mentoria (Visível para Admin para gestão) */}
        {isAdm && (
          <Typography variant="body2" sx={{ color: colors.brand_colors.stemine_purple, fontWeight: 'bold', mb: 2 }}>
            {mentoringSlots} mentorias disponíveis este mês
          </Typography>
        )}

        {/* Botões de Ação (Agendar e Ver Perfil) */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 'auto' }}>
          <Button
            variant="contained"
            onClick={onScheduleMentoring}
            sx={{
              backgroundColor: colors.brand_colors.stemine_purple,
              color: colors.white,
              textTransform: 'none',
              padding: '8px 16px',
              fontWeight: 'bold',
              borderRadius: '4px',
              '&:hover': { backgroundColor: colors.brand_colors.stemine_purple_dark },
            }}
          >
            Agendar mentoria
          </Button>
          <Button
            variant="outlined"
            onClick={onViewProfile}
            sx={{
              borderColor: colors.brand_colors.stemine_purple,
              color: colors.brand_colors.stemine_purple,
              textTransform: 'none',
              padding: '8px 16px',
              fontWeight: 'bold',
              borderRadius: '4px',
              '&:hover': { backgroundColor: colors.brand_colors.stemine_purple_light },
            }}
          >
            Ver Perfil Completo
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default MentorCard;