import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosClient from '../axios-client'

const useDelete = (url, keys) => {
    const queryClient = useQueryClient()

    const mutate = useMutation({
        mutationFn: (slug) => axiosClient.delete(`${url}/${slug}`),
        onSuccess: () => queryClient.invalidateQueries(keys),
    })

    return mutate
}

export default useDelete