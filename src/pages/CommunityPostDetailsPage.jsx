import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Button,
  Divider,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import CommunityService from "../services/community";
import { COLORS_APP } from "../constants/Colors";
import { COMMUNITY_PAGE_CONTENT } from "../constants/Messages";

const CommunityPostDetailsPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiMessage, setApiMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      setApiMessage({ text: "", type: "" });
      try {
        const response = await CommunityService.getPostById(id);
        setPost(response.data);
      } catch (error) {
        console.error("Erro ao carregar detalhes da postagem:", error);
        setApiMessage({
          text: "Erro ao carregar detalhes da postagem. Tente novamente.",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPostDetails();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" color="text.secondary" mt={2}>
          Carregando postagem...
        </Typography>
      </Container>
    );
  }

  if (apiMessage.text && apiMessage.type === "error") {
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: "center" }}>
        <Alert severity="error">{apiMessage.text}</Alert>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Postagem não encontrada.
        </Typography>
      </Container>
    );
  }

  const formattedDate = post.postedDate
    ? new Date(post.postedDate).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Data Desconhecida";

  return (
    <Container
      maxWidth="md"
      sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, sm: 4 } }}
    >
      <Box sx={{ mb: 4 }}>
        {post.imageUrl && (
          <Box
            sx={{
              height: "300px",
              backgroundImage: `url(${post.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
              mb: 3,
            }}
          />
        )}
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold", color: COLORS_APP.text.primary }}
        >
          {post.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            color: COLORS_APP.text.secondary_light,
          }}
        >
          <PersonOutlineIcon sx={{ fontSize: "1rem", mr: 0.5 }} />
          <Typography variant="subtitle1" sx={{ fontSize: "0.9rem", mr: 2 }}>
            Por {post.author} em {formattedDate}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              backgroundColor: COLORS_APP.brand_colors.stemine_purple_light,
              color: COLORS_APP.brand_colors.stemine_purple,
              borderRadius: "4px",
              padding: "2px 8px",
              fontWeight: "bold",
            }}
          >
            {post.postType === "ARTICLE" ? "Artigo" : "Evento"}
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{ color: COLORS_APP.text.primary, lineHeight: 1.7 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 4,
          color: COLORS_APP.text.secondary,
        }}
      >
        <ThumbUpOutlinedIcon sx={{ mr: 1 }} />
        <Typography variant="body2" sx={{ mr: 2 }}>
          {post.votes} {COMMUNITY_PAGE_CONTENT.votes_label}
        </Typography>
        <CommentOutlinedIcon sx={{ mr: 1 }} />
        <Typography variant="body2">
          {post.commentsCount} {COMMUNITY_PAGE_CONTENT.comments_label}
        </Typography>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button
          component={Link}
          to="/community"
          variant="outlined"
          sx={{
            color: COLORS_APP.brand_colors.stemine_purple,
            borderColor: COLORS_APP.brand_colors.stemine_purple,
            borderRadius: "50px"
          }}
        >
          Voltar para Comunidade
        </Button>
      </Box>
    </Container>
  );
};

export default CommunityPostDetailsPage;
