import {
    Box,
    Button,
    Flex,
    HStack,
    Icon,
    IconButton,
    Image,
    Stack,
    Text,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    Heading,
    VStack,
    Divider,
  } from '@chakra-ui/react';
  import { PiMapPinFill } from 'react-icons/pi';
  import { FaCheck } from 'react-icons/fa';
  import { BsTelephoneFill } from 'react-icons/bs';
  import { IoIosArrowForward } from 'react-icons/io';
  import { LiaBoxSolid } from 'react-icons/lia';
  import { IconChevronLeft } from '@tabler/icons-react';
  import { calculateDiscountPrice } from '../../utils/calculateDiscountPrice';
  import { Link, useLocation } from 'react-router-dom';
  
  import Voucher from '../../assets/voucher.png';
  import { CheckoutHeader } from '../../components/Checkout/Checkout.Header';
  import { CheckoutSidebar } from '../../components/Checkout/Checkout.Sidebar';
  import angkaRupiahJs from '@develoka/angka-rupiah-js';
  import { useSelector } from 'react-redux';
  import { useEffect, useState } from 'react';
  import axios from 'axios';
  import { useWebSize } from '../../provider.websize';
  import { VoucherPage } from '../Voucher/Voucher';
  import { useDispatch } from 'react-redux';
  import { setAddress } from '../../redux/reducer/addressReducer';
  import { groupBy } from 'lodash';
  import { ListProductOrder } from './listProductOrder';
  import '../../scrollbar.css';
  import { CheckoutAddress } from '../../components/Checkout/Checkout.Address';
  

export const CheckoutVoucher = (size, order, setDiscountVoucher, fetchOrder) => {
    return (
        <HStack
        w='full'
          cursor="pointer"
          justifyContent="space-between"
          h="3.5em"
          p={4}
          pl={5}
          pr={1}
          //   spacing={0}
          background="white"
          hidden={size == '500px' ? true : false}
        >
          <Flex alignItems="center" gap={2}>
            <Icon as={Image} src={Voucher} w={'43px'} h="22px" />
            <Text>Voucher Groceria</Text>
          </Flex>
          <VoucherPage order={order} setDiscountVoucher={setDiscountVoucher} fetchOrder={fetchOrder} />
        </HStack>
    )
}