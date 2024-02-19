import { useState, useEffect } from 'react';
import { Box, Icon, Text } from '@chakra-ui/react';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import axios from 'axios';
import { useSelector } from 'react-redux';

const calculateTotalQuantity = (cartDetails) => {
  if (!Array.isArray(cartDetails) || cartDetails.length === 0) {
    return 0;
  }

  const totalQuantity = cartDetails.reduce(
    (total, cartItem) => total + (cartItem?.quantity || 0),
    0
  );

  return totalQuantity;
};

export const CartIcon = () => {
  const user = useSelector((state) => state.AuthReducer.user);
  const token = localStorage.getItem("token");
  const location = useSelector((state) => state?.addressReducer?.address);
  const userCityId =  location?.City?.id;
  // console.log('cek', userCityId);
  const [carts, setCarts] = useState([]);
  const cartDetail = carts[0]?.CartDetails;
  
  // const token = localStorage.getItem('token');
  const fetchCarts = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart/${userCityId}`,
        {headers: {
          Authorization: `Bearer ${token}`,
        }}
      );

      setCarts(response?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  const totalQuantity = calculateTotalQuantity(cartDetail);
  useEffect(() => {
      fetchCarts(token);
  }, [user, totalQuantity]);


  return (
    <Box position="relative">
      <Icon as={HiOutlineShoppingCart} boxSize={6} />
      {carts.length > 0 && (
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
