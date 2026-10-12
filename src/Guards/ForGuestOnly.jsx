import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../hooks/useUser';


const ForGuestOnly = () => {
  const { data: user } = useUser();

  if (user) return <Navigate to='/dashboard' replace />;
  return <Outlet />;
}

export default ForGuestOnly;