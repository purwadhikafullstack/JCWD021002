/* eslint-disable react/prop-types */
import { useState } from 'react';
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
  Flex,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import '../../scrollbar.css';
import { CiCirclePlus } from 'react-icons/ci';
import { FaCheck } from 'react-icons/fa';
import { setAddress } from '../../redux/reducer/addressReducer';
import { useNavigate } from 'react-router-dom';
import { LoginModal } from '../LoginModal';

export const ModalLocatiom = ({ isOpen, onClose, address }) => {
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
    window.location.reload();
  };
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pilih Alamat Pengiriman</ModalHeader>
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
                    ? () => navigate('/profile/detail/address/add?fromPage=/')
                    : onMoldaOpen
                }
              >
                Tambah Alamat
                <CiCirclePlus size={'24px'} />
              </Button>
              {/* </Link> */}
            </Flex>
            <LoginModal isOpen={isModalOpen} onClose={onModalClose} />
          </ModalBody>

          <ModalFooter>
            <Button
              bgColor={'colors.primary'}
              color={'white'}
              w={'full'}
              onClick={handleClick}
            >
              Pilih Alamat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
