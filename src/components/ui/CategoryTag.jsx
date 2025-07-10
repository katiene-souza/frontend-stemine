import { Box, Typography } from "@mui/material";
import { COLORS_APP } from "../../constants/Colors";

const CategoryTag = ({ text, color }) => (
  <Box sx={{ display: "flex", alignItems: "center", marginRight: "8px" }}>
    <Box
      sx={{
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        backgroundColor: color || COLORS_APP.brand_colors.stemine_purple,
        marginRight: "4px",
      }}
    />
    <Typography
      variant="caption"
      sx={{
        color: COLORS_APP.text.secondary,
        fontSize: "0.75rem",
        lineHeight: 1,
      }}
    >
      {text}
    </Typography>
  </Box>
);

export default CategoryTag;
