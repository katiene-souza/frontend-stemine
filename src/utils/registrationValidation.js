import { error_messages } from "../constants/Messages";

export const validateRegistrationForm = (formData) => {
  let newErrors = {};
  let isValid = true;

  // --- Grupo 1: Dados de Acesso ---
  if (!formData.name.trim()) {
    newErrors.name = error_messages.registration_form.name_required;
    isValid = false;
  }

  if (!formData.email.trim()) {
    newErrors.email = error_messages.registration_form.email_required;
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = error_messages.registration_form.email_invalid;
    isValid = false;
  }

  if (!formData.password.trim()) {
    newErrors.password = error_messages.registration_form.password_required;
    isValid = false;
  } else if (formData.password.trim().length < 6) {
    // Exemplo: min 6 caracteres
    newErrors.password = error_messages.registration_form.password_min_length;
    isValid = false;
  }

  if (!formData.confirm_password.trim()) {
    newErrors.confirm_password =
      error_messages.registration_form.confirm_password_required;
    isValid = false;
  } else if (formData.password !== formData.confirm_password) {
    newErrors.confirm_password =
      error_messages.registration_form.passwords_do_not_match;
    isValid = false;
  }

  if (!formData.date_of_birth) {
    newErrors.date_of_birth =
      error_messages.registration_form.date_of_birth_required;
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
      newErrors.date_of_birth = error_messages.registration_form.age_min_18;
      isValid = false;
    }
  }

  // Validação da URL da foto de perfil (opcional, mas se preenchida, deve ser válida)
  if (
    formData.profile_photo_url &&
    !/^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/i.test(formData.profile_photo_url)
  ) {
    newErrors.profile_photo_url =
      error_messages.registration_form.profile_photo_url_invalid;
    isValid = false;
  }

  // --- Grupo 2: Perfil da Mentorada ---
  if (!formData.area_of_interest.trim()) {
    newErrors.area_of_interest =
      error_messages.registration_form.area_of_interest_required;
    isValid = false;
  }
  if (!formData.experience_level.trim()) {
    newErrors.experience_level =
      error_messages.registration_form.experience_level_required;
    isValid = false;
  }
  if (!formData.purpose_of_mentoring.trim()) {
    newErrors.purpose_of_mentoring =
      error_messages.registration_form.purpose_of_mentoring_required;
    isValid = false;
  } else if (formData.purpose_of_mentoring.trim().length < 50) {
    // Mínimo de 50 caracteres para uma boa descrição
    newErrors.purpose_of_mentoring =
      error_messages.registration_form.purpose_of_mentoring_min_length;
    isValid = false;
  }
  if (!formData.time_availability || formData.time_availability.length === 0) {
    // Verifica se o array é nulo/undefined ou vazio
    newErrors.time_availability =
      error_messages.registration_form.time_availability_required;
    isValid = false;
  } else if (formData.time_availability.length > 5) {
    // Limite de 5 opções
    newErrors.time_availability =
      error_messages.registration_form.time_availability_max_5;
    isValid = false;
  }
  if (!formData.biography.trim()) {
    newErrors.biography = error_messages.registration_form.biography_required;
    isValid = false;
  } else if (formData.biography.trim().length < 100) {
    // Mínimo de 100 caracteres para uma biografia
    newErrors.biography = error_messages.registration_form.biography_min_length;
    isValid = false;
  }

  // --- Grupo 3: Desafios Atuais ---
  if (formData.current_challenges.length === 0) {
    newErrors.current_challenges =
      error_messages.registration_form.current_challenges_required;
    isValid = false;
  }

  // --- Grupo 5: Informações de Deficiência ---
  if (formData.has_disability === null) {
    // Se não foi selecionado "Sim" nem "Não"
    newErrors.has_disability =
      error_messages.registration_form.has_disability_required;
    isValid = false;
  } else if (formData.has_disability === true) {
    // Se "Sim" foi selecionado, campos adicionais são obrigatórios
    if (!formData.disability_type.trim()) {
      newErrors.disability_type =
        error_messages.registration_form.disability_type_required;
      isValid = false;
    }
    if (!formData.adaptation_needed.trim()) {
      newErrors.adaptation_needed =
        error_messages.registration_form.adaptation_needed_required;
      isValid = false;
    }
  }

  return { errors: newErrors, isValid: isValid };
};
