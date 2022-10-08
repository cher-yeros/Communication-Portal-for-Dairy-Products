import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth.loggedUser);

  return auth ? (
    auth?.Roles?.find((role) => allowedRoles?.includes(role.name)) ? (
      <Outlet />
    ) : (
      <Navigate to={`/${auth.role}`} state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
