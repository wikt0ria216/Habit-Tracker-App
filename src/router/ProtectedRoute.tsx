import { ReactNode } from "react";

import { useAuthContext } from "@/features/authentication/hooks/useAuthContext";
import LoadingPage from "@/pages/LoadingPage/LoadingPage";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { session, isLoading } = useAuthContext();



  if (isLoading) {
    return <LoadingPage />;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
