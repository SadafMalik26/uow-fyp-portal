import { useQuery, useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import axios from "axios";

axios.defaults.withCredentials = true;

//get project count
export const useProjectCount = () => {
    return useQuery({
        queryKey: ['CountProjects'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/projects/count`)
                .then((res) => res.data)
    })
}

//get projects
export const useProjects = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/projects/`)
                .then((res) => res.data.projects)
    })
}

//get ongoing projects
export const useOngoingProjects = () => {
    return useQuery({
        queryKey: ['ongoingProjects'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/projects/ongoing`)
                .then((res) => res.data.projects)
    })
}

//my projects
export const useMyProjects = () => {
    return useQuery({
        queryKey: ['MyProject'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/projects/my/`)
                .then((res) => res.data.groupProject)
    })
}

//add project
export const useAddProject = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .post(`http://localhost:5001/projects/`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['MyProject'] })
        }
    })
}

//update project
export const useUpdateProject = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .put(`http://localhost:5001/projects/`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['MyProject'] })
        }
    })
}