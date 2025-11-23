import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore/AuthStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const { isAuthenticated, user, isTokenExpired } = useAuthStore();
  const location = useLocation();

  // Check if not authenticated or token is expired
  if (!isAuthenticated || isTokenExpired()) {
    // Redirect to login page, saving the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check admin requirement
  if (requireAdmin && !user?.isAdmin) {
    // Redirect to home if user is not admin
    return <Navigate to="/users" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
