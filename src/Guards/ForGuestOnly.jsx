import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import FullScreenLoader from '../components/FullScreenLoader';


const ForGuestOnly = () => {
  const { user: admin, loading } = useAuth();

  if (loading) {
    return <FullScreenLoader />
  }

  if (admin?.role === "user") {
    return <Outlet />;
  }

  if (admin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ForGuestOnly;