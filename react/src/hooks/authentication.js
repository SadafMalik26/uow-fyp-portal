import { useQuery, useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import axios from "axios";

axios.defaults.withCredentials = true;

//get auth user
export const useAuth = () => {
    return useQuery({
        queryKey: ['Auth'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/user/auth`)
                .then((res) => res.data)
    })
}


//get auth user notification
export const useNotification= () => {
    return useQuery({
        queryKey: ['Notification'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/user/notification`)
                .then((res) => res.data.notifcations)
    })
}

//get  user
export const useUser = (id) => {
    return useQuery({
        queryKey: ['User'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/user/${id}`)
                .then((res) => res.data.user)
        
    })
}

//login user
export const useLogin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .post(`http://localhost:5001/user/login`, data,{ headers: {
                    'Content-Type': 'application/json'
                }})
                .then((res) => res.data)
        },
        onSuccess: async (res) => {
            return {'message':'success'}
        },
        onError: () => {
            return {'message':'error'}
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['Auth'] })
        }
    })
}

//logout user
export const useLogout = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => {
            return axios
                .get(`http://localhost:5001/user/logout`)
                .then((res) => res.data)
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['Auth'] })
        }
    })
}

//delete user
export const useDeleteUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id) => {
            return axios
                .delete(`http://localhost:5001/user/${id}`)
                .then((res) => res.data)
        }, onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['Teachers'] })
            queryClient.invalidateQueries({ queryKey: ['students'] })
        }
    })
}



//update user
export const useUpdateUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .put(`http://localhost:5001/user/`,data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
        }, onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['User'] })
            queryClient.invalidateQueries({ queryKey: ['Auth'] })

        }
    })
}



//forget pass
export const useForgetPass = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .put(`http://localhost:5001/user/forget`,data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => res.data)
        }
    })
}
