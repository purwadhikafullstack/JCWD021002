import { Button, Checkbox, Flex, Text, useToast } from '@chakra-ui/react';
import angkaRupiahJs from '@develoka/angka-rupiah-js';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CartFooter = ({
  size,
  userId,
  carts,
  selectedItems,
  handleCheckboxAllChange,
  quantities,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);

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
        return total + item.price * quantities[productStockId];
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
        await axios.post(`${import.meta.env.VITE_API_URL}/checkout`, {
          userId,
          selectedItems,
        });

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
    <Flex position='fixed' bottom={0} w={{ base: '100%', md: size }}>
      <Flex
        justify='space-between'
        w='full'
        bgColor='white'
        p={4}
        boxShadow='0px -4px 4px -2px rgba(0, 0, 0, 0.1)'
      >
        <Checkbox
          colorScheme='green'
          isChecked={isAllSelected}
          onChange={() => handleCheckboxAllChange()}
          isDisabled={!carts || carts.length === 0}
        >
          Semua
        </Checkbox>

        <Flex gap={2} alignItems='center' h='full'>
          <Text>Total</Text>
          <Text fontSize='lg' fontWeight='bold' color='tomato'>
            {angkaRupiahJs(totalPrice, { formal: false })}
          </Text>
          <Button
            isDisabled={!selectedItems || selectedItems.length === 0 }
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
    </Flex>
  );
};