import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../api/axios';

export const useProfile = () => {
    const queryClient = useQueryClient();

    const profileQuery = useQuery({
        queryKey:['useProfile'],
        queryFn : async () => {
            const { data } = await  API.get('/users/profile');
            return data;
        },
    });

    const updateMutation = useMutation({
        mutationFn: async (updatedData) => {
            const { data } = await API.put('/users/profile',updatedData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['useProfile']);
        },
    });

    return {
        profile : profileQuery.data,
        isLoading : profileQuery.isLoading,
        isError : profileQuery.isError,
        updateProfile : updateMutation.mutate,
        isUpdating :   updateMutation.isUpdating
    };
};
