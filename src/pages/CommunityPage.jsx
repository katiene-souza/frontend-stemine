import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import CommunityService from "../services/community";
import CommunityPostCard from "../components/ui/CommunityPostCard";
import { COLORS_APP } from "../constants/Colors";
import { COMMUNITY_PAGE_CONTENT } from "../constants/Messages";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState({ text: "", type: "" });
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

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
          sx={{ fontWeight: "bold", color: COLORS_APP.text.primary }}
        >
          Artigos da comunidade
        </Typography>

        {isAdmin() && (
          <Button
            variant="contained"
            onClick={() => navigate("/admin/community")}
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
            {COMMUNITY_PAGE_CONTENT.admin_add_post_button}
          </Button>
        )}
      </Box>

      {apiMessage.text && (
        <Alert severity={apiMessage.type} sx={{ mb: 3 }}>
          {apiMessage.text}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
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
              <CommunityPostCard post={post} />
            </Box>
          ))}
          {posts.length === 0 && (
            <Box sx={{ width: "100%", textAlign: "center", mt: 4 }}>
              <Typography variant="h6" color="text.secondary">
                {COMMUNITY_PAGE_CONTENT.no_posts_found}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default CommunityPage;
