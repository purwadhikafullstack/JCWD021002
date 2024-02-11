/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
  useDisclosure,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useWebSize } from '../../provider.websize';
import { IoIosArrowDown } from 'react-icons/io';
import { PiMapPinLine } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../../scrollbar.css';
import { ModalLocatiom } from './modalLocation';
import { DrawerLoc } from './drawerLocation';

export const MenuLocation = () => {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const { size } = useWebSize();
  const [drawerType, setDrawerType] = useState(null);
  const [address, setAddress] = useState();

  const location = useSelector((state) => state?.addressReducer?.address);

  const userId = useSelector((state) => state.AuthReducer?.user?.id);

  const handleClick = (type) => {
    if (drawerType === type && isDrawerOpen) {
      // Jika tombol di-klik lagi dan drawer sudah terbuka, tutup drawer
      onDrawerClose();
    } else {
      // Jika tombol di-klik pertama kali atau drawer sedang tertutup, buka drawer
      setDrawerType(type);
      onDrawerOpen();
    }
  };
  const getAddress = async (userId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/address/getAddress/${userId}`,
      );
      setAddress(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userId) {
      getAddress(userId);
    }
  }, [userId]);

  return (
    <Flex w={'full'}>
      <Flex
        color={size == '500px' ? 'white' : 'colors.primary'}
        gap={2}
        align={'center'}
        cursor={'pointer'}
        fontSize={'14px'}
        minW={size == '500px' ? '90%' : 'fit-content'}
        onClick={() =>
          handleClick(size == '500px' ? 'DrawerLoc' : 'ModalLocatiom')
        }
      >
        <PiMapPinLine size={'18px'} />
        <Flex gap={1.5}>
          <Text fontWeight={400}>DIkirim ke</Text>
          <Text fontWeight={600}>
            {location?.latitude
              ? `${location?.City?.city ? location?.City?.city : ''}${
                  location?.City?.Province?.province
                    ? `, ${location?.City?.Province?.province}`
                    : ''
                }`
              : '. . .'}
          </Text>
        </Flex>
        <IoIosArrowDown size={'16px'} />
      </Flex>

      {isDrawerOpen && (
        <Flex>
          {drawerType === 'ModalLocatiom' && (
            <ModalLocatiom
              isOpen={isDrawerOpen}
              onClose={onDrawerClose}
              address={address}
              onOpen={onDrawerOpen}
            />
          )}
          {drawerType === 'DrawerLoc' && (
            <DrawerLoc
              isOpen={isDrawerOpen}
              onClose={onDrawerClose}
              address={address}
            />
          )}
        </Flex>
      )}
    </Flex>
  );
};



