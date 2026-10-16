import { useQuery } from '@tanstack/react-query';
import { getOrder, getOrders } from '../Api/apiOrders';

export const useOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: getOrders,
        staleTime: 10 * 60 * 1000,
        keepPreviousData: true,
        onError: (err) => console.log(err.message),
    });
}
export const useOrder = ({ id }) => {
    return useQuery({
        queryKey: ['order', id],
        queryFn: () => getOrder(id),
        staleTime: 10 * 60 * 1000,
        keepPreviousData: true,
        onError: (err) => console.log(err.message),
    });
}

