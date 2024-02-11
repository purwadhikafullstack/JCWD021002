/* eslint-disable react/prop-types */
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
} from '@chakra-ui/react';
import { PiMapPinFill } from 'react-icons/pi';
import { FaCheck } from 'react-icons/fa';
import { BsTelephoneFill } from 'react-icons/bs';
import { IoIosArrowForward } from 'react-icons/io';
import { LiaBoxSolid } from 'react-icons/lia';
import { IconChevronLeft } from '@tabler/icons-react';
import { calculateDiscountPrice } from '../../utils/calculateDiscountPrice';
import { Link, useLocation } from 'react-router-dom';
import { DrawerAddress } from './Checkout.DrawerAddress';
import { useState } from 'react';

export const CheckoutAddress = ({ address, selectedAddres, setSelectedAddress }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log({ address });
  return (
    <Stack
      roundedTopLeft={10}
      roundedTopRight={10}
      w="full"
      p={4}
      pl={5}
      pr={2}
      background="white"
      cursor="pointer"
      // onClick={onOpenAddressDrawer}
    >
      <Text>Alamat Pengiriman</Text>
      {selectedAddres ? (
        <Flex flexDirection="column" onClick={() => onOpen()}>
          <Flex alignItems="center" gap={1}>
            <Icon as={PiMapPinFill} boxSize={5} color="green.600" />
            <Text fontWeight="semibold">{selectedAddres?.recipientNames}</Text>
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            pr={0}
            mr={0}
          >
            <Text flexWrap="wrap" pl={5}>
              {selectedAddres?.addressLine}, {selectedAddres?.postalCode}
            </Text>
            <IconButton
              variant="ghost"
              _hover={{ color: 'black', opacity: 0.9 }}
              transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
              color="gray.600"
              icon={<IoIosArrowForward />}
            />
          </Flex>
        </Flex>
      ) : (
        <Flex flexDirection="column">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            pr={0}
            mr={0}
            onClick={() => onOpen()}
          >
            <Flex alignItems="center" gap={1}>
              <Icon as={PiMapPinFill} boxSize={5} color="green.600" />
              <Text flexWrap="wrap" pl={5}>
                Pilih alamat pengiriman
              </Text>
            </Flex>
            <IconButton
              variant="ghost"
              _hover={{ color: 'black', opacity: 0.9 }}
              transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
              color="gray.600"
              icon={<IoIosArrowForward />}
            />
          </Flex>
        </Flex>
      )}

      <DrawerAddress
        isOpen={isOpen}
        onClose={onClose}
        // onClose={() => setIsDrawerOpen(false)}
        userAddress={address}
        setSelectedAddress={setSelectedAddress}
      />
    </Stack>
  );
};
