import { Box, Typography, Paper, IconButton, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { COLORS_APP } from "../../constants/Colors";
import CategoryTag from "./CategoryTag";
import { COURSE_PAGE_CONTENT } from "../../constants/Messages";

const CourseCard = ({
  course,
  onSubscribeClick,
  isAdm = false,
  onEditClick,
  onDeleteClick,
  ...rest
}) => {
  const {
    imageUrl,
    level,
    categories = [],
    title,
    description,
    durationValue,
    durationUnit,
    companyLogoUrl,
  } = course;

  const duration = `${durationValue} ${durationUnit}`;

  const getLevelColor = (levelText) => {
    switch (levelText?.toLowerCase()) {
      case "básico":
        return COLORS_APP.status.success;
      case "intermediário":
        return COLORS_APP.brand_colors.stemine_purple;
      case "avançado":
        return COLORS_APP.brand_colors.stemine_pink;
      default:
        return COLORS_APP.text.secondary;
    }
  };

  const levelColor = getLevelColor(level);

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        backgroundColor: COLORS_APP.white,
        border: `1px solid ${COLORS_APP.border.light}`,
      }}
      {...rest}
    >
      
      <Box
        sx={{
          height: "160px",
          backgroundColor: COLORS_APP.background.medium,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {!imageUrl && (
          <img
            src="data:image/svg+xml;utf8,<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path fill='%23666' d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 19V5h14l-1.5 3-2.5-3.5L11 13.5z'/></svg>"
            alt="Placeholder"
            style={{ width: "40px", height: "40px", opacity: 0.5 }}
          />
        )}

        {/* Botões de Admin (Editar e Deletar) */}
        {isAdm && (
          <Box
            sx={{
              position: "absolute",
              top: "8px",
              left: "8px",
              display: "flex",
              gap: "4px",
            }}
          >
            <IconButton
              size="small"
              onClick={onEditClick}
              sx={{
                backgroundColor: COLORS_APP.background.dark,
                color: COLORS_APP.white,
                "&:hover": {
                  backgroundColor: COLORS_APP.text.primary,
                },
                padding: "6px",
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
                "&:hover": {
                  backgroundColor: COLORS_APP.status.error,
                },
                padding: "6px",
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        {/* Tag de Nível */}
        {level && (
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: "12px",
              right: "12px",
              backgroundColor: levelColor,
              color: COLORS_APP.white,
              borderRadius: "50px",
              padding: "6px 8px",
              fontWeight: "bold",
              textTransform: "uppercase",
              fontSize: "0.75rem",
              lineHeight: 1,
            }}
          >
            {level}
          </Typography>
        )}
      </Box>

      {/* Conteúdo do Card (Texto) */}
      <Box
        sx={{
          padding: "16px",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Categorias */}
        <Box sx={{ display: "flex", flexWrap: "wrap", marginBottom: "10px" }}>
          {categories.map((cat, index) => (
            <CategoryTag
              key={index}
              text={cat}
              color={COLORS_APP.brand_colors.stemine_purple}
            />
          ))}
        </Box>

        {/* Título do Curso */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: "bold",
            color: COLORS_APP.text.primary,
            marginBottom: "8px",
            lineHeight: 1.3,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>

        {/* Descrição do Curso */}
        <Typography
          variant="body2"
          sx={{
            color: COLORS_APP.text.secondary,
            marginBottom: "12px",
            lineHeight: 1.4,
            flexGrow: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </Typography>

        {/* Duração */}
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
        >
          <Typography
            variant="caption"
            sx={{ color: COLORS_APP.text.secondary, marginRight: "4px" }}
          >
            Duração:
          </Typography>
          <Typography
            variant="body2"
            sx={{
              backgroundColor: COLORS_APP.brand_colors.stemine_purple_light,
              color: COLORS_APP.brand_colors.stemine_purple,
              borderRadius: "50px",
              padding: "2px 8px",
              fontWeight: "bold",
              fontSize: "0.8rem",
            }}
          >
            {duration}
          </Typography>
        </Box>

        {/* Logo da Empresa e Botão Inscrever-se */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto",
          }}
        >
          {companyLogoUrl ? (
            <Box
              component="img"
              src={companyLogoUrl}
              alt="Logo Empresa"
              sx={{ height: "30px", maxWidth: "80px", objectFit: "contain" }}
            />
          ) : (
            <Typography
              variant="caption"
              sx={{ color: COLORS_APP.text.secondary }}
            >
              LOGO EMPRESA
            </Typography>
          )}

          <Button
            variant="contained"
            onClick={onSubscribeClick}
            disabled={isAdm === true}
            sx={{
              backgroundColor: COLORS_APP.brand_colors.stemine_purple,
              color: COLORS_APP.white,
              textTransform: "none",
              padding: "8px 16px",
              borderRadius: "50px",
              fontSize: "0.85rem",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: COLORS_APP.brand_colors.stemine_purple_dark,
              },
            }}
          >
            { COURSE_PAGE_CONTENT.enroll_button}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CourseCard;
