import { VALIDATION_ERROR_MESSAGES } from "../constants/Messages";

const GENERIC_URL_REGEX = /^https?:\/\/[^\s$.?#].[^\s]*$/i;

export const validate_article_form = (formData) => {
  let newErrors = {};
  let isValid = true;

  if (!formData.title.trim()) {
    newErrors.title = VALIDATION_ERROR_MESSAGES.community_form.title_required;
    isValid = false;
  } else if (formData.title.trim().length < 5) {
    newErrors.title = VALIDATION_ERROR_MESSAGES.community_form.title_min_length;
    isValid = false;
  }

  if (!formData.author.trim()) {
    newErrors.author = VALIDATION_ERROR_MESSAGES.community_form.author_required;
    isValid = false;
  } else if (formData.author.trim().length < 3) {
    newErrors.author = VALIDATION_ERROR_MESSAGES.community_form.author_min_length;
    isValid = false;
  }

  const plainTextContent = formData.content.replace(/<[^>]*>/g, '').trim();
  if (!plainTextContent) {
    newErrors.content = VALIDATION_ERROR_MESSAGES.community_form.content_required;
    isValid = false;
  } else if (plainTextContent.length < 50) { 
    newErrors.content = VALIDATION_ERROR_MESSAGES.community_form.content_min_length;
    isValid = false;
  }

  if (!formData.postedDate) {
    newErrors.postedDate = VALIDATION_ERROR_MESSAGES.community_form.posted_date_required;
    isValid = false;
  } else {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(formData.postedDate)) {
      newErrors.postedDate = VALIDATION_ERROR_MESSAGES.community_form.posted_date_invalid_format;
      isValid = false;
    }
  }

  const imageUrlRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif|svg|webp)$/i; 
  if (formData.imageUrl && !imageUrlRegex.test(formData.imageUrl)) {  
    newErrors.imageUrl = VALIDATION_ERROR_MESSAGES.community_form.image_url_invalid;
    isValid = false;
  }

  return { errors: newErrors, isValid: isValid };
};