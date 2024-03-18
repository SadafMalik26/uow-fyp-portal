import { useQuery, useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import axios from "axios";

//get FacultyProjects
export const useFacultyProjects = () => {
    return useQuery({
         queryKey: ['FacultyProjects'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/facultyproject/`)
                .then((res) => res.data.FacultyProjects)
    })
}

//add FacultyProjects
export const useAddFacultyProject = () => {
    const queryClient = useQueryClient() 
    return useMutation({
        mutationFn: (data) => {
            return axios
                .post(`http://localhost:5001/facultyproject/`, data)
                .then((res) => res.data)
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['FacultyProjects'] })
        }
    })
}

//update FacultyProjects
export const useUpdatefacultyProject= () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .put(`http://localhost:5001/facultyproject/`, data)
                .then((res) => res.data)
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['facultyproject'] })
        }
    })
}
//delete FacultyProject
export const useDeleteFacultyProject= () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id) => { 
            return axios
                .delete(`http://localhost:5001/facultyproject/${id}`)
                .then((res) => res.data)
        }, onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['FacultyProjects'] })
        }
    })
}