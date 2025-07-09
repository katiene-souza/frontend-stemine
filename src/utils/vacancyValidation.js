// src/utils/vacancyValidation.js

import { error_messages } from "../constants/Messages";

const GENERIC_URL_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i;

export const validateVacancyForm = (formData) => {
  let newErrors = {};
  let isValid = true;

  // Validação do Título da Vaga
  if (!formData.title.trim()) {
    newErrors.title = error_messages.vacancy_form.title_required;
    isValid = false;
  } else if (formData.title.trim().length < 5) {
    newErrors.title = error_messages.vacancy_form.title_min_length;
    isValid = false;
  }

  // Validação do Nome da Empresa
  if (!formData.company.trim()) {
    newErrors.company = error_messages.vacancy_form.company_required;
    isValid = false;
  }

  // Validação da Descrição da Vaga
  if (!formData.description.trim()) {
    newErrors.description = error_messages.vacancy_form.description_required;
    isValid = false;
  } else if (formData.description.trim().length < 30) {
    newErrors.description = error_messages.vacancy_form.description_min_length;
    isValid = false;
  }

  // Validação dos Requisitos
  if (!formData.requirements.trim()) {
    newErrors.requirements = error_messages.vacancy_form.requirements_required;
    isValid = false;
  }

  // Validação dos Benefícios
  if (!formData.benefits.trim()) {
    newErrors.benefits = error_messages.vacancy_form.benefits_required;
    isValid = false;
  }

  // Validação da Localização
  if (!formData.location || formData.location === "Todas as Localizações") { 
    newErrors.location = error_messages.vacancy_form.location_required;
    isValid = false;
  }

  // Validação do Tipo de Contrato
  if (!formData.type || formData.type === "Todos os Tipos") { 
    newErrors.type = error_messages.vacancy_form.type_required;
    isValid = false;
  }

  // Validação do Nível
  if (!formData.level || formData.level === "Todos os Níveis") { 
    newErrors.level = error_messages.vacancy_form.level_required;
    isValid = false;
  }

  // Validação do Link para Candidatura
  if (!formData.applicationLink.trim()) {
    newErrors.applicationLink = error_messages.vacancy_form.application_link_required;
    isValid = false;
  } else if (!GENERIC_URL_REGEX.test(formData.applicationLink)) {
    newErrors.applicationLink = error_messages.vacancy_form.application_link_invalid;
    isValid = false;
  }

  return { errors: newErrors, isValid: isValid };
};