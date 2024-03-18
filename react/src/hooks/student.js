import { useQuery, useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import axios from "axios";

axios.defaults.withCredentials = true;

//get student user
export const useStudentCount = () => {
    return useQuery({
        queryKey: ['CountStudent'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/student/count`)
                .then((res) => res.data.studentCount)
    })
}

//get student
export const useStudent = () => {
    return useQuery({
        queryKey: ['students'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/student/`)
                .then((res) => res.data.students)
    })
}

//add Student
export const useAddStudent = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .post(`http://localhost:5001/student/`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
        },
        onSuccess: async (res) => {

            return { 'message': 'success' }
        },
        onError: () => {

            return { 'message': 'error' }
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['students'] })
        }
    })
}
