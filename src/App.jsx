import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import CoursesPage from "./pages/Course";

function App() {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage/>} />

        </Routes>
      </Layout>
  );
}

export default App;
