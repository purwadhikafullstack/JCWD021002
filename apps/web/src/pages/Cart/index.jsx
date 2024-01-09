/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Text,
  Box,
  HStack,
  Image,
  Flex,
  Button,
  Spacer,
  VStack,
  Stack,
  Checkbox,
  Heading,
  Input,
  InputLeftElement,
  InputGroup,
} from '@chakra-ui/react';
import { IconChevronLeft } from '@tabler/icons-react';
// import './Home.css';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BottomBar } from '../../components/BottomBar';
export const Cart = ({ handleWebSize, size }) => {
  return (
    <Box
      p="0"
      pb="110px"
      w={{ base: '100vw', md: size }}
      h={'fit-content'}
      transition="width 0.3s ease"
    >
      <Flex
        position={'sticky'}
        top={0}
        bgColor="white"
        zIndex={99}
        // top={{ base: '20px', lg: '-30px' }}
        px={'20px'}
        h={'10vh'}
        justify={'space-between'}
        align={'center'}
      >
        <Image src={LogoGroceria} h={'30px'} />
        <ResizeButton
          webSize={size}
          handleWebSize={handleWebSize}
          color={'black'}
        />
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
      >
        <Heading size="md">Keranjang</Heading>
      </Flex>
      <Flex
        flexDirection="column"
        gap={2}
        p={4}
      >
        <Text fontWeight="bold">My Orders</Text>
        <Flex justifyContent="space-between" gap={5}>
          <Checkbox colorScheme="green" defaultChecked />
          <Box w="7em" h="5em" background="red"></Box>
          <Stack w="full">
            <Text>Product Name</Text>
            <Text>Rp. 20.000</Text>
            <Flex>
              <Button
                h="30px"
                // onClick={handleDecrement}
                variant="outline"
                color="black"
              >
                -
              </Button>
              <Text color="black" mx="10px" fontSize="lg">
                1
              </Text>
              <Button
                h="30px"
                // onClick={handleIncrement}
                variant="outline"
                color="black"
              >
                +
              </Button>
            </Flex>
          </Stack>
        </Flex>
      </Flex>
      <Flex position={'fixed'} bottom={0} w={{ base: 'full', md: size }}>
      <Flex
      justify={'space-between'}
      w={'full'}
      bgColor={'white'}
      p={'20px'}
      boxShadow={'0px -8px 8px -14px rgba(0,0,0,1)'}
    >
      <Checkbox colorScheme="green">Semua</Checkbox>
      <Flex gap={2} alignItems='center' h='full'>
        <Text>Total</Text>
        <Text fontSize='13pt' fontWeight='bold'>Rp. 10000</Text>
        <Button background='green.700' color='white'>Checkout</Button>
      </Flex>
    </Flex>
      </Flex>
    </Box>
  );
};
