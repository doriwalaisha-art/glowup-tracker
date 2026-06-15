import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../api/axios';

export const useHabits = () => {
    const queryClient = useQueryClient();

    const habitsQuery = useQuery({
        queryKey: ['habits'], 
        queryFn: async () => {
            const { data } = await API.get('/habits');
            return data;
        },
    });

    const createMutation = useMutation({
        mutationFn: async (newHabit) => {
            const { data } = await API.post('/habits', newHabit);
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries(['habits']), 
    });

    const toggleMutation = useMutation({
        mutationFn: async (id) => {
            const { data } = await API.put(`/habits/${id}/toggle`);
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries(['habits']), 
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await API.delete(`/habits/${id}`);
        },
        onSuccess: () => queryClient.invalidateQueries(['habits']), 
    });

    return {
        habits: habitsQuery.data,
        isLoading: habitsQuery.isLoading,
        createHabit: createMutation.mutate,
        toggleHabit: toggleMutation.mutate,
        deleteHabit: deleteMutation.mutate,
    };
};
