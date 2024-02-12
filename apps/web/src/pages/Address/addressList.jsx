/* eslint-disable react/prop-types */
import { Flex, Text, useDisclosure, Button, Box } from '@chakra-ui/react';
import { EditAddress } from './editAddress';
import { useState, useEffect } from 'react';
// import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { CiCirclePlus } from 'react-icons/ci';
import { useNavigate, useOutletContext } from 'react-router-dom';
import DeleteAlert from '../../components/DeleteAlert';
import toast from 'react-hot-toast';
import { useWebSize } from '../../provider.websize';

export const AddressList = () => {
  const [selectedItem, setSelectedItem] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = useState();
  const userId = useSelector((state) => state.AuthReducer?.user?.id);
  const navigate = useNavigate();
  const [update, setUpdate] = useOutletContext();
  const { size } = useWebSize();

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

  const handleDeleteAddress = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/address/delete/${id}`);
      setUpdate(true);
      toast.success('Alamat berhasi di hapus');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Flex direction={'column'} px={size == '500px' ? '30px' : '200px'}>
      <Flex w={'full'} direction={'column'} gap={5} mt={'80px'}>
        {address?.map((item, index) => {
          return (
            <Flex
              key={index}
              bgColor={'white'}
              boxShadow={'base'}
              borderRadius={'10px'}
            >
              <Flex p={'15px'} direction={'column'} gap={2} w={'full'}>
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

              <Box w={'25%'} display={'flex'} p={'15px'} justifyContent={'end'}>
                <Flex
                  gap={1}
                  fontSize={'12px'}
                  align={'start'}
                  justify={'center'}
                >
                  <Button
                    variant={'unstyled'}
                    onClick={() => handleClick(item)}
                    size={'xm'}
                    borderRadius={'5px'}
                    p={'1px 8px'}
                    bgColor={'colors.tertiary'}
                    color={'white'}
                    fontWeight={300}
                  >
                    edit
                  </Button>
                  <DeleteAlert
                    btnValue={'delete'}
                    titleValue={'Hapus Store'}
                    mainValue={`Apakah anda yakin ingin menghapus alamat berikut: ${item?.addressLine}?`}
                    deleteAction={() => handleDeleteAddress(item?.id)}
                    style={{
                      color: 'colors.tertiary',
                      fontWeight: 400,
                      p: '2.5px 8px',
                      borderRadius: '5px',
                      size: 'xm',
                    }}
                    buttonActionValue={'Delete'}
                  />
                </Flex>
              </Box>
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

      <Button
        w={'full'}
        h={'50px'}
        display={'flex'}
        justifyContent={'space-between'}
        bgColor={'colors.greenBg'}
        color={'colors.primary'}
        onClick={() => navigate('/profile/detail/address/add')}
        my={'20px'}
      >
        Tambah Alamat
        <CiCirclePlus size={'24px'} />
      </Button>
    </Flex>
  );
};
