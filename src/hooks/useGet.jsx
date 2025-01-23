import { useQuery } from '@tanstack/react-query'
import axiosClient from '../axios-client'

const useGet = (array, url, params = {}) => {
    const query = useQuery({
        queryKey: array,
        queryFn: () => axiosClient.get(url, {params}),
      // staleTime: 300000, // Setting staleTime to 0 to make the data stale immediately after fetching
       // refetchInterval: 30000, // Refetch every 30 seconds
    })

    return query
}

export default useGet