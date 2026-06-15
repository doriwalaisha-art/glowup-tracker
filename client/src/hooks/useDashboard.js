import { useQuery } from '@tanstack/react-query';
import API from '../api/axios';

export const useDashboard = () => {
    const userQuery = useQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
            const { data } = await API.get('/users/profile');
            return data;
        },
    });

    const habitsQuery = useQuery({
        queryKey: ['habits'], 
        queryFn: async () => {
            const { data } = await API.get('/habits');
            return data;
        },
    });

    const goalsQuery = useQuery({
        queryKey: ['goals'], 
        queryFn: async () => {
            const { data } = await API.get('/goals');
            return data;
        },
    });

    return {
        user: userQuery.data,
        habits: habitsQuery.data,
        goals: goalsQuery.data,
        isLoading: userQuery.isLoading || habitsQuery.isLoading || goalsQuery.isLoading,
    };
};
