import { useQuery } from '@tanstack/react-query'
import axiosClient from '../axios-client'

const useGet = (array, url) => {
    const query = useQuery({
        queryKey: array,
        queryFn: () => axiosClient.get(url),
        staleTime: 300000
    })

    return query
}

export default useGet