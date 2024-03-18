import { useQuery, useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import axios from "axios";

axios.defaults.withCredentials = true;

//get teacher count
export const useTeacherCount = () => {
    return useQuery({
        queryKey: ['CountTeacher'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/teacher/count`)
                .then((res) => res.data.teacherCount)
    })
}

//get teacher slots
export const useTeacherSlots = (id) => {
    return useQuery({
        queryKey: ['Slots'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/teacher/slots/${id}`)
                .then((res) => res.data.slots)
    })
}

//get teacher slots Count
export const useTeacherSlotsCount = (id) => {
    return useQuery({
        queryKey: ['SlotCount'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/teacher/slots/count/${id}`)
                .then((res) => res.data)
    })
}

//get my slots
export const useMySlots = (id) => {
    return useQuery({
        queryKey: ['MySlots'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/teacher/slots/`)
                .then((res) => res.data.slots)
    })
}

//get teacher
export const useTeacher = () => {
    return useQuery({
        queryKey: ['Teachers'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/teacher/`)
                .then((res) => res.data.teachers)
    })
}

//get single teacher
export const useTeacherQualificationDetails = (id) => {
    return useQuery({
        queryKey: ['TeacherDetails'],
        queryFn: () => {

            return axios
                .get(`http://localhost:5001/teacher/qualification/${id}`)
                .then((res) => res.data.teacher)
        }

    })
}

//add Teacher
export const useAddTeacher = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .post(`http://localhost:5001/teacher/`, data, {
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
            queryClient.invalidateQueries({ queryKey: ['Teachers'] })
        }
    })
}

//add Teacher Slot
export const useAddTeacherSlot = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .post(`http://localhost:5001/teacher/slots/`, data, {
                    headers: {
                        'Content-Type': 'application/json'
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
            queryClient.invalidateQueries({ queryKey: ['MySlots'] })
            queryClient.invalidateQueries({ queryKey: ['Slots'] })
        }
    })
}

//update Teacher Slot
export const useEditTeacherSlot = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .put(`http://localhost:5001/teacher/slots/`, data,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((res) => res.data)
        },onError: (res) => {
            return { 'message': res }
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['Slots'] })
            queryClient.invalidateQueries({ queryKey: ['MySlots'] })
        }
    })
}


