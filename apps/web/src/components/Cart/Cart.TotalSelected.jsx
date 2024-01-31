import { useEffect, useRef } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import axios from 'axios';

const CartTotalSelectedMotion = motion(Flex);

export const CartTotalSelected = ({ user, selectedItems, showToast }) => {
  const control = useAnimation();
  const scrollTimeoutRef = useRef(null);

  const handleScroll = () => {
    control.start({
      translateY: '-100%',
      transition: { duration: 0.5, ease: 'easeInOut' },
    });

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      control.start({
        translateY: 0,
        transition: { duration: 0.5, ease: 'easeInOut' },
      });
    }, 500);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [control]);

  console.log( `${import.meta.env.VITE_API_URL}/cart/delete-product/${user.id}`,
  { data: { selectedItems } });
  const deleteSelectedCartProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/cart/delete-product/${user.id}`,
        {
          data: { productId }, // Assuming selectedItems is an array of product IDs
          headers: { 'Content-Type': 'application/json' }, // Specify the content type
        }
      );
  
      if (response.status === 200) {
        showToast('success', 'Item quantity deleted successfully!');
        await fetchCart(user.id);
      } else {
        console.error('Failed to delete items:', response.data);
        showToast('error', 'Failed to delete items');
      }
    } catch (err) {
      console.error('Error deleting items:', err);
      showToast('error', 'Error deleting items');
    }
  };

  return (
    <CartTotalSelectedMotion
      backgroundColor="white"
      px={4}
      py={3}
      display={selectedItems.length > 0 ? 'flex' : 'none'}
      position="sticky"
      top={'10vh'}
      boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.1)"
      zIndex="98"
      w="full"
      animate={control}
      justifyContent="space-between"
      alignItems="center"
    >
      <Text fontWeight="semibold">{selectedItems.length} produk terpilih</Text>
      {/* <Text color='green' fontWeight='bold'>Hapus</Text> */}
      {selectedItems}
      <Button
        onClick={()=>deleteSelectedCartProduct({selectedItems})}
        size="xs"
        background="green.700"
        color="white"
        _hover={{ background: 'green.900', opacity: 0.9 }}
        transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
        fontWeight="bold"
      >
        Hapus
      </Button>
    </CartTotalSelectedMotion>
  );
};
