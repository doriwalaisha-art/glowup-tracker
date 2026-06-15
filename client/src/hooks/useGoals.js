import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../api/axios';

export const useGoals = () => {
    const queryClient = useQueryClient();

    const goalsQuery = useQuery({
        queryKey: ['goals'], 
        queryFn: async () => {
            const { data } = await API.get('/goals');
            return data;
        },
    });

    const createMutation = useMutation({
        mutationFn: async (newGoal) => {
            const { data } = await API.post('/goals', newGoal);
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries(['goals']),
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, updatedData }) => {
            const { data } = await API.put(`/goals/${id}`, updatedData);
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries(['goals']), 
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await API.delete(`/goals/${id}`);
        },
        onSuccess: () => queryClient.invalidateQueries(['goals']), 
    });

    return {
        goals: goalsQuery.data,
        isLoading: goalsQuery.isLoading,
        createGoal: createMutation.mutate,
        updateGoal: updateMutation.mutate,
        deleteGoal: deleteMutation.mutate,
    };
};
