import { useQuery, useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import axios from "axios";

axios.defaults.withCredentials = true;

//get meets
export const useMeetings = () => {
    return useQuery({
        queryKey: ['Meetings'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/meeting/`)
                .then((res) => res.data.meetings)
    })
}

//get meets percenatge
export const useMeetingPercenatge = (id) => {
    return useQuery({
        queryKey: ['MeetingPercenatge'],
        queryFn: () =>
            axios
                .get(`http://localhost:5001/meeting/percentage/${id}`)
                .then((res) => res.data.students)
    })
}

//add meeting
export const useAddMeeting = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data) => {
            return axios
                .post(`http://localhost:5001/meeting/`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => res.data)
        }, onSettled: (res) => {
            queryClient.invalidateQueries({ queryKey: ['Meetings'] })
            queryClient.invalidateQueries({ queryKey: ['MeetingPercenatge'] })
        }
    })
}