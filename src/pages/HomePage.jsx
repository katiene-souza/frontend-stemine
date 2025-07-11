import { Box, Typography, Container, Button } from "@mui/material";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

import { COLORS_APP } from "../constants/Colors";
import { LANDING_PAGE_CONTENT } from "../constants/Messages";

import InfoCard from "../components/ui/InfoCard";
import { useAuth } from "../contexts/AuthContext";

import { Link } from "react-router-dom";

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(public/assets/woman_in_stem.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: { xs: "300px", md: "auto" },
            order: { xs: 2, md: 1 },
          }}
        />

        <Box
          sx={{
            flex: 1,
            backgroundColor: COLORS_APP.brand_colors.stemine_purple,
            color: COLORS_APP.white,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
            padding: { xs: "40px 20px", md: "60px 80px" },
            order: { xs: 1, md: 2 },
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              marginBottom: { xs: "15px", md: "20px" },
              fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem" },
              lineHeight: 1.2,
            }}
          >
            {LANDING_PAGE_CONTENT.hero.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginBottom: { xs: "30px", md: "40px" },
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
              maxWidth: "600px",
            }}
          >
            {LANDING_PAGE_CONTENT.hero.text_title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 3 },
            }}
          >
            <Button
              component={Link}
              to="/courses"
              variant="outlined"
              color={COLORS_APP.white}
              sx={{
                borderColor: COLORS_APP.white,
                borderRadius: "50px",
                color: COLORS_APP.white,
                "&:hover": {
                  backgroundColor: COLORS_APP.background.dark_light,
                  borderColor: COLORS_APP.white,
                },
                padding: { xs: "12px 25px", md: "15px 30px" },
                fontSize: { xs: "0.9rem", md: "1rem" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              {LANDING_PAGE_CONTENT.action_buttons.see_courses}
            </Button>

            <Button
              component={Link}
              to="/mentoring"
              variant="contained"
              sx={{
                padding: { xs: "12px 25px", md: "15px 30px" },
                fontSize: { xs: "0.9rem", md: "1rem" },
                width: { xs: "100%", sm: "auto" },
                borderRadius: "50px",
              }}
            >
              {LANDING_PAGE_CONTENT.action_buttons.find_mentor}
            </Button>
          </Box>
        </Box>
      </Box>

      <Container
        maxWidth="false"
        sx={{
          py: { xs: 6, md: 8 },
          px: { xs: 6, md: 8 },
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            color: COLORS_APP.text.primary,
            mb: { xs: 4, md: 6 },
            fontWeight: "bold",
          }}
        >
          {LANDING_PAGE_CONTENT.sections.stemine_title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "stretch",
            gap: { xs: "24px", sm: "30px" },
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 16px)",
                md: "1 1 calc(25% - 24px)",
              },
              maxWidth: {
                xs: "100%",
                sm: "calc(50% - 16px)",
                md: "calc(25% - 24px)",
              },
              boxSizing: "border-box",
            }}
          >
            <InfoCard
              icon={DescriptionOutlinedIcon}
              title={LANDING_PAGE_CONTENT.sections.learning.title}
              text={LANDING_PAGE_CONTENT.sections.learning.description}
            />
          </Box>

          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 16px)",
                md: "1 1 calc(25% - 24px)",
              },
              maxWidth: {
                xs: "100%",
                sm: "calc(50% - 16px)",
                md: "calc(25% - 24px)",
              },
              boxSizing: "border-box",
            }}
          >
            <InfoCard
              icon={GroupsOutlinedIcon}
              title={LANDING_PAGE_CONTENT.sections.mentoring.title}
              text={LANDING_PAGE_CONTENT.sections.mentoring.description}
            />
          </Box>

          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 16px)",
                md: "1 1 calc(25% - 24px)",
              },
              maxWidth: {
                xs: "100%",
                sm: "calc(50% - 16px)",
                md: "calc(25% - 24px)",
              },
              boxSizing: "border-box",
            }}
          >
            <InfoCard
              icon={BusinessOutlinedIcon}
              title={LANDING_PAGE_CONTENT.sections.working.title}
              text={LANDING_PAGE_CONTENT.sections.working.description}
            />
          </Box>

          <Box
            sx={{
              flex: {
                xs: "1 1 100%",
                sm: "1 1 calc(50% - 16px)",
                md: "1 1 calc(25% - 24px)",
              },
              maxWidth: {
                xs: "100%",
                sm: "calc(50% - 16px)",
                md: "calc(25% - 24px)",
              },
              boxSizing: "border-box",
            }}
          >
            <InfoCard
              icon={PersonAddAltOutlinedIcon}
              title={LANDING_PAGE_CONTENT.sections.community.title}
              text={LANDING_PAGE_CONTENT.sections.community.description}
            />
          </Box>
        </Box>
      </Container>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          backgroundColor: COLORS_APP.background.light,
          padding: { xs: "40px 20px", md: "60px 80px" },
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(public/assets/woman_in_stem_two.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: { xs: "250px", md: "400px" },
            marginRight: { xs: 0, md: "40px" },
            marginBottom: { xs: "30px", md: 0 },
            borderRadius: "8px",
            order: { xs: 2, md: 1 },
          }}
        />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: { xs: "center", md: "flex-start" },
            textAlign: { xs: "center", md: "left" },
            order: { xs: 1, md: 2 },
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: COLORS_APP.text.primary,
              marginBottom: { xs: "15px", md: "20px" },
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
              lineHeight: 1.2,
              maxWidth: { xs: "100%", md: "500px" },
            }}
          >
            {LANDING_PAGE_CONTENT.about_us.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: COLORS_APP.text.secondary,
              fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
              lineHeight: 1.6,
              maxWidth: { xs: "100%", md: "600px" },
            }}
          >
            {LANDING_PAGE_CONTENT.about_us.description}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: COLORS_APP.white,
          py: { xs: 6, md: 8 },
          px: { xs: 2, sm: 4, md: 8 },
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            color: COLORS_APP.text.primary,
            mb: { xs: 2, md: 3 },
            fontWeight: "bold",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
            lineHeight: 1.2,
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          {LANDING_PAGE_CONTENT.call_to_action.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: COLORS_APP.text.secondary,
            mb: { xs: 4, md: 5 },
            fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
            lineHeight: 1.6,
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {LANDING_PAGE_CONTENT.call_to_action.description}
        </Typography>
        <Button
          component={Link}
          to="/register"
          variant="contained"
          disabled={isAuthenticated}
          sx={{
            padding: { xs: "15px 40px", md: "18px 50px" },
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            borderRadius: "50px",
            fontWeight: "bold",
            boxShadow: COLORS_APP.background.box_shadow,
            "&:hover": {
              boxShadow: COLORS_APP.background.box_shadow_dark,
            },
          }}
        >
          {LANDING_PAGE_CONTENT.call_to_action.button}
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
