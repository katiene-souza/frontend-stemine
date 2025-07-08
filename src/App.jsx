import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import CoursesPage from "./pages/Course";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegistrationPage/>}/>
        </Routes>
      </Layout>
  );
}

export default App;
