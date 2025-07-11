import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import Layout from "./components/Layout";

import LoginPage from "./pages/LoginPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import CoursesPage from "./pages/Course.jsx";
import MentoringPage from "./pages/MentoringPage.jsx";
import VacanciesPage from "./pages/VacanciesPage.jsx";

import CommunityPage from "./pages/CommunityPage.jsx";
import CommunityPostDetailsPage from "./pages/CommunityPostDetailsPage.jsx";
import AdminCommunityManagementPage from "./pages/AdminCommunityManagementPage.jsx";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0) {
    const userRoles = user.roles || [];
    const hasRequiredRole = allowedRoles.some((role) =>
      userRoles.includes(role)
    );

    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/mentoring" element={<MentoringPage />} />
        <Route path="/vacancies" element={<VacanciesPage />} />

        <Route path="/community" element={<CommunityPage />} />
        <Route path="/community/:id" element={<CommunityPostDetailsPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />

        <Route
          path="/unauthorized"
          element={
            <div>
              Acesso Negado! Você não tem permissão para ver esta página.
            </div>
          }
        />

        <Route
          path="/admin/community"
          element={
            <ProtectedRoute allowedRoles={["ROLE_ADMIN"]}>
              <AdminCommunityManagementPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
