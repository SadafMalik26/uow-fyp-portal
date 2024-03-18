import { useQuery, useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import axios from "axios";

axios.defaults.withCredentials = true;

//get groups
export const useGroups = () => {
    return useQuery({
        queryKey: ['groups'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/group/`)
                .then((res) => res.data.groups)
    })
}


//get groups mebers
export const useAttendees = (id) => {
    return useQuery({
        queryKey: ['Attendees'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/group/attendees/${id}`)
                .then((res) => res.data.students)
    })
}

//get group chat
export const useGroupChat = (id) => {
    return useQuery({
        queryKey: ['chat'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/chat/${id}`)
                .then((res) => res.data.chats)
    })
}


//get group chat
export const useWithoutGroupStudents = (id) => {
    return useQuery({
        queryKey: ['withoutGroupStudents'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/group/without/`)
                .then((res) => res.data.students)
    })
}


//add group
export const useAddGroup = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .post(`http://localhost:5001/group/`, data)
                .then((res) => res.data)
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['groups'] })
        }
    })
}

//send message in group
export const useSendMessage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .post(`http://localhost:5001/chat/send`,data)
                .then((res) => res.data)
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['chat'] })
        }
    })
}