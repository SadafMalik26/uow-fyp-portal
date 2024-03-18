import { useQuery, useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import axios from "axios";

//get links
export const useLinks = () => {
    return useQuery({
        queryKey: ['links'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/link/`)
                .then((res) => res.data.links)
    })
} 

//add links
export const useAddLink = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .post(`http://localhost:5001/link/`, data)
                .then((res) => res.data)
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['links'] })
        }
    })
}

//update links
export const useUpdateLink = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .put(`http://localhost:5001/link/`, data)
                .then((res) => res.data)
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['links'] })
        }
    })
}