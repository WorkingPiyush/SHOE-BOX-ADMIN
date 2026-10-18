import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import FullScreenLoader from '../components/FullScreenLoader';


const ForGuestOnly = () => {
  const { user: admin, loading } = useAuth();

  if (loading) {
    console.log("this is working")
    return <FullScreenLoader />
  }

  if (admin) {
     return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ForGuestOnly;