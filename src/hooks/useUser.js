import { useQuery } from '@tanstack/react-query';
import { fetchAdmin } from '../Api/apiUser.js';

export const useUser = () => {
    return useQuery({
        queryKey: ['admin'],
        queryFn: fetchAdmin,
    });
};