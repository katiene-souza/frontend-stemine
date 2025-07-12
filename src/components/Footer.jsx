import { Box, Typography, Link, Stack, Divider } from "@mui/material";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { Link as RouterLink } from "react-router-dom";

import { COLORS_APP } from "../constants/Colors";
import { APP_NAVIGATION_CONTENT } from "../constants/Messages";

import { nav_items } from "../utils/NavItems";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: COLORS_APP.background.dark,
        color: COLORS_APP.white,
        padding: { xs: "30px 20px", md: "50px 80px" },
        marginTop: "auto",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 4, md: 8 }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "flex-start" }}
        sx={{ margin: "0 auto", marginBottom: "40px" }}
      >
        <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "250px" } }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: COLORS_APP.white, fontWeight: "bold" }}
          >
            <img src="src/assets/logo-stemine.png" width="160px" />
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: COLORS_APP.text.secondary_light }}
          >
            {APP_NAVIGATION_CONTENT.footer.description}
          </Typography>
        </Box>

        <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "150px" } }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: COLORS_APP.white, fontWeight: "bold" }}
          >
            {APP_NAVIGATION_CONTENT.footer.links}
          </Typography>
          <Stack spacing={1}>
            {nav_items.map((item) => (
              <Link
                key={item.text}
                component={RouterLink}
                to={item.path}
                underline="none"
                sx={{
                  color: COLORS_APP.text.secondary_light,
                  "&:hover": {
                    color: COLORS_APP.brand_colors.stemine_pink,
                    textDecoration: "underline",
                  },
                }}
              >
                <Typography variant="body2">{item.text}</Typography>
              </Link>
            ))}
          </Stack>
        </Box>

        <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "200px" } }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: COLORS_APP.white, fontWeight: "bold" }}
          >
            {APP_NAVIGATION_CONTENT.footer.contact.title}
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailIcon
                sx={{
                  color: COLORS_APP.text.secondary_light,
                  fontSize: "1.2rem",
                }}
              />
              <Link
                href={`mailto:${APP_NAVIGATION_CONTENT.footer.contact.email}`}
                underline="none"
                sx={{
                  color: COLORS_APP.text.secondary_light,
                  "&:hover": {
                    color: COLORS_APP.brand_colors.stemine_pink,
                    textDecoration: "underline",
                  },
                }}
              >
                <Typography variant="body2">
                  {APP_NAVIGATION_CONTENT.footer.contact.email}
                </Typography>
              </Link>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon
                sx={{
                  color: COLORS_APP.text.secondary_light,
                  fontSize: "1.2rem",
                }}
              />
              <Link
                href={`tel:${APP_NAVIGATION_CONTENT.footer.contact.phone.replace(
                  /\D/g,
                  ""
                )}`}
                underline="none"
                sx={{
                  color: COLORS_APP.text.secondary_light,
                  "&:hover": {
                    color: COLORS_APP.brand_colors.stemine_pink,
                    textDecoration: "underline",
                  },
                }}
              >
                <Typography variant="body2">
                  {APP_NAVIGATION_CONTENT.footer.contact.phone}
                </Typography>
              </Link>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnIcon
                sx={{
                  color: COLORS_APP.text.secondary_light,
                  fontSize: "1.2rem",
                }}
              />
              <Typography
                variant="body2"
                sx={{ color: COLORS_APP.text.secondary_light }}
              >
                {APP_NAVIGATION_CONTENT.footer.contact.location}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>

      <Divider
        sx={{
          borderColor: COLORS_APP.white,
          opacity: 0.5,
          marginBottom: "20px",
        }}
      />

      <Typography
        variant="body2"
        align="center"
        sx={{ color: COLORS_APP.text.secondary_light }}
      >
        {APP_NAVIGATION_CONTENT.footer.rights_reserved}
      </Typography>
    </Box>
  );
};

export default Footer;
