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

export const DrawerAddress = ( {onClose, isOpen, userAddress} ) => {
    return (
        <Drawer
          placement="right"
          onClose={onClose} isOpen={isOpen}
          size="md"
        >
          <DrawerOverlay />
          {/* <DrawerContent width="500px" mx="auto"> */}

          <DrawerContent
            w="500px"
            h="full"
            mx="auto"
            pos="absolute"
            left={0}
            transform="translateX(-50%)"
          >
            <DrawerHeader borderBottom="2px solid green" textAlign="center">
              <Flex justifyContent="space-between" alignItems="center">
                <Flex gap={0} alignItems="center">
                  <IconButton
                    variant="ghost"
                    icon={<IconChevronLeft />}
                    onClick={onClose}
                    _hover={{ color: 'gray.600', opacity: 0.9 }}
                    transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
                  />
                  <Heading size="sm">Daftar Alamat</Heading>
                </Flex>
                <Link
                  to={`/profile/detail/address/add?fromPage=${encodeURIComponent(
                    location,
                  )}`}
                >
                  <Text fontSize="md" color="green.700">
                    Tambah Alamat
                  </Text>
                </Link>
              </Flex>
            </DrawerHeader>
            <DrawerBody
              pt={5}
              display={'flex'}
              flexDirection={'column'}
              gap={5}
            >
              {userAddress?.map((item, index) => {
                return (
                  <Flex
                    key={index}
                    w="full"
                    pt={5}
                    px={4}
                    pb={4}
                    //   pr={4}
                    borderWidth={1}
                    //   borderColor="green.600"
                    borderColor="gray"
                    //   color="green.600"
                    rounded={12}
                    spacing={4}
                    onClick={() => {
                      setSelectedItem(item);
                      // setCityIdUser()
                      if (active != item?.id) {
                        setActive(item?.id);
                      } else if (active == item?.id) {
                        setActive();
                      }
                    }}
                    direction={'column'}
                    gap={5}
                    cursor={'pointer'}
                  >
                    <Flex justify={'space-between'}>
                      <Box>
                        <Text fontWeight="semibold">
                          {item?.recipientNames}
                        </Text>
                        <Text fontSize="sm">
                          {item?.recipientsMobileNumber}
                        </Text>
                        <Text flexWrap="wrap" fontSize="sm">
                          {item?.addressLine}
                        </Text>
                      </Box>
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

                    <Button
                      w="full"
                      colorScheme="green"
                      color="black"
                      fontWeight="semibold"
                      borderColor="gray"
                      rounded={10}
                      variant="outline"
                    >
                      Ubah Alamat
                    </Button>
                  </Flex>
                );
              })}
            </DrawerBody>
            <DrawerFooter>
              <Button
                w="full"
                background="green.700"
                color="white"
                _hover={{ background: 'green.900', opacity: 0.9 }}
                transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
                onClick={() => handleSelectAddress(selectedItem)}
              >
                Pilih Alamat
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
    )
}