import { Route, Routes } from "react-router";

import AreasPage from "@/pages/AreasPage/AreasPage";
import HabitsPage from "@/pages/HabitsPage/HabitsPage";
import HomePage from "@/pages/HomePage/HomePage";
import LoginPage from "@/pages/LoginPage/LoginPage";
import MainLayout from "@layout/MainLayout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import SignupPage from "@/pages/SignupPage/SignupPage";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import TestPage from "@/pages/PageTest/TestPage";
import ProfilePage from "@/pages/ProfilePage/ProfilePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignupPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="areas" element={<AreasPage />} />
        <Route path="habits" element={<HabitsPage />} />
        <Route path="test" element={<TestPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
