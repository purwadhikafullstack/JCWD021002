import { useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import axios from 'axios';

const CartTotalSelectedMotion = motion(Flex);

export const CartTotalSelected = ({ user, size, selectedItems, showToast, isScrolled, deleteCartProduct }) => {
  const control = useAnimation();
  const scrollTimeoutRef = useRef(null);
  const [resetAnimation, setResetAnimation] = useState(false);
  const scrollDirectionRef = useRef(null);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
  
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
  
    scrollDirectionRef.current = scrollPosition;
  
    // Reset animation after 500ms
    setTimeout(() => {
      if (resetAnimation) {
        control.start({
          translateY: 0,
          transition: { duration: 0.5, ease: 'easeInOut' },
        });
        setResetAnimation(false);
      }
    }, 500);
  };
  

useEffect(() => {
  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [control, resetAnimation]);


  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [control]);

  return (
    <CartTotalSelectedMotion
      hidden={size === '500px' ? false : true}
      backgroundColor="white"
      px={4}
      py={3}
      display={selectedItems.length > 0 ? 'flex' : 'none'}
      position="sticky"
      top={'10vh'}
      borderBottom="1px solid rgba(128, 128, 128, 0.3)"
      zIndex="7"
      w="full"
      animate={control}
      justifyContent="space-between"
      alignItems="center"
      boxShadow={isScrolled && control.target === 0 ? '0px 4px 4px -2px rgba(0, 0, 0, 0.1)' : 'none'}
    >
      <Text fontWeight="semibold">{selectedItems.length} produk terpilih</Text>
      {/* {selectedItems} */}
      <Button
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
    </CartTotalSelectedMotion>
  );
};
