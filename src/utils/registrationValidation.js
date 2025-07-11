import { VALIDATION_ERROR_MESSAGES } from "../constants/Messages";

export const validate_registration_form = (formData) => {
  let newErrors = {};
  let isValid = true;

  // --- Grupo 1: Dados de Acesso ---
  if (!formData.name.trim()) {
    newErrors.name = VALIDATION_ERROR_MESSAGES.registration_form.name_required;
    isValid = false;
  }

  if (!formData.email.trim()) {
    newErrors.email =
      VALIDATION_ERROR_MESSAGES.registration_form.email_required;
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = VALIDATION_ERROR_MESSAGES.registration_form.email_invalid;
    isValid = false;
  }

  if (!formData.password.trim()) {
    newErrors.password =
      VALIDATION_ERROR_MESSAGES.registration_form.password_required;
    isValid = false;
  } else if (formData.password.trim().length < 6) {
    newErrors.password =
      VALIDATION_ERROR_MESSAGES.registration_form.password_min_length;
    isValid = false;
  }

  if (!formData.confirm_password.trim()) {
    newErrors.confirm_password =
      VALIDATION_ERROR_MESSAGES.registration_form.confirm_password_required;
    isValid = false;
  } else if (formData.password !== formData.confirm_password) {
    newErrors.confirm_password =
      VALIDATION_ERROR_MESSAGES.registration_form.passwords_do_not_match;
    isValid = false;
  }

  if (!formData.date_of_birth) {
    newErrors.date_of_birth =
      VALIDATION_ERROR_MESSAGES.registration_form.date_of_birth_required;
    isValid = false;
  } else {
    const today = new Date();
    const birthDate = new Date(formData.date_of_birth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      newErrors.date_of_birth =
        VALIDATION_ERROR_MESSAGES.registration_form.age_min_18;
      isValid = false;
    }
  }

  if (
    formData.profile_photo_url &&
    !/^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/i.test(formData.profile_photo_url)
  ) {
    newErrors.profile_photo_url =
      VALIDATION_ERROR_MESSAGES.registration_form.profile_photo_url_invalid;
    isValid = false;
  }

  // --- Grupo 2: Perfil da Mentorada ---
  if (!formData.area_of_interest.trim()) {
    newErrors.area_of_interest =
      VALIDATION_ERROR_MESSAGES.registration_form.area_of_interest_required;
    isValid = false;
  }
  if (!formData.experience_level.trim()) {
    newErrors.experience_level =
      VALIDATION_ERROR_MESSAGES.registration_form.experience_level_required;
    isValid = false;
  }
  if (!formData.purpose_of_mentoring.trim()) {
    newErrors.purpose_of_mentoring =
      VALIDATION_ERROR_MESSAGES.registration_form.mentoring_objectives_required;
    isValid = false;
  } else if (formData.purpose_of_mentoring.trim().length < 50) {
    newErrors.purpose_of_mentoring =
      VALIDATION_ERROR_MESSAGES.registration_form.mentoring_objectives_min_length;
    isValid = false;
  }

  if (!formData.time_availability || formData.time_availability.length === 0) {
    newErrors.time_availability =
      VALIDATION_ERROR_MESSAGES.registration_form.time_availability_required;
    isValid = false;
  } else if (formData.time_availability.length > 5) {
    newErrors.time_availability =
      VALIDATION_ERROR_MESSAGES.registration_form.time_availability_max_5;
    isValid = false;
  }

  if (!formData.biography.trim()) {
    newErrors.biography =
      VALIDATION_ERROR_MESSAGES.registration_form.biography_required;
    isValid = false;
  } else if (formData.biography.trim().length < 100) {
    newErrors.biography =
      VALIDATION_ERROR_MESSAGES.registration_form.biography_min_length;
    isValid = false;
  }

  // --- Grupo 3: Desafios Atuais ---
  if (formData.current_challenges.length === 0) {
    newErrors.current_challenges =
      VALIDATION_ERROR_MESSAGES.registration_form.current_challenges_required;
    isValid = false;
  }

  // --- Grupo 5: Informações de Deficiência ---
  if (formData.has_disability === null) {
    newErrors.has_disability =
      VALIDATION_ERROR_MESSAGES.registration_form.has_disability_required;
    isValid = false;
  } else if (formData.has_disability === true) {
    if (!formData.disability_type.trim()) {
      newErrors.disability_type =
        VALIDATION_ERROR_MESSAGES.registration_form.disability_type_required;
      isValid = false;
    }
    if (!formData.adaptation_needed.trim()) {
      newErrors.adaptation_needed =
        VALIDATION_ERROR_MESSAGES.registration_form.adaptation_needed_required;
      isValid = false;
    }
  }

  return { errors: newErrors, isValid: isValid };
};
