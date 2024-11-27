import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Protect = () => {
    const user = useSelector(state => state.auth.user);
    const location = useLocation();
    return (
        user.role
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )


}

export default Protect