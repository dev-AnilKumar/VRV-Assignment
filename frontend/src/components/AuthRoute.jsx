import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRoute = ({ role }) => {
    const user = useSelector(state => state.auth.user);
    const location = useLocation();

    return (
        user.role === role
            ? <Outlet />
            : <Navigate to="/unauthorized" state={{ from: location }} replace />
    )


}

export default AuthRoute