import { useQuery, useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import axios from "axios";

axios.defaults.withCredentials = true;

export const useTimeline = () => {
    return useQuery({
        queryKey: ['timelines'],
        queryFn: () =>
            axios
                 .get(`http://localhost:5001/timelines/`)
                 .then((res) => res.data.timelines)
    })
} 
export const useAddTimeline= () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .post(`http://localhost:5001/timelines/`, data)
                .then((res) => res.data)
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['timelines'] })
         }
    })
}

// //update timelines
// export const useEditTimeline = () => {
//     const queryClient = useQueryClient()
//     return useMutation({
//         mutationFn: (data) => {
//             return axios
//                 .put(`http://localhost:5001/timelines/`, data,{
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 })
//                 .then((res) => res.data)
//         }, onSettled: (res) => {
//             queryClient.invalidateQueries({ queryKey: ['timeline'] })
//         }
//     })
    
// }

export const useDeleteTimeline= () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id) => {
            return axios
                .delete(`http://localhost:5001/timelines/${id}`)
                .then((res) => res.data)
        }, onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['timelines'] })
        }
    })
}