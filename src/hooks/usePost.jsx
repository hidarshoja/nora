import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosClient from '../axios-client'

const usePost = (url, keys) => {
    const queryClient = useQueryClient()

    const mutate = useMutation({
        mutationFn: (body) => axiosClient.post(url, body),
        onSuccess: () => queryClient.invalidateQueries(keys),
    })

    return mutate
}

export default usePost