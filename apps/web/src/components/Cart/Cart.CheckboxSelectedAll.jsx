import { useEffect, useRef } from 'react';
import { Box, Button, Checkbox, Flex, Text } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import axios from 'axios';

const CartTotalSelectedMotion = motion(Flex);

export const CheckboxSelectedAll = ({ user, carts, selectedItems, showToast, isScrolled, deleteCartProduct, size, handleCheckboxAllChange }) => {
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

  const isAllSelected =
  selectedItems.length > 0 &&
  selectedItems.length === carts.length &&
  selectedItems.every((productStockId) =>
    carts.some((cart) => cart.productStock_idproductStock === productStockId)
  );

  return (
    <Flex
      roundedTopLeft={10}
      roundedTopRight={10}
      backgroundColor="white"
      px={4}
      py={3}
      display={size === '500px' ? 'none' : 'flex'}
      // position="sticky"
      // top={'10vh'}
      borderBottom="1px solid rgba(128, 128, 128, 0.3)"
      // zIndex="7"
      w="full"
      // animate={control}
      justifyContent="space-between"
      alignItems="center"
      boxShadow={isScrolled && control.target === 0 ? '0px 4px 4px -2px rgba(0, 0, 0, 0.1)' : 'none'}
    >
      
      <Checkbox
        // hidden={size === '500px' ? false : true}
          colorScheme='green'
          isChecked={isAllSelected}
          onChange={() => handleCheckboxAllChange()}
          // isDisabled={!carts || carts.length === 0}
        >
          
      <Text fontWeight="semibold">Pilih Semua ({selectedItems.length})</Text>
        </Checkbox>
      {/* {selectedItems} */}
      <Button
        hidden={isAllSelected ? false : true}

        onClick={() => deleteCartProduct(selectedItems)}
        size="xs"
        background="green.700"
        color="white"
        _hover={{ background: 'green.900', opacity: 0.9 }}
        transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
        fontWeight="bold"
      >
        Hapus
      </Button>
    </Flex>
  );
};
