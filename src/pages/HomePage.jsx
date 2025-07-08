import { Box, Typography, Container, Button } from "@mui/material";
import { colors } from "../constants/Colors";
import { landing_page } from "../constants/Messages";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

import InfoCard from "../components/ui/InfoCard";

const HomePage = () => {
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
            backgroundImage: `url(src/assets/woman_in_stem.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: { xs: "300px", md: "auto" },
            order: { xs: 2, md: 1 },
          }}
        />

        <Box
          sx={{
            flex: 1,
            backgroundColor: colors.brand_colors.stemine_purple,
            color: colors.white,
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
            {landing_page.title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginBottom: { xs: "30px", md: "40px" },
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
              maxWidth: "600px",
            }}
          >
            {landing_page.text_title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 3 },
            }}
          >
            <Button
              to="/courses"
              variant="outlined"
              color={colors.white}
              sx={{
                borderColor: colors.white,
                borderRadius: "50px",
                color: colors.white,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: colors.white,
                },
                padding: { xs: "12px 25px", md: "15px 30px" },
                fontSize: { xs: "0.9rem", md: "1rem" },
                width: { xs: "100%", sm: "auto" },
              }}
            >
              {landing_page.see_courses_button}
            </Button>

            <Button
              to="/mentorias"
              variant="contained"
              sx={{
                padding: { xs: "12px 25px", md: "15px 30px" },
                fontSize: { xs: "0.9rem", md: "1rem" },
                width: { xs: "100%", sm: "auto" },
                borderRadius: "50px",
              }}
            >
              {landing_page.find_mentor_button}
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
            color: colors.text.primary,
            mb: { xs: 4, md: 6 },
            fontWeight: "bold",
          }}
        >
          Como a STEMINE Funciona
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
              title={landing_page.operation.learning.title}
              text={landing_page.operation.learning.description}
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
              title={landing_page.operation.mentoring.title}
              text={landing_page.operation.mentoring.description}
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
              title={landing_page.operation.working.title}
              text={landing_page.operation.working.description}
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
              title={landing_page.operation.community.title}
              text={landing_page.operation.community.description}
            />
          </Box>
        </Box>
      </Container>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          backgroundColor: colors.background.light,
          padding: { xs: "40px 20px", md: "60px 80px" },
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(src/assets/woman_in_stem_two.png)`,
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
              color: colors.text.primary,
              marginBottom: { xs: "15px", md: "20px" },
              fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
              lineHeight: 1.2,
              maxWidth: { xs: "100%", md: "500px" },
            }}
          >
            {landing_page.explanation.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: colors.text.secondary,
              fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
              lineHeight: 1.6,
              maxWidth: { xs: "100%", md: "600px" },
            }}
          >
            {landing_page.explanation.description}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: colors.white,
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
            color: colors.text.primary,
            mb: { xs: 2, md: 3 },
            fontWeight: "bold",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
            lineHeight: 1.2,
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          {landing_page.call_to_action.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: colors.text.secondary,
            mb: { xs: 4, md: 5 },
            fontSize: { xs: "0.95rem", sm: "1rem", md: "1.05rem" },
            lineHeight: 1.6,
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {landing_page.call_to_action.description}
        </Typography>
        <Button
          to="/cadastro"
          variant="contained"
          sx={{
            padding: { xs: "15px 40px", md: "18px 50px" },
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            borderRadius: "50px",
            fontWeight: "bold",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          {landing_page.call_to_action.button}
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
