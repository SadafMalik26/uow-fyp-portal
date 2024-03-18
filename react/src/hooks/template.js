import { useQuery, useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import axios from "axios";

axios.defaults.withCredentials = true;

//get template
export const useTemplates = () => {
    return useQuery({
        queryKey: ['templates'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/templates/`)
                .then((res) => res.data.templates)
    })
}

//add template
export const useAddTemplates = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {

            return axios
                .post(`http://localhost:5001/templates/`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
        },
     onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['templates'] })
        }
    })
}

//update template
export const useUpdateTemplates = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .put(`http://localhost:5001/templates/`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
        },
     onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['templates'] })
        }
    })
}