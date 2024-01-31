/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Flex,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { useWebSize } from '../../provider.websize';
import { IoIosArrowDown } from 'react-icons/io';
import { PiMapPinLine } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import '../../scrollbar.css';
import { CiCirclePlus } from 'react-icons/ci';
import { FaCheck } from 'react-icons/fa';
import { setAddress } from '../../redux/reducer/addressReducer';
import { useNavigate } from 'react-router-dom';
import { LoginModal } from '../LoginModal';

export const DrawerLocation = () => {
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
        `http://localhost:8000/api/address/getAddress/${userId}`,
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

function ModalLocatiom({ isOpen, onClose, address }) {
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex w={'full'} direction={'column'} gap={5}>
              {address?.map((item, index) => {
                return (
                  <Flex
                    key={index}
                    bgColor={'white'}
                    boxShadow={'base'}
                    p={'15px'}
                    borderRadius={'10px'}
                    direction={'column'}
                    gap={2}
                    cursor={'pointer'}
                    // onClick={() => handleClick(item)}
                  >
                    <Flex gap={2}>
                      <Text fontWeight={600}>{item?.recipientNames}</Text>
                      <Text
                        fontSize={'12px'}
                        fontWeight={300}
                        display={'flex'}
                        alignItems={'center'}
                      >
                        |
                      </Text>
                      <Text>{item?.recipientsMobileNumber}</Text>
                    </Flex>
                    <Flex direction={'column'} gap={1}>
                      <Text fontSize={'14px'}>{item?.addressLine}</Text>
                      <Text>{`${item?.City?.city.toUpperCase()}, ${item?.City?.Province?.province.toUpperCase()}`}</Text>
                    </Flex>
                    {item.isMain == 1 ? (
                      <Flex>
                        <Text
                          border={'1px solid'}
                          borderColor={'colors.quaternary'}
                          color={'colors.quaternary'}
                          px={'5px'}
                          fontSize={'12px'}
                          fontWeight={600}
                        >
                          Utama
                        </Text>
                      </Flex>
                    ) : (
                      <></>
                    )}
                  </Flex>
                );
              })}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" w={'full'}>
              Pilih Alamat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function DrawerLoc({ isOpen, onClose, address, onOpen }) {
  const btnRef = React.useRef();
  const { size } = useWebSize();
  const [selectedItem, setSelectedItem] = useState();
  const [active, setActive] = useState();
  const dispatch = useDispatch();
  const location = useSelector((state) => state?.addressReducer?.address);
  const isLogin = useSelector((state) => state.AuthReducer.isLogin);
  const navigate = useNavigate();
  const {
    isOpen: isModalOpen,
    onOpen: onMoldaOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const handleClick = () => {
    onClose();
    dispatch(setAddress(selectedItem));
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          w={size}
          m={'auto'}
          h={'90vh'}
          borderRadius={'14px 14px 0 0'}
          className="hide-scrollbar"
          // bgColor={'colors.secondary'}
        >
          <DrawerHeader>Pilih Alamat Pengiriman</DrawerHeader>

          <DrawerBody>
            <Flex w={'full'} direction={'column'} gap={5}>
              {address?.map((item, index) => {
                return (
                  <Flex
                    key={index}
                    bgColor={'white'}
                    boxShadow={'base'}
                    p={'15px'}
                    borderRadius={'10px'}
                    direction={'column'}
                    gap={2}
                    cursor={'pointer'}
                    onClick={() => {
                      setSelectedItem(item);
                      if (active != item?.id) {
                        setActive(item?.id);
                      } else if (active == item?.id) {
                        setActive();
                      }
                    }}
                  >
                    <Flex justify={'space-between'}>
                      <Flex gap={2}>
                        <Text fontWeight={600}>{item?.recipientNames}</Text>
                        <Text
                          fontSize={'12px'}
                          fontWeight={300}
                          display={'flex'}
                          alignItems={'center'}
                        >
                          |
                        </Text>
                        <Text>{item?.recipientsMobileNumber}</Text>
                      </Flex>
                      <IconButton
                        isRound={true}
                        variant="outline"
                        // colorScheme="teal"
                        aria-label="Done"
                        fontSize="10px"
                        icon={
                          selectedItem ? (
                            active == item.id ? (
                              <FaCheck />
                            ) : (
                              <></>
                            )
                          ) : location.id == item.id ? (
                            <FaCheck />
                          ) : active == item?.id ? (
                            <FaCheck />
                          ) : (
                            <></>
                          )
                        }
                        color={'teal'}
                        border={'1px solid teal'}
                        size={'xs'}
                      />
                    </Flex>
                    <Flex direction={'column'} gap={1}>
                      <Text fontSize={'14px'}>{item?.addressLine}</Text>
                      <Text>{`${item?.City?.city.toUpperCase()}, ${item?.City?.Province?.province.toUpperCase()}`}</Text>
                    </Flex>
                    {item.isMain == 1 ? (
                      <Flex>
                        <Text
                          border={'1px solid'}
                          borderColor={'colors.quaternary'}
                          color={'colors.quaternary'}
                          px={'5px'}
                          fontSize={'12px'}
                          fontWeight={600}
                          borderRadius={'5px'}
                        >
                          Alamat Utama
                        </Text>
                      </Flex>
                    ) : (
                      <></>
                    )}
                  </Flex>
                );
              })}
              {/* <Link to={'/profile/detail/address/add'}> */}
              <Button
                w={'full'}
                h={'50px'}
                display={'flex'}
                justifyContent={'space-between'}
                bgColor={'colors.greenBg'}
                color={'colors.primary'}
                onClick={
                  isLogin
                    ? () =>
                        navigate('/profile/detail/address/add?fromPage=/', {
                          state: { onOpen: onOpen },
                        })
                    : onMoldaOpen
                }
              >
                Tambah Alamat
                <CiCirclePlus size={'24px'} />
              </Button>
              {/* </Link> */}
            </Flex>
          </DrawerBody>
          <LoginModal isOpen={isModalOpen} onClose={onModalClose} />

          <DrawerFooter bgColor={'white'} boxShadow={'dark-lg'}>
            <Button
              bgColor={'colors.primary'}
              color={'white'}
              w={'full'}
              onClick={handleClick}
            >
              Pilih Alamat
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
