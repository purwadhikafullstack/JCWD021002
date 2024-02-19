/* eslint-disable react/prop-types */
import { Button, Checkbox, Flex, Heading, Text, useToast } from '@chakra-ui/react';
import angkaRupiahJs from '@develoka/angka-rupiah-js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateDiscountPrice } from '../../utils/calculateDiscountPrice';

export const CartSidebar = ({
  size,
  userId,
  carts,
  selectedItems,
  handleCheckboxAllChange,
  quantities,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [quantities, selectedItems]);

  const isAllSelected =
    selectedItems.length > 0 &&
    selectedItems.length === carts.length &&
    selectedItems.every((productStockId) =>
      carts.some((cart) => cart.productStock_idproductStock === productStockId)
    );

  const calculateTotalPrice = () =>
    selectedItems.reduce((total, productStockId) => {
      const item = carts.find(
        (cart) => cart.productStock_idproductStock === productStockId
      );

      if (item && item.price && quantities[productStockId]) {
        return total + calculateDiscountPrice(item?.price, item?.ProductStock?.Discounts) * quantities[productStockId];
      }

      return total;
    }, 0);

  const toast = useToast();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      toast({
        title: 'No items selected',
        description: 'Please select items before checking out.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    } else {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/checkout`, 
        {
          selectedItems,
        },
        {headers: {
          Authorization: `Bearer ${token}`,
        }});

        navigate('/cart/shipment');
      } catch (error) {
        console.error('Checkout failed:', error);
        toast({
          title: 'Checkout failed',
          description: 'An error occurred during the checkout process.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
      <Flex
        rounded={size === '500px' ? 0 : 10}
        // w='full'
        // w={{ base: '100vw', md: size }}
        bg='red'
        w={size === '500px' ? size : '20em'}
        position='sticky'
        h='fit-content'
        flexDirection={size === '500px' ? 'row' : 'column'}
        gap={4}
        bgColor="white"
        boxShadow={size === '500px' ? "0px -4px 4px -2px rgba(0, 0, 0, 0.1)" : 0}
        p={4}
      >
        <Checkbox
          hidden={size === '500px' ? false : true}
          colorScheme='green'
          isChecked={isAllSelected}
          onChange={() => handleCheckboxAllChange()}
          isDisabled={!carts || carts.length === 0}
        >
          Semua
        </Checkbox>
{/* <Box px={200} pt={3} hidden={size == '500px' ? true : false}> */}
            <Heading size="sm" hidden={size == '500px' ? true : false} >Ringkasan Belanja</Heading>
          {/* </Box> */}
        <Flex
          w='full'
          flexDirection={size === '500px' ? 'row' : 'column'}
          gap={2}
          alignItems='center'
          h='full'
          
        >
          <Flex
            w='full'
            justifyContent={size == '500px' ? 'flex-end' : 'space-between'}
            alignItems='center'
            h='full'
            gap={2}
          >
            <Text>Total</Text>
            <Text fontSize='lg' fontWeight='bold' color='tomato'>
              {angkaRupiahJs(totalPrice, { formal: false })}
            </Text>
          </Flex>
          <Button
            w='full'
            h='2.5em'
            isDisabled={!selectedItems || selectedItems.length === 0}
            background='green.700'
            color='white'
            onClick={handleCheckout}
            _hover={{ background: 'green.900', opacity: 0.9 }}
            transition='color 0.3s ease-in-out, opacity 0.3s ease-in-out'
          >
            Checkout
          </Button>
        </Flex>
      </Flex>
  );
};
