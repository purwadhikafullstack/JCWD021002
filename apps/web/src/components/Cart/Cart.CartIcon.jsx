import { useState, useEffect } from 'react';
import { Box, Icon, Text } from '@chakra-ui/react';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import axios from 'axios';
import { useSelector } from 'react-redux';

const calculateTotalQuantity = (carts) => {
  return carts.reduce((total, cartItem) => total + cartItem.totalQuantity, 0);
};

export const CartIcon = () => {
  const user = useSelector((state) => state.AuthReducer.user);
  // const token = localStorage.getItem('token');
  const [carts, setCarts] = useState([]);
  const fetchCarts = async (userId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart/${userId}`,
      );
      setCarts(response?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchCarts(user.id);
    }
  }, [user]);

  const totalQuantity = calculateTotalQuantity(carts);

  return (
    <Box position="relative">
      <Icon as={HiOutlineShoppingCart} boxSize={6} />
      {totalQuantity > 0 && (
        <Box
          position="absolute"
          top="-2"
          right="-2"
          bg="red.500"
          color="white"
          borderRadius="full"
          w={'18px'}
          h={'18px'}
          padding={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="sm"
          cursor={'pointer'}
        >
          <Text fontSize={'12px'}>{totalQuantity}</Text>
        </Box>
      )}
    </Box>
  );
};
