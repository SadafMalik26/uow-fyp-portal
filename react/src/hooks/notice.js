import { useQuery, useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import axios from "axios";

//get notice
export const useNotice = () => {
    return useQuery({
        queryKey: ['notices'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/notice/`)
                .then((res) => res.data.notices)
    })
}

//add notice
export const useAddNotice = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .post(`http://localhost:5001/notice/`, data)
                .then((res) => res.data)
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['notices'] })
        }
    })
}

//delete notice
export const useDeleteNotice = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id) => {
            return axios
                .delete(`http://localhost:5001/notice/${id}`)
                .then((res) => res.data)
        }, onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['notices'] })
        }
    })
}