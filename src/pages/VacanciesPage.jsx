// src/pages/VacanciesPage.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import VacancyCard from '../components/ui/VacancyCard';
import VacancyFormModal from '../components/ui/VacancyFormModal';
import { colors } from '../constants/Colors';
import { options } from '../utils/OptionsInformationJson';
import { vacancy as VacancyMessages, error_messages } from '../constants/Messages'
import { useAuth } from '../contexts/AuthContext';

// Dados mockados de vagas (substitua por dados reais do backend)
const initialMockVacancies = [
  {
    id: 'v001',
    title: 'Desenvolvedor(a) Front-end Pleno',
    company: 'TechSolutions Ltda.',
    description: 'Buscamos profissional experiente em React para atuar no desenvolvimento de interfaces de usuário.',
    requirements: 'Experiência com React, JavaScript/TypeScript, HTML/CSS, Git. Conhecimento em Material-UI é um diferencial.',
    benefits: 'Vale-refeição, Plano de saúde, Home Office flexível, Day off de aniversário.',
    location: 'Belo Horizonte, MG',
    type: 'CLT',
    level: 'Pleno',
    applicationLink: 'https://www.google.com/search?q=vaga+frontend+techsolutions',
    postedDate: '2025-06-30',
  },
  {
    id: 'v002',
    title: 'Cientista de Dados Júnior',
    company: 'Data Insights S.A.',
    description: 'Oportunidade para iniciar carreira em ciência de dados, auxiliando na análise e modelagem de grandes volumes de dados.',
    requirements: 'Conhecimento em Python, SQL, Estatística básica. Desejável experiência com Pandas/NumPy.',
    benefits: 'Bolsa de estudo para cursos, Vale-transporte, Convênio academia.',
    location: 'São Paulo, SP',
    type: 'Estágio',
    level: 'Júnior',
    applicationLink: 'https://www.google.com/search?q=vaga+data+insights+junior',
    postedDate: '2025-07-01',
  },
  {
    id: 'v003',
    title: 'Especialista em Cibersegurança',
    company: 'SecureNet Corp.',
    description: 'Procuramos especialista em segurança para proteger nossos sistemas e redes contra ameaças cibernéticas.',
    requirements: 'Experiência em pentests, análise de vulnerabilidades, SIEM. Certificações serão um diferencial.',
    benefits: 'Plano odontológico, Aulas de inglês, Participação nos lucros.',
    location: 'Remoto',
    type: 'CLT',
    level: 'Sênior',
    applicationLink: 'https://www.google.com/search?q=vaga+ciberseguranca+securenet',
    postedDate: '2025-07-05',
  },
];


const VacanciesPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const isAdminUser = isAuthenticated && user?.role === 'admin';

  // Redireciona se o usuário não estiver logado
  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, navigate]);


  const [vacancies, setVacancies] = useState(initialMockVacancies);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState(options.vacancyLocation[0].label);
  const [typeFilter, setTypeFilter] = useState(options.vacancyType[0].label);
  const [levelFilter, setLevelFilter] = useState(options.vacancyLevel[0].label);

  const [isFormModalOpen, setIsFormModalOpen] = useState(false); // Visibilidade da modal
  const [editingVacancyData, setEditingVacancyData] = useState(null); // Dados da vaga para edição

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Lógica de filtro para as vagas
  const filteredVacancies = vacancies.filter(vacancy => {
    const matchesSearch =
      vacancy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacancy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacancy.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === options.vacancyLocation[0].label || vacancy.location === locationFilter;
    const matchesType = typeFilter === options.vacancyType[0].label || vacancy.type === typeFilter;
    const matchesLevel = levelFilter === options.vacancyLevel[0].label || vacancy.level === levelFilter;

    return matchesSearch && matchesLocation && matchesType && matchesLevel;
  });


  // --- Funções de Ação ---

  const handleApply = (applicationLink, vacancyTitle) => {
    if (applicationLink) {
      window.open(applicationLink, '_blank');
      showSnackbar(`Redirecionando para candidatura: ${vacancyTitle}`, 'info');
    } else {
      showSnackbar(`Link de candidatura para '${vacancyTitle}' não disponível.`, 'warning');
    }
  };

  // --- Funções de Admin (Protegidas) ---

  const handleOpenFormModal = () => {
    if (!isAdminUser) { showSnackbar(error_messages.auth.permission_denied, 'error'); return; }
    setEditingVacancyData(null); // Para cadastro de nova vaga
    setIsFormModalOpen(true);
  };

  const handleEditVacancy = (vacancyId) => {
    if (!isAdminUser) { showSnackbar(error_messages.auth.permission_denied, 'error'); return; }
    const vacancyToEdit = vacancies.find(v => v.id === vacancyId);
    setEditingVacancyData(vacancyToEdit);
    setIsFormModalOpen(true);
  };

  const handleDeleteVacancy = (vacancyId, vacancyTitle) => {
    if (!isAdminUser) { showSnackbar(error_messages.auth.permission_denied, 'error'); return; }
    if (window.confirm(`Tem certeza que deseja excluir a vaga "${vacancyTitle}"?`)) {
      setVacancies(prevVacancies => prevVacancies.filter(v => v.id !== vacancyId));
      showSnackbar(`Vaga "${vacancyTitle}" excluída com sucesso!`, 'success');
    }
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setEditingVacancyData(null); // Limpa dados de edição ao fechar
  };

  const handleSubmitVacancyForm = (formData) => {
    if (!isAdminUser) { showSnackbar(error_messages.auth.permission_denied, 'error'); return; }

    if (editingVacancyData) {
      // Lógica de Edição
      setVacancies(prevVacancies => prevVacancies.map(v => v.id === formData.id ? formData : v));
      showSnackbar('Vaga atualizada com sucesso!', 'success');
    } else {
      // Lógica de Cadastro
      const newId = `v${Math.max(...vacancies.map(v => parseInt(v.id.substring(1)))) + 1}`; // Geração de ID simples
      setVacancies(prevVacancies => [...prevVacancies, { ...formData, id: newId }]);
      showSnackbar('Vaga cadastrada com sucesso!', 'success');
    }
    handleCloseFormModal();
  };

  // Se o usuário não estiver autenticado, pode renderizar um placeholder
  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Redirecionando para a página de login...
        </Typography>
        <Snackbar open={true} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
             <Alert severity="info" sx={{ width: '100%' }}>
                Você precisa estar logado para acessar esta página.
             </Alert>
        </Snackbar>
      </Container>
    );
  }


  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, sm: 4, md: 8 } }}>
      {/* Cabeçalho da Página de Vagas */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 4, md: 6 } }}>
        <Typography variant="h4" component="h1" sx={{ color: colors.text.primary, fontWeight: 'bold' }}>
          {VacancyMessages.title}
        </Typography>
        {isAdminUser && (
          <Button
            variant="contained"
            onClick={handleOpenFormModal}
            sx={{
              backgroundColor: colors.brand_colors.stemine_purple,
              color: colors.white,
              textTransform: 'none',
              borderRadius: '50px',
              padding: { xs: "8px 16px", md: "10px 20px" },
              fontSize: { xs: "0.85rem", md: "0.95rem" },
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: colors.brand_colors.stemine_purple_dark,
              },
            }}
          >
            {VacancyMessages.is_adm_text_button}
          </Button>
        )}
      </Box>

      {/* Seção de Busca e Filtros */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 2, sm: 3 }, mb: { xs: 4, md: 5 } }}>
        {/* Campo de Busca */}
        <TextField
          label={VacancyMessages.search}
          variant="outlined"
          fullWidth={!['sm', 'md', 'lg'].includes('sm')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flex: { sm: 1 }, minWidth: { sm: '200px' } }}
        />

        {/* Dropdown de Localização */}
        <TextField
          select label="Localização" variant="outlined" fullWidth
          value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}
          sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: { sm: '180px' } }}
        >
          {options.vacancyLocation.map((option) => (
            <MenuItem key={option.id} value={option.label}>{option.label}</MenuItem>
          ))}
        </TextField>

        {/* Dropdown de Tipo de Contrato */}
        <TextField
          select label="Tipo" variant="outlined" fullWidth
          value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: { sm: '150px' } }}
        >
          {options.vacancyType.map((option) => (
            <MenuItem key={option.id} value={option.label}>{option.label}</MenuItem>
          ))}
        </TextField>
        
        {/* Dropdown de Nível */}
        <TextField
          select label="Nível" variant="outlined" fullWidth
          value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}
          sx={{ width: { xs: '100%', sm: 'auto' }, minWidth: { sm: '150px' } }}
        >
          {options.vacancyLevel.map((option) => (
            <MenuItem key={option.id} value={option.label}>{option.label}</MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Contagem de Vagas Encontradas */}
      <Typography variant="body1" sx={{ color: colors.text.secondary, mb: { xs: 3, md: 4 } }}>
        {filteredVacancies.length} {VacancyMessages.vacancies_found}
      </Typography>

      {/* Listagem de VacancyCards (Flexbox) */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          gap: { xs: '24px', sm: '32px', md: '24px' },
        }}
      >
        {filteredVacancies.map((vacancy) => (
          <Box
            key={vacancy.id}
            sx={{
              flex: {
                xs: '1 1 100%',
                sm: '1 1 calc(50% - 16px)',
                md: '1 1 calc(50% - 16px)',
              },
              maxWidth: {
                xs: '100%',
                sm: 'calc(50% - 16px)',
                md: 'calc(50% - 16px)',
              },
              boxSizing: 'border-box',
            }}
          >
            <VacancyCard
              id={vacancy.id}
              title={vacancy.title}
              company={vacancy.company}
              description={vacancy.description}
              requirements={vacancy.requirements}
              benefits={vacancy.benefits}
              location={vacancy.location}
              type={vacancy.type}
              level={vacancy.level}
              applicationLink={vacancy.applicationLink}
              postedDate={vacancy.postedDate}
              
              isAdm={isAdminUser} // Passa o isAdminUser para o card
              onApplyClick={handleApply}
              onEditClick={handleEditVacancy}
              onDeleteClick={handleDeleteVacancy}
            />
          </Box>
        ))}
        {filteredVacancies.length === 0 && (
          <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Nenhuma vaga encontrada com os filtros selecionados.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Renderiza a VacancyFormModal */}
      <VacancyFormModal
        open={isFormModalOpen}
        onClose={handleCloseFormModal}
        onSubmit={handleSubmitVacancyForm}
        initialData={editingVacancyData}
      />

      {/* Snackbar para feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default VacanciesPage;