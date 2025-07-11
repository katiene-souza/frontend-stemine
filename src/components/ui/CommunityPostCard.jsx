import React from 'react';
import { Box, Typography, Paper, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import IconButton from '@mui/material/IconButton'; 
import EditIcon from '@mui/icons-material/Edit';   
import DeleteIcon from '@mui/icons-material/Delete';

import { COLORS_APP } from '../../constants/Colors';
import { COMMUNITY_PAGE_CONTENT } from '../../constants/Messages';
import { useAuth } from '../../contexts/AuthContext';

const CommunityPostCard = ({
  post,
  isAdm = false,
  onEditClick,  
  onDeleteClick, 
  ...rest
}) => {
  const { isAuthenticated } = useAuth();
  const {
    id,
    title,
    content,
    imageUrl,
    author,
    postedDate,
    votes = 0,
    commentsCount = 0,
    postType
  } = post;

  const formattedDate = postedDate ?
    new Date(postedDate).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) :
    'Data Desconhecida';

  const summary = content ? content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 'Sem resumo.';

  const redirectToPath = isAuthenticated ? `/community/${id}` : '/login';

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
        backgroundColor: COLORS_APP.white,
        border: `1px solid ${COLORS_APP.border.light}`,
      }}
      {...rest}
    >
      {imageUrl && (
        <Box
          sx={{
            height: '180px',
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}
        >
          {/* --- AQUI: Botões de Admin (Editar e Deletar) --- */}
          {isAdm && (
            <Box sx={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', gap: '4px', zIndex: 1 }}>
              <IconButton
                size="small"
                onClick={onEditClick}
                sx={{
                  backgroundColor: COLORS_APP.background.dark,
                  color: COLORS_APP.white,
                  '&:hover': { backgroundColor: COLORS_APP.text.primary },
                  padding: '6px',
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={onDeleteClick} 
                sx={{
                  backgroundColor: COLORS_APP.background.dark,
                  color: COLORS_APP.white,
                  '&:hover': { backgroundColor: COLORS_APP.status.error },
                  padding: '6px',
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
          {/* --- FIM DOS BOTÕES DE ADMIN --- */}
        </Box>
      )}

      <Box sx={{ padding: '16px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: COLORS_APP.text.secondary_light }}>
          <PersonOutlineIcon sx={{ fontSize: '0.9rem', mr: 0.5 }} />
          <Typography variant="caption" sx={{ fontSize: '0.8rem' }}>
            {author || 'Autor Desconhecido'} • {formattedDate}
          </Typography>
        </Box>

        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 'bold',
            color: COLORS_APP.text.primary,
            mb: 1.5,
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: COLORS_APP.text.secondary,
            mb: 2,
            flexGrow: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
          dangerouslySetInnerHTML={{ __html: summary }}
        />

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto', color: COLORS_APP.text.secondary_light }}>
          <ThumbUpOutlinedIcon sx={{ mr: 0.5 }} />
          <Typography variant="caption" sx={{ fontSize: '0.8rem', mr: 2 }}>
            {votes} {COMMUNITY_PAGE_CONTENT.votes_label}
          </Typography>
          <CommentOutlinedIcon sx={{ mr: 0.5 }} />
          <Typography variant="caption" sx={{ fontSize: '0.8rem' }}>
            {commentsCount} {COMMUNITY_PAGE_CONTENT.comments_label}
          </Typography>
          {postType && (
            <Typography variant="caption" sx={{
              ml: 'auto',
              backgroundColor: COLORS_APP.brand_colors.stemine_pink_light,
              color: COLORS_APP.brand_colors.stemine_pink,
              borderRadius: '4px',
              padding: '2px 8px',
              fontWeight: 'bold'
            }}>
              {postType === 'ARTICLE' ? 'Artigo' : 'Evento'}
            </Typography>
          )}
        </Box>
      </Box>

      {/*Botão visível de "Ler Mais"*/}
      <Button
        component={Link}
        to={redirectToPath}
        variant="contained"
        sx={{
          backgroundColor: COLORS_APP.brand_colors.stemine_purple,
          color: COLORS_APP.white,
          textTransform: 'none',
          padding: '10px 20px',
          fontWeight: 'bold',
          borderRadius: '0 0 12px 12px',
          '&:hover': {
            backgroundColor: COLORS_APP.brand_colors.stemine_purple_dark,
          },
        }}
      >
        {COMMUNITY_PAGE_CONTENT.read_more_button}
      </Button>
    </Paper>
  );
};

export default CommunityPostCard;