import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  Container,
  Grid,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CommunityService from "../services/community";
import { COLORS_APP } from "../constants/Colors";
import {
  COMMUNITY_PAGE_CONTENT,
  VALIDATION_ERROR_MESSAGES,
  FEEDBACK_MESSAGES,
} from "../constants/Messages";


import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CommunityPostCard from "../components/ui/CommunityPostCard"; 
import ConfirmationDialog from "../components/ui/ConfirmationDialog"; 

const validateArticleForm = (formData) => {
  let errors = {};
  let isValid = true;

  if (!formData.title.trim()) {
    errors.title = "O título é obrigatório.";
    isValid = false;
  }
  if (!formData.author.trim()) {
    errors.author = "O autor é obrigatório.";
    isValid = false;
  }

  const plainTextContent = formData.content.replace(/<[^>]*>/g, "").trim();
  if (!plainTextContent) {
    errors.content = "O conteúdo é obrigatório.";
    isValid = false;
  } else if (plainTextContent.length < 50) {
    errors.content =
      VALIDATION_ERROR_MESSAGES.community_form.content_min_length;
    isValid = false;
  }

  if (!formData.postedDate) {
    errors.postedDate = "A data de publicação é obrigatória.";
    isValid = false;
  }

  const urlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif|svg|webp)$/i;
  if (formData.imageUrl && !urlRegex.test(formData.imageUrl)) {
    errors.imageUrl = "URL da imagem inválida.";
    isValid = false;
  }

  return { errors, isValid };
};

