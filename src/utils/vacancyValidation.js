import { VALIDATION_ERROR_MESSAGES } from "../constants/Messages";

const GENERIC_URL_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)$/i;

export const validate_vacancy_form = (formData) => {
  let newErrors = {};
  let isValid = true;

  if (!formData.title.trim()) {
    newErrors.title = VALIDATION_ERROR_MESSAGES.vacancy_form.title_required;
    isValid = false;
  } else if (formData.title.trim().length < 5) {
    newErrors.title = VALIDATION_ERROR_MESSAGES.vacancy_form.title_min_length;
    isValid = false;
  }

  if (!formData.company.trim()) {
    newErrors.company = VALIDATION_ERROR_MESSAGES.vacancy_form.company_required;
    isValid = false;
  }

  if (!formData.description.trim()) {
    newErrors.description = VALIDATION_ERROR_MESSAGES.vacancy_form.description_required;
    isValid = false;
  } else if (formData.description.trim().length < 30) {
    newErrors.description = VALIDATION_ERROR_MESSAGES.vacancy_form.description_min_length;
    isValid = false;
  }

  if (!formData.requirements.trim()) {
    newErrors.requirements = VALIDATION_ERROR_MESSAGES.vacancy_form.requirements_required;
    isValid = false;
  }

  if (!formData.benefits.trim()) {
    newErrors.benefits = VALIDATION_ERROR_MESSAGES.vacancy_form.benefits_required;
    isValid = false;
  }

  if (!formData.location) { 
    newErrors.location = VALIDATION_ERROR_MESSAGES.vacancy_form.location_required;
    isValid = false;
  }

  if (!formData.type) { 
    newErrors.type = VALIDATION_ERROR_MESSAGES.vacancy_form.type_required;
    isValid = false;
  }

  if (!formData.level) { 
    newErrors.level = VALIDATION_ERROR_MESSAGES.vacancy_form.level_required;
    isValid = false;
  }

  if (!formData.applicationLink.trim()) {
    newErrors.applicationLink = VALIDATION_ERROR_MESSAGES.vacancy_form.application_link_required;
    isValid = false;
  } else if (!GENERIC_URL_REGEX.test(formData.applicationLink)) {
    newErrors.applicationLink = VALIDATION_ERROR_MESSAGES.vacancy_form.application_link_invalid;
    isValid = false;
  }

  if (!formData.postedDate) {
    newErrors.postedDate = VALIDATION_ERROR_MESSAGES.vacancy_form.posted_date_required;
    isValid = false;
  } else {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(formData.postedDate)) {
      newErrors.postedDate = VALIDATION_ERROR_MESSAGES.vacancy_form.posted_date_invalid_format;
      isValid = false;
    }
  }

  return { errors: newErrors, isValid: isValid };
};