import { VALIDATION_ERROR_MESSAGES } from "../constants/Messages";

const GENERIC_URL_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i;

export const validate_vacancy_form = (formData) => {
  let newErrors = {};
  let isValid = true;

  // Validação do Título da Vaga
  if (!formData.title.trim()) {
    newErrors.title = VALIDATION_ERROR_MESSAGES.vacancy_form.title_required;
    isValid = false;
  } else if (formData.title.trim().length < 5) {
    newErrors.title = VALIDATION_ERROR_MESSAGES.vacancy_form.title_min_length;
    isValid = false;
  }

  // Validação do Nome da Empresa
  if (!formData.company.trim()) {
    newErrors.company = VALIDATION_ERROR_MESSAGES.vacancy_form.company_required;
    isValid = false;
  }

  // Validação da Descrição da Vaga
  if (!formData.description.trim()) {
    newErrors.description = VALIDATION_ERROR_MESSAGES.vacancy_form.description_required;
    isValid = false;
  } else if (formData.description.trim().length < 30) {
    newErrors.description = VALIDATION_ERROR_MESSAGES.vacancy_form.description_min_length;
    isValid = false;
  }

  // Validação dos Requisitos
  if (!formData.requirements.trim()) {
    newErrors.requirements = VALIDATION_ERROR_MESSAGES.vacancy_form.requirements_required;
    isValid = false;
  }

  // Validação dos Benefícios
  if (!formData.benefits.trim()) {
    newErrors.benefits = VALIDATION_ERROR_MESSAGES.vacancy_form.benefits_required;
    isValid = false;
  }

  // Validação da Localização
  if (!formData.location || formData.location === "Todas as Localizações") { 
    newErrors.location = VALIDATION_ERROR_MESSAGES.vacancy_form.location_required;
    isValid = false;
  }

  // Validação do Tipo de Contrato
  if (!formData.type || formData.type === "Todos os Tipos") { 
    newErrors.type = VALIDATION_ERROR_MESSAGES.vacancy_form.type_required;
    isValid = false;
  }

  // Validação do Nível
  if (!formData.level || formData.level === "Todos os Níveis") { 
    newErrors.level = VALIDATION_ERROR_MESSAGES.vacancy_form.level_required;
    isValid = false;
  }

  // Validação do Link para Candidatura
  if (!formData.applicationLink.trim()) {
    newErrors.applicationLink = VALIDATION_ERROR_MESSAGES.vacancy_form.application_link_required;
    isValid = false;
  } else if (!GENERIC_URL_REGEX.test(formData.applicationLink)) {
    newErrors.applicationLink = VALIDATION_ERROR_MESSAGES.vacancy_form.application_link_invalid;
    isValid = false;
  }

  return { errors: newErrors, isValid: isValid };
};