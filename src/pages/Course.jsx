import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem, 
  Button
} from "@mui/material";

import { colors } from "../constants/Colors";
import { register_course } from "../constants/Messages";
import { options } from "../utils/OptionsInformationJson";

import CourseCard from "../components/ui/CourseCard";
import CourseFormModal from "../components/CourseFormModal";


const exampleCourses = [
  {
    id: 1,
    imageUrl:
      "https://storage.googleapis.com/star-lab/blog/OGs/react.png",
    level: "Intermediário",
    categories: ["Tecnologia", "Matemática"],
    title: "Desenvolvimento Front-end com React",
    description:
      "Acesse os melhores cursos com certificado para se especializar e se destacar nas áreas STEM. Este curso abrange desde os fundamentos até tópicos avançados de React.",
    duration: "8 semanas",
    companyLogoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1024px-Microsoft_logo.svg.png",
  },
  {
    id: 2,
    imageUrl:
      "https://via.placeholder.com/300x160/F0F0F0/000000?text=Curso+Liderança+2",
    level: "Básico",
    categories: ["Liderança", "Carreira"], 
    title: "Liderança Feminina",
    description:
      "Conectamos você com mentoras profissionais e experientes que fornecem orientação personalizada para acelerar sua carreira em liderança.",
    duration: "8 semanas",
    companyLogoUrl: "https://via.placeholder.com/80x30?text=LOGO+EMPRESA+B",
  },
  {
    id: 3,
    imageUrl:
      "https://via.placeholder.com/300x160/F0F0F0/000000?text=Curso+Engenharia+3",
    level: "Avançado",
    categories: ["Engenharia", "Ciência"],
    title: "Engenharia de Software", 
    description:
      "Acesse os melhores cursos com certificado para se especializar e se destacar nas áreas STEM. Este curso aprofunda em tópicos de engenharia de software.",
    duration: "8 semanas",
    companyLogoUrl: "https://via.placeholder.com/80x30?text=LOGO+EMPRESA+C",
  },
  {
    id: 4,
    imageUrl:
      "https://via.placeholder.com/300x160/F0F0F0/000000?text=Curso+Dados+4",
    level: "Intermediário",
    categories: ["Dados", "Matemática"],
    title: "Introdução à Ciência de Dados",
    description:
      "Explore o mundo dos dados, desde a coleta e limpeza até a análise e visualização de dados complexos.",
    duration: "10 semanas",
    companyLogoUrl: "https://via.placeholder.com/80x30?text=LOGO+EMPRESA+D",
  },
];

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState(options.level[0].label);
  const [categoryFilter, setCategoryFilter] = useState(
    options.category[0].label
  );

  const [isAdminUser, setIsAdminUser] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [editingCourseData, setEditingCourseData] = useState(null);

  const filteredCourses = exampleCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel =
      levelFilter === options.level[0].label || course.level === levelFilter;
    const matchesCategory =
      categoryFilter === options.category[0].label ||
      course.categories.includes(categoryFilter);
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const handleSubscribe = (courseTitle) => {
    alert(`Inscrito no curso: ${courseTitle}`);
  };

  const handleEditCourse = (courseId) => {
    const courseToEdit = exampleCourses.find((c) => c.id === courseId);
    setEditingCourseData(courseToEdit);
    setIsModalOpen(true);
  };

  const handleDeleteCourse = (courseId, courseTitle) => {
    if (
      window.confirm(`Tem certeza que deseja excluir o curso "${courseTitle}"?`)
    ) {
      alert(`Excluindo curso com ID: ${courseId}`);
    }
  };

  const handleOpenModal = () => {
    setEditingCourseData(null); 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCourseData(null);
  };

  const handleSubmitCourse = (formData) => {
    console.log("Dados do curso a serem enviados para o backend:", formData);
    alert(
      `Curso ${
        editingCourseData ? "atualizado" : "cadastrado"
      } com sucesso! (Dados no console)`
    );
    handleCloseModal(); 
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
          sx={{ color: colors.text.primary, fontWeight: "bold" }}
        >
          {register_course.title}
        </Typography>
        {isAdminUser && (
          <Button
            variant="contained"
            onClick={handleOpenModal}
            sx={{
              backgroundColor: colors.brand_colors.stemine_purple,
              color: colors.white,
              textTransform: "none",
              borderRadius: '50px',
              padding: { xs: "8px 16px", md: "10px 20px" },
              fontSize: { xs: "0.85rem", md: "0.95rem" },
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: colors.brand_colors.stemine_purple_dark,
              },
            }}
          >
            {register_course.is_adm_text_button}
          </Button>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 3 },
          mb: { xs: 4, md: 5 },
        }}
      >
        <TextField
          label={register_course.search}
          variant="outlined"
          fullWidth={!["sm", "md", "lg"].includes("sm")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            flex: { sm: 1 },
            minWidth: { sm: "200px" },
          }}
        />

        <TextField
          select
          label="Nível"
          variant="outlined"
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          sx={{
            width: { xs: "100%", sm: "auto" },
            minWidth: { sm: "150px" },
          }}
        >
          {options.level.map((option) => (
            <MenuItem key={option.id} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Categoria"
          variant="outlined"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          sx={{
            width: { xs: "100%", sm: "auto" },
            minWidth: { sm: "180px" },
          }}
        >
          {options.category.map((option) => (
            <MenuItem key={option.id} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <Typography
        variant="body1"
        sx={{ color: colors.text.secondary, mb: { xs: 3, md: 4 } }}
      >
        {filteredCourses.length} {register_course.courses_found}
      </Typography>

    <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }, 
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          gap: { xs: '24px', sm: '32px' },
        
        }}
      >
        {filteredCourses.map((course) => (
          <Box
            key={course.id}
            sx={{
              flex: {
                xs: '1 1 100%',
                sm: '1 1 calc(50% - 16px)',
                md: '1 1 calc(33.33% - 21.33px)',
              },
              maxWidth: {
                xs: '100%',
                sm: 'calc(50% - 16px)',
                md: 'calc(33.33% - 21.33px)',
              },
              boxSizing: 'border-box',
            }}
          >
            <CourseCard
              imageUrl={course.imageUrl}
              level={course.level}
              categories={course.categories}
              title={course.title}
              description={course.description}
              duration={course.duration}
              companyLogoUrl={course.companyLogoUrl}
              onSubscribeClick={() => handleSubscribe(course.title)}
              isAdm={isAdminUser}
              onEditClick={() => handleEditCourse(course.id)}
              onDeleteClick={() => handleDeleteCourse(course.id, course.title)}
            />
          </Box>
        ))}
        {filteredCourses.length === 0 && (
          <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Nenhum curso encontrado com os filtros selecionados.
            </Typography>
          </Box>
        )}
      </Box>
      <CourseFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitCourse}
        initialData={editingCourseData}
      />
    </Container>
  );
};

export default CoursesPage;
 