// src/components/VacancyCard.jsx

import React from 'react';
import { Box, Typography, Paper, Button, Avatar } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CategoryIcon from '@mui/icons-material/Category'; 
import BusinessIcon from '@mui/icons-material/Business';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import { colors } from '../../constants/Colors';
import { vacancy as VacancyMessages } from '../../constants/Messages'; 

const Tag = ({ text, color }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '8px', marginBottom: '4px' }}>
    <Box
      sx={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: color || colors.text.secondary,
        marginRight: '4px',
      }}
    />
    <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.75rem' }}>
      {text}
    </Typography>
  </Box>
);

const VacancyCard = ({
  id,
  title,
  company,
  description,
  requirements, 
  benefits,    
  location,
  type,
  level,
  applicationLink,
  postedDate,
  isAdm = false,
  onApplyClick,  
  onEditClick, 
  onDeleteClick,
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
        position: 'relative', // Para posicionar botões de admin
      }}
      {...rest}
    >
      {/* Botões de Admin (Editar e Deletar) */}
      {isAdm && (
        <Box sx={{ position: 'absolute', top: '8px', right: '8px', display: 'flex', gap: '4px', zIndex: 1 }}>
          <IconButton
            size="small"
            onClick={() => onEditClick(id)}
            sx={{
              backgroundColor: colors.background.dark,
              color: colors.white,
              '&:hover': { backgroundColor: colors.text.primary },
              padding: '6px',
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDeleteClick(id, title)}
            sx={{
              backgroundColor: colors.background.dark,
              color: colors.white,
              '&:hover': { backgroundColor: colors.status.error },
              padding: '6px',
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      <Box sx={{ padding: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Título da Vaga */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: colors.text.primary, mb: 1, lineHeight: 1.3 }}>
          {title}
        </Typography>
        {/* Empresa */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <BusinessIcon sx={{ fontSize: '1rem', color: colors.text.secondary, mr: 0.5 }} />
          <Typography variant="body2" sx={{ color: colors.text.secondary }}>
            {company}
          </Typography>
        </Box>

        {/* Localização, Tipo, Nível */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
          <Tag text={location} color={colors.status.info} />
          <Tag text={type} color={colors.brand_colors.stemine_purple} />
          <Tag text={level} color={colors.brand_colors.stemine_pink} />
        </Box>
        
        {/* Descrição da Vaga */}
        <Typography variant="body2" sx={{ color: colors.text.primary, mb: 1.5, flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {description}
        </Typography>

        {/* Requisitos (simplificado para exibição) */}
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.text.primary, mb: 0.5 }}>
          Requisitos:
        </Typography>
        <Typography variant="body2" sx={{ color: colors.text.secondary, mb: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {requirements}
        </Typography>
        
        {/* Benefícios (simplificado para exibição) */}
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: colors.text.primary, mb: 0.5 }}>
          Benefícios:
        </Typography>
        <Typography variant="body2" sx={{ color: colors.text.secondary, mb: 2, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {benefits}
        </Typography>

        {/* Data de Publicação (Opcional) */}
        {postedDate && (
          <Typography variant="caption" sx={{ color: colors.text.secondary_light, textAlign: 'right', mb: 1 }}>
            Publicado em: {postedDate}
          </Typography>
        )}

        {/* Botão Candidatar-se */}
        <Button
          variant="contained"
          onClick={() => onApplyClick(applicationLink, title)}
          sx={{
            backgroundColor: colors.brand_colors.stemine_pink,
            color: colors.white,
            textTransform: 'none',
            padding: '10px 20px',
            fontWeight: 'bold',
            borderRadius: '4px',
            mt: 'auto', 
            '&:hover': {
              backgroundColor: colors.brand_colors.stemine_pink_dark,
            },
          }}
        >
          {VacancyMessages.apply_button}
        </Button>
      </Box>
    </Paper>
  );
};

export default VacancyCard;