import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useMenu = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: menu = [], // Default to an empty array if data is undefined
    isLoading: loading, // Changed from isPending to isLoading for proper React Query usage
    refetch,
  } = useQuery({
    queryKey: ['menu'],
    queryFn: async () => {
      const res = await axiosPublic.get('/menus');
      // console.log(res.data); // Debug: Check if data is received correctly
      return res.data;
    },
  });

  return [menu, loading, refetch];
};

export default useMenu;
