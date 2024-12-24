import { useMutation, useQueryClient } from '@tanstack/react-query'
import axiosClient from '../axios-client'

const useUpdate = (url, keys) => {
    const queryClient = useQueryClient()

    const mutate = useMutation({
        mutationFn: ({slug,body}) => axiosClient.patch(`${url}/${slug}`,body),
        onSuccess: () => queryClient.invalidateQueries(keys),
    })

    return mutate
}

export default useUpdate