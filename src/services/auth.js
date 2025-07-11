import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL + "/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(userData) {
    return axios.post(API_URL + "signup", {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      dateOfBirth: userData.date_of_birth,
      adaptationNeeded: userData.adaptation_needed,
      areaOfInterest: userData.area_of_interest,
      biography: userData.biography,
      profilePhotoUrl: userData.profile_photo_url || null,
      hasDisability: userData.has_disability,
      disabilityType: userData.disability_type,
      experienceLevel: userData.experience_level,
      githubUrl: userData.github,
      lattesUrl: userData.lattes,
      linkedinUrl: userData.linkedin,
      portfolioUrl: userData.portfolio,
      purposeOfMentoring: userData.purpose_of_mentoring,
      currentChallenges: userData.current_challenges,
      timeAvailability: userData.time_availability,
    });
  }

  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
}

export default new AuthService();
