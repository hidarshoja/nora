import { useQuery } from '@tanstack/react-query'
import axiosClient from '../axios-client'

const useGet = (array, url) => {
    const { data,isLoading } = useQuery({
        queryKey: array,
        queryFn: () => axiosClient.get(url),
        staleTime: 1000 * 60 * 5
    })

    return {data,isLoading}
}

export default useGet