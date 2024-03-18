import { useQuery, useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import axios from "axios";

//get PastEndeavors
export const usePastEndeavors = () => {
    return useQuery({
         queryKey: ['PastEndeavors'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/pastendeavor/`)
                .then((res) => res.data.PastEndeavors)
    })
}

//add PastEndeavors
export const useAddPastEndeavor = () => {
    const queryClient = useQueryClient() 
    return useMutation({
        mutationFn: (data) => {
            return axios
                .post(`http://localhost:5001/pastendeavor/`, data)
                .then((res) => res.data)
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['PastEndeavors'] })
        }
    })
}

//update PastEndeavors
export const useUpdatepastEndeavor= () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .put(`http://localhost:5001/pastendeavor/`, data)
                .then((res) => res.data)
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['pastendeavor'] })
        }
    })
}
//delete PastEndeavor
export const useDeletePastEndeavor = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id) => { 
            return axios
                .delete(`http://localhost:5001/pastendeavor/${id}`)
                .then((res) => res.data)
        }, onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['PastEndeavors'] })
        }
    })
}