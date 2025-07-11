import { Box, Typography, Paper } from "@mui/material";
import { COLORS_APP } from "../../constants/Colors";

const InfoCard = ({ icon: IconComponent, title, text, ...rest }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: "12px",
        padding: { xs: "20px", sm: "30px" },
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
        backgroundColor: COLORS_APP.white,
        border: `1px solid ${COLORS_APP.border.light}`,
      }}
      {...rest}
    >
      <Box
        sx={{
          backgroundColor: COLORS_APP.brand_colors.stemine_purple_light,
          borderRadius: "50%",
          width: { xs: "60px", sm: "70px" },
          height: { xs: "60px", sm: "70px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          flexShrink: 0,
          "& .MuiSvgIcon-root": {
            color: COLORS_APP.brand_colors.stemine_purple,
            fontSize: { xs: "32px", sm: "38px" },
          },
        }}
      >
        {IconComponent && <IconComponent />}
      </Box>

      <Typography
        variant="h5"
        component="h3"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: COLORS_APP.text.primary,
          marginBottom: "15px",
          fontSize: { xs: "1.4rem", sm: "1.6rem" },
          lineHeight: 1.2,
          flexShrink: 0,
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: COLORS_APP.text.secondary,
          fontSize: { xs: "0.9rem", sm: "1rem" },
          lineHeight: 1.5,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 4,
          WebkitBoxOrient: "vertical",
          flexGrow: 1,
        }}
      >
        {text}
      </Typography>
    </Paper>
  );
};

export default InfoCard;
