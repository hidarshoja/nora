import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosClient from '../axios-client'

const usePost = (url, keys) => {
    const queryClient = useQueryClient()

    const mutate = useMutation({
        mutationFn: (body) => axiosClient.post(url, body),
        onSuccess: () => {
            // Refetch queries after mutation
            keys.forEach(key => {
                queryClient.refetchQueries([key])
                queryClient.invalidateQueries([key])
            })
        },
    })

    return mutate
}

export default usePost