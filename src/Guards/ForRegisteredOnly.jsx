import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../hooks/useUser';
import FullScreenLoader from '../components/FullScreenLoader';


const ForRegisteredOnly = () => {
    const { data: user, isLoading } = useUser();
    if (isLoading) return <FullScreenLoader />
    if (!user) return <Navigate to='/' replace />;
    return <Outlet />;
}

export default ForRegisteredOnly;