const AdminCommunityManagementPage = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
   
    id: null,
    title: "",
    postType: "ARTICLE",
    content: "",
    author: "",
    imageUrl: "",
    postedDate: "",
  });
  const [posts, setPosts] = useState([]); 
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState({ text: "", type: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); 
  const [postToDelete, setPostToDelete] = useState(null); 

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/unauthorized");
    } else {
      fetchPosts(); 
    }
  }, [isAdmin, navigate]);

  const fetchPosts = async () => {
    setLoading(true);
    setApiMessage({ text: "", type: "" });
    try {
      const response = await CommunityService.getAllPosts();
      const articles = response.data.filter(
        (post) => post.postType === "ARTICLE"
      );
      setPosts(articles);
    } catch (error) {
      console.error("Erro ao carregar postagens:", error);
      setApiMessage({
        text: "Erro ao carregar postagens. Tente novamente.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData((prevData) => ({ ...prevData, content: data }));
    if (errors.content) {
      setErrors((prevErrors) => ({ ...prevErrors, content: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors: newErrors, isValid } = validateArticleForm(formData);
    setErrors(newErrors);

    if (!isValid) {
      setApiMessage({
        text: "Por favor, preencha todos os campos obrigatórios corretamente.",
        type: "error",
      });
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    setApiMessage({ text: "", type: "" });
    try {
      let response;
      const dataToSend = {
        ...formData,
        postType: "ARTICLE",
        eventDate: null,
        eventTime: null,
        eventLocation: null,
        eventLink: null,
        id:
          formData.id && typeof formData.id === "string"
            ? parseInt(formData.id)
            : formData.id, 
      };

      if (formData.id) {
        response = await CommunityService.updatePost(formData.id, dataToSend);
        setApiMessage({
          text: FEEDBACK_MESSAGES.successful_post_edition,
          type: "success",
        });
      } else {
        response = await CommunityService.createPost(dataToSend);
        setApiMessage({
          text: FEEDBACK_MESSAGES.successful_post_creation,
          type: "success",
        });
      }
      setLoading(false);
      setSnackbarOpen(true);
      fetchPosts();
      setFormData({
        id: null,
        title: "",
        postType: "ARTICLE",
        content: "",
        author: "",
        imageUrl: "",
        postedDate: "",
        eventDate: null,
        eventTime: null,
        eventLocation: null,
        eventLink: null,
      });
      setErrors({});
    } catch (error) {
      console.error("Erro ao salvar postagem:", error);
      const errorMessage =
        error.response?.data?.message || FEEDBACK_MESSAGES.error_saving_post;
      setApiMessage({ text: errorMessage, type: "error" });
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleEditPost = (postToEdit) => {
    setFormData({
  
      id: postToEdit.id,
      title: postToEdit.title,
      postType: postToEdit.postType,
      content: postToEdit.content,
      author: postToEdit.author,
      imageUrl: postToEdit.imageUrl,
      postedDate: postToEdit.postedDate
        ? postToEdit.postedDate.split("T")[0]
        : "", 
    
      eventDate: null,
      eventTime: null,
      eventLocation: null,
      eventLink: null,
    });
    setErrors({}); 
    setApiMessage({
      text: "Editando postagem. Preencha e salve as alterações.",
      type: "info",
    });
    setSnackbarOpen(true);
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeletePostTrigger = (postId, postTitle) => {
    setPostToDelete({ id: postId, title: postTitle });
    setConfirmDialogOpen(true);
  };

  const handleConfirmDeletePost = async () => {
    if (postToDelete) {
      setLoading(true);
      setApiMessage({ text: "", type: "" });
      try {
        await CommunityService.deletePost(postToDelete.id); 
        setApiMessage({
          text: FEEDBACK_MESSAGES.successful_post_deletion,
          type: "success",
        });
        setSnackbarOpen(true);
        fetchPosts(); 
        setPostToDelete(null);
      } catch (error) {
        console.error("Erro ao excluir postagem:", error);
        const errorMessage =
          error.response?.data?.message ||
          FEEDBACK_MESSAGES.error_post_deletion;
        setApiMessage({ text: errorMessage, type: "error" });
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    }
    setConfirmDialogOpen(false);
  };

  const handleCancelDeletePost = () => {
    setPostToDelete(null);
    setConfirmDialogOpen(false);
  };


  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };


  if (!isAdmin()) {
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Acesso Negado. Apenas administradores podem gerenciar a comunidade.
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, sm: 4 } }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", color: COLORS_APP.text.primary, mb: 4 }}
      >
        {COMMUNITY_PAGE_CONTENT.admin_manage_title}
      </Typography>
      {apiMessage.text && (
        <Alert severity={apiMessage.type} sx={{ mb: 3 }}>
          {apiMessage.text}
        </Alert>
      )}
      
      <Box
        sx={{
          mb: 6,
          p: 3,
          border: `1px solid ${COLORS_APP.border.light}`,
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontWeight: "bold", color: COLORS_APP.text.primary, mb: 3 }}
        >
          {formData.id ? "Editar Artigo" : "Criar Novo Artigo"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Título do Artigo"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
            sx={{ mb: 2 }}
          />
          <TextField
            name="author"
            label="Autor do Artigo"
            fullWidth
            value={formData.author}
            onChange={handleChange}
            error={!!errors.author}
            helperText={errors.author}
            sx={{ mb: 2 }}
          />
          <TextField
            name="imageUrl"
            label="URL da Imagem Principal (Opcional)"
            fullWidth
            value={formData.imageUrl}
            onChange={handleChange}
            error={!!errors.imageUrl}
            helperText={errors.imageUrl}
            sx={{ mb: 2 }}
          />
          <TextField
            name="postedDate"
            label="Data de Publicação"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.postedDate}
            onChange={handleChange}
            error={!!errors.postedDate}
            helperText={errors.postedDate}
            sx={{ mb: 2 }}
          />

          
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", mb: 1, color: COLORS_APP.text.primary }}
          >
            Conteúdo do Artigo
          </Typography>
          <Box sx={{ mb: errors.content ? 1 : 2 }}>
            <CKEditor
              editor={ClassicEditor}
              data={formData.content}
              onChange={handleEditorChange}
              config={{
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "link",
                  "bulletedList",
                  "numberedList",
                  "blockQuote",
                  "|",
                  "undo",
                  "redo",
                  "imageUpload",
                ], 
              }}
            />
          </Box>
          {errors.content && (
            <Typography
              variant="caption"
              color="error"
              sx={{ mt: 0, mb: 2, display: "block" }}
            >
              {errors.content}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mt: 4, py: 1.5 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : formData.id ? (
              "Salvar Alterações"
            ) : (
              "Criar Artigo"
            )}
          </Button>
        </form>
      </Box>
      <Divider sx={{ my: 4 }} /> 
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ fontWeight: "bold", color: COLORS_APP.text.primary, mb: 3 }}
      >
        Artigos Existentes
      </Typography>
      {loading &&
        !apiMessage.text && ( 
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        )}
      {!loading &&
        !apiMessage.text &&
        posts.length === 0 && ( 
          <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Nenhum artigo encontrado.
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
        {posts.map((post) => (
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
            key={post.id}
          >
            <CommunityPostCard
              post={post}
              isAdm={true}
              onEditClick={() => handleEditPost(post)}
              onDeleteClick={() => handleDeletePostTrigger(post.id, post.title)}
            />
          </Box>
        ))}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={apiMessage.type}
          sx={{ width: "100%" }}
        >
          {apiMessage.text}
        </Alert>
      </Snackbar>
      
      <ConfirmationDialog
        open={confirmDialogOpen}
        onClose={handleCancelDeletePost}
        onConfirm={handleConfirmDeletePost}
        title={`Excluir "${postToDelete?.title || "Postagem"}"?`}
        message={
          `Tem certeza que deseja excluir a postagem "${
            postToDelete?.title || "esta postagem"
          }"? ` + FEEDBACK_MESSAGES.delete_confirmation
        }
        confirmText="Excluir"
        confirmColor="error"
      />
    </Container>
  );
};

export default AdminCommunityManagementPage;
