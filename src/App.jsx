import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import CoursesPage from "./pages/Course";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import MentoringPage from "./pages/MentoringPage";
import VacanciesPage from "./pages/VacanciesPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/mentoring" element={<MentoringPage />} />
        <Route path="/vacancies" element={<VacanciesPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
