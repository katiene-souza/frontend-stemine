import { VALIDATION_ERROR_MESSAGES } from "../constants/Messages";

const MAX_DESCRIPTION_LENGTH = 97;

export const validate_course_form = (formData) => {
  let newErrors = {};
  let isValid = true;

  if (!formData.title.trim()) {
    newErrors.title = VALIDATION_ERROR_MESSAGES.course_form.title_required;
    isValid = false;
  } else if (formData.title.trim().length < 5) {
    newErrors.title = VALIDATION_ERROR_MESSAGES.course_form.title_min_length;
    isValid = false;
  }

  if (!formData.description.trim()) {
    newErrors.description =
      VALIDATION_ERROR_MESSAGES.course_form.description_required;
    isValid = false;
  } else if (formData.description.trim().length < 20) {
    newErrors.description =
      VALIDATION_ERROR_MESSAGES.course_form.description_min_length;
    isValid = false;
  } else if (formData.description.trim().length > MAX_DESCRIPTION_LENGTH) {
    newErrors.description = `A descrição deve ter no máximo ${MAX_DESCRIPTION_LENGTH} caracteres.`;
    isValid = false;
  }

  if (
    !formData.durationValue ||
    isNaN(formData.durationValue) ||
    parseInt(formData.durationValue) <= 0
  ) {
    newErrors.durationValue =
      VALIDATION_ERROR_MESSAGES.course_form.duration_positive_number;
    isValid = false;
  }

  if (!formData.durationUnit) {
    newErrors.durationUnit =
      VALIDATION_ERROR_MESSAGES.course_form.unit_required;
    isValid = false;
  }

  if (!formData.level) {
    newErrors.level = VALIDATION_ERROR_MESSAGES.course_form.level_required;
    isValid = false;
  }

  const urlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif|svg|webp)$/i;

  if (!formData.imageUrl || !urlRegex.test(formData.imageUrl)) {
    newErrors.imageUrl =
      VALIDATION_ERROR_MESSAGES.course_form.image_url_invalid;
    isValid = false;
  }

  if (!formData.companyLogoUrl || !urlRegex.test(formData.companyLogoUrl)) {
    newErrors.companyLogoUrl =
      VALIDATION_ERROR_MESSAGES.course_form.company_logo_url_invalid;
    isValid = false;
  }

  const genericUrlRegex = /^https?:\/\/[^\s$.?#].[^\s]*$/i;
  if (!formData.courseUrl || !genericUrlRegex.test(formData.courseUrl)) {
    newErrors.courseUrl =
      VALIDATION_ERROR_MESSAGES.course_form.course_url_invalid;
    isValid = false;
  }

  if (!formData.categories || formData.categories.length === 0) {
    newErrors.categories =
      VALIDATION_ERROR_MESSAGES.course_form.category_required;
    isValid = false;
  } else if (formData.categories.length > 2) {
    newErrors.categories =
      VALIDATION_ERROR_MESSAGES.course_form.category_max_two;
    isValid = false;
  }

  return { errors: newErrors, isValid: isValid };
};
