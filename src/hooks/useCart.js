import React, { useContext } from 'react';
import { AuthContext } from '../context/Authprovider';
import { useQuery } from '@tanstack/react-query';

function useCart() {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('Access-token');
  const {
    refetch,
    data: response = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['carts', user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://127.0.0.1:3001/api/v1/carts?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      console.log(data); // Check the structure of data
      return data;
    },
  });

  return [response.data || [], refetch, isLoading, isError];
}

export default useCart;
