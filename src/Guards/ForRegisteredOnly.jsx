import { Navigate, Outlet, useLocation } from 'react-router-dom'
import FullScreenLoader from '../components/FullScreenLoader';
import { useAuth } from '../context/AuthContext';


const ForRegisteredOnly = () => {
    const { user: admin, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <FullScreenLoader />
    }

    if (!admin || admin.role !== "ADMIN") {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
}

export default ForRegisteredOnly;