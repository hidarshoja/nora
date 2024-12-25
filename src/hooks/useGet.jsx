import { useQuery } from '@tanstack/react-query'
import axiosClient from '../axios-client'

const useGet = (array, url) => {
    const query = useQuery({
        queryKey: array,
        queryFn: () => axiosClient.get(url),
      // staleTime: 300000, // Setting staleTime to 0 to make the data stale immediately after fetching
       // refetchInterval: 30000, // Refetch every 30 seconds
    })

    return query
}

export default useGet