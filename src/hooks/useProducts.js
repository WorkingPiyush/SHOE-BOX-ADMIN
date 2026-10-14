import { useQuery } from '@tanstack/react-query';
import { getOrders, getProducts } from '../Api/apiProducts';

export const useProducts = ({ slug, gender }) => {
    return useQuery({
        queryKey: ['products', slug, gender],
        queryFn: () => getProducts({ slug, gender }),
        staleTime: 10 * 60 * 1000,
        keepPreviousData: true,
        onError: (err) => console.log(err.message),
    });
}
export const useOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: getOrders,
        staleTime: 10 * 60 * 1000,
        keepPreviousData: true,
        onError: (err) => console.log(err.message),
    });
}
