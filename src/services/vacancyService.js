import api from "./api";

const VACANCY_API_BASE_URL = "/vacancies";

class VacancyService {
  getAllVacancies() {
    return api.get(VACANCY_API_BASE_URL);
  }

  getVacancyById(id) {
    return api.get(VACANCY_API_BASE_URL + `/${id}`);
  }

  createVacancy(vacancyData) {
    return api.post(VACANCY_API_BASE_URL, vacancyData);
  }

  updateVacancy(id, vacancyData) {
    return api.put(VACANCY_API_BASE_URL + `/${id}`, vacancyData);
  }

  deleteVacancy(id) {
    return api.delete(VACANCY_API_BASE_URL + `/${id}`);
  }

  searchVacancies(filters) {
    return api.get(VACANCY_API_BASE_URL + "/search", { params: filters });
  }
}

export default new VacancyService();
