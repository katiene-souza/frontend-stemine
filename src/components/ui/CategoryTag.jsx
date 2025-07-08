import { Box, Typography } from "@mui/material";
import { colors } from "../../constants/Colors";

const CategoryTag = ({ text, color }) => (
  <Box sx={{ display: 'flex', alignItems: 'center',  marginRight: '8px' }}>
    <Box
      sx={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: color || colors.brand_colors.stemine_purple, 
        marginRight: '4px',
      }}
    />
    <Typography variant="caption" sx={{ color: colors.text.secondary, fontSize: '0.75rem', lineHeight: 1}}>
      {text}
    </Typography>
  </Box>
);

export default CategoryTag