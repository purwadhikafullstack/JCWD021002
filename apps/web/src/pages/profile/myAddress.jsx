/* eslint-disable react/prop-types */
import { Flex, Text, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';
// import { MyButton } from '../../components/Button';

import { useWebSize } from '../../provider.websize';
import { AddAddress } from './addAddress';
import { EditAddress } from './editAddress';
import { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import axios from 'axios';

export const MyAddress = () => {
  const { size } = useWebSize();
  const [selectedItem, setSelectedItem] = useState();
  const [update, setUpdate] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = useState();
  const userId = useSelector((state) => state.AuthReducer?.user?.id);
  // {
  //   onClose: () => {
  //     formik.resetForm();
  //   },
  // }

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
    getAddress(userId);
  }, [update, userId]);

  const handleClick = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  return (
    <Flex w={size} bgColor={'#F8F9FAFF'}>
      <Flex w={'full'} direction={'column'}>
        <Flex
          align={'center'}
          w={size}
          mb={'40px'}
          h={'60px'}
          p={'10px 30px'}
          boxShadow={'base'}
          position={'fixed'}
          bgColor={'white'}
        >
          <Flex position={'absolute'}>
            <Link to={'/profile/detail'}>
              <MdArrowBackIos />
            </Link>
          </Flex>
          <Flex w={'full'} justify={'center'}>
            <Text fontWeight={600} fontSize={'16px'}>
              Alamat
            </Text>
          </Flex>
        </Flex>

        <Flex w={'full'} direction={'column'} gap={5} px={'30px'} mt={'80px'}>
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
                onClick={() => handleClick(item)}
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

        <EditAddress
          selectedItem={selectedItem}
          setUpdate={setUpdate}
          isOpen={isOpen}
          onClose={onClose}
        />

        <Flex w={'full'} p={'30px'} justify={'center'}>
          <AddAddress setUpdate={setUpdate}/>
        </Flex>
      </Flex>
    </Flex>
  );
};
