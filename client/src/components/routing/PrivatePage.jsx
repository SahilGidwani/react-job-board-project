import { useAuth } from "@/features/authentication";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { Navigate, useLocation } from "react-router-dom";

export function PrivatePage({ children }) {
  const { user, isLoadingUser } = useAuth();
  const location = useLocation();

  if (isLoadingUser) return <LoadingSpinner className="w-24 h-24" />;

  if (user == null)
    return <Navigate to="/login" replace state={{ location }} />;

  return children;
}
