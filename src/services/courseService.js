import api from "./api";

const COURSE_api_BASE_URL = "/courses";

class CourseService {
  getAllCourses() {
    return api.get(COURSE_api_BASE_URL);
  }

  getCourseById(id) {
    return api.get(COURSE_api_BASE_URL + `/${id}`);
  }

  createCourse(courseData) {
    return api.post(COURSE_api_BASE_URL, courseData);
  }

  updateCourse(id, courseData) {
    return api.put(COURSE_api_BASE_URL + `/${id}`, courseData);
  }

  deleteCourse(id) {
    return api.delete(COURSE_api_BASE_URL + `/${id}`);
  }

  searchCourses(filters) {
    return api.get(COURSE_api_BASE_URL + "/search", { params: filters });
  }
}

export default new CourseService();
