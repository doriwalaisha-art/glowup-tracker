import {useQuery , useMutation, useQueryClient} from '@tanstack/react-query'
import API from '../api/axios';
import Swal from 'sweetalert2';

export const useGoals = () => {
    const queryClient = useQueryClient();


    //fetch goals

    const goalsQuery = useQuery({
        queryKey : ['goals'],
        queryFn : async () => {
            const {data} = await API.get('/goals');
            return data;
        },
    });

    //create new goal

    const createMutation = useMutation({
        mutationFn : async (newGoal) => {
            const { data } = await API.post('/goals',newGoal);
            return data;
        },
        onSuccess: () => queryClient.invalidateQueries(['goals'])
    });

    //update goal progress

    const updateMutation = useMutation({
        mutationFn : async ({ id, updatedData}) => {
            const { data } = await API.put(`/goals/${id}`,updatedData);
            return data;
        },
        onSuccess : (data) => { queryClient.invalidateQueries(['goals'])

            if(data.currentValue >= data.targetValue) {
                Swal.fire({
                    title: 'Congratulations! 🌟',
                text: `You've crushed your goal: ${data.title}!`,
                icon: 'success',
                confirmButtonColor: '#a855f7', 
                confirmButtonText: 'Let\'s keep glowing!',
                background: '#fff',
                backdrop: `rgba(0,0,0,0.4)`,
                showClass: { popup: 'animate__animated animate__zoomIn' },
                hideClass: { popup: 'animate__animated animate__zoomOut' }
             });
            }
        },
    });

    //delete goal

    const deleteMutation = useMutation({
        mutationFn : async (id) => {
            await API.delete(`/goals/${id}`);
        
        },
        onSuccess : () => queryClient.invalidateQueries(['goals'])
    });

    return {
        goals : goalsQuery.data,
        isLoading : goalsQuery.isLoading,
        createGoal : createMutation.mutate,
        updateGoal : updateMutation.mutate,
        deleteGoal : deleteMutation.mutate,
    };
};