/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  Button,
  Flex,
  Select,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  FormControl,
  Input,
} from '@chakra-ui/react';
import { useWebSize } from '../../provider.websize';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BsBuildingAdd } from 'react-icons/bs';

export const AddStore = ({ setUpdate }) => {
  const { size } = useWebSize();
  const btnRef = React.useRef();
  const [province, setProvince] = useState();
  const [provinceId, setProvinceId] = useState();
  const [cities, setCities] = useState();
  const [cityId, setCityId] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure({
    onClose: () => {
      formik.resetForm();
    },
  });

  const handleProvinceChange = (event) => {
    setProvinceId(event.target.value);
  };
  const handleCityChange = (event) => {
    setCityId(event.target.value);
  };

  const getProvince = async () => {
    try {
      const res = await axios.get(
        'http://localhost:8000/api/address/getProvince',
      );
      setProvince(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getCity = async (provinceId) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/city/getCity?provinceId=${provinceId}`,
      );
      setCities(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addStore = async (storeName, cityId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/store/add?cityId=${cityId}`,
        {
          storeName,
        },
      );
      setUpdate(true);
      onClose();
      formik.resetForm();
      setProvinceId();
      setCityId();
      toast.success('Store berhasil ditambahkan');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProvince();
  }, []);
  useEffect(() => {
    if (provinceId) {
      getCity(provinceId);
    }
  }, [provinceId]);

  const formik = useFormik({
    initialValues: {
      storeName: '',
    },
    onSubmit: (values) => {
      addStore(values.storeName, cityId);
    },
  });
  return (
    <Flex>
      <Button
        onClick={onOpen}
        size={'xm'}
        p={'5px 10px'}
        borderRadius={'50%'}
        bgColor={'colors.primary'}
      >
        <BsBuildingAdd size={'20px'} color="white" />
      </Button>

      <Drawer
        isOpen={isOpen}
        placement={size == '500px' ? 'bottom' : 'right'}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          sx={
            size == '500px'
              ? { w: size, h: '80vh' }
              : { maxW: '35vw', h: 'full' }
          }
          borderRadius={size == '500px' ? '20px 20px 0 0' : 0}
          p={'30px'}
          m={'auto'}
        >
          <DrawerCloseButton />
          <DrawerHeader display={'flex'} justifyContent={'center'}>
            Toko Baru
          </DrawerHeader>
          <form
            style={{ width: '100%', height: '100%' }}
            onSubmit={formik.handleSubmit}
          >
            <DrawerBody>
              <Flex h={'fit-content'} bgColor={'white'}>
                <FormControl>
                  <Flex w={'full'} direction={'column'} gap={1}>
                    <Flex bgColor={'white'} py={'10px'}>
                      <Input
                        type="name"
                        variant={'unstyled'}
                        placeholder="Nama Toko*"
                        name="storeName"
                        value={formik.values.storeName}
                        onChange={formik.handleChange}
                      />
                    </Flex>
                    <Flex py={'10px'}>
                      <Select
                        variant="unstyled"
                        placeholder={'Provinsi'}
                        value={provinceId}
                        onChange={handleProvinceChange}
                      >
                        {province?.map((item, index) => {
                          return (
                            <option value={item?.id} key={index}>
                              {item?.province}
                            </option>
                          );
                        })}
                      </Select>
                    </Flex>
                    <Flex py={'10px'}>
                      <Select
                        placeholder={'Kota / Kabupaten'}
                        value={cityId}
                        onChange={handleCityChange}
                        variant="unstyled"
                      >
                        {cities?.map((item, index) => {
                          return (
                            <option
                              value={item.id}
                              key={index}
                              style={{ backgroundColor: 'transparent' }}
                            >
                              {item?.city}
                            </option>
                          );
                        })}
                      </Select>
                    </Flex>
                  </Flex>
                </FormControl>
              </Flex>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit">
                Save
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
