import { useQuery } from '@tanstack/react-query';
import { fetchAdmin, getUsers } from '../Api/apiUser.js';

export const useUser = () => {
    return useQuery({
        queryKey: ['admin'],
        queryFn: fetchAdmin,
    });
};

export const useLocalUsers = () => {
    return useQuery({
        queryKey: ['localUsers'],
        queryFn: getUsers,
        staleTime: 10 * 60 * 1000,
        keepPreviousData: true,
        onError: (err) => console.log(err.message),
    });
}