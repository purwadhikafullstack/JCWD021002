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
  FormControl,
  Input,
} from '@chakra-ui/react';
import { useWebSize } from '../../provider.websize';
import { useFormik } from 'formik';
import axios from 'axios';

export const EditStore = ({isOpen, onClose, selectedItems, setUpdate}) => {
  const { size } = useWebSize();
  const btnRef = React.useRef();
  const [province, setProvince] = useState();
  const [provinceId, setProvinceId] = useState();
  const [cities, setCities] = useState();
  const [cityId, setCityId] = useState();
  const [storeId, setStoreId] = useState();

  const handleProvinceChange = (event) => {
    setProvinceId(event.target.value);
  };
  const handleCityChange = (event) => {
    setCityId(event.target.value);
  };
  const getProvince = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/address/getProvince`,
      );
      setProvince(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getCity = async (provinceId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/city/getCity?provinceId=${provinceId}`,
      );
      setCities(res?.data?.data);
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

  useEffect(() => {
    if (selectedItems) {
      formik.resetForm();
      formik.setValues({
        name: selectedItems?.name || '',
      });
      setProvinceId(selectedItems?.City?.Province?.id);
      setCityId(selectedItems?.city_idcity);
      setStoreId(selectedItems?.id);
      setUpdate(false);
    }
  }, [selectedItems]);

  const changeStore = async (name, storeId, cityId) => {
    try {
      const res = await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/store/change?storeId=${storeId}&cityId=${cityId}`,
        {
          name,
        },
      );
      if (res) {
        setUpdate(true);
        onClose();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: selectedItems?.name || '',
    },
    onSubmit: (values) => {
      changeStore(values.name, storeId, cityId);
    },
  });
  return (
    <Flex w={"full"}>
      <Drawer isOpen={isOpen} placement={size == '500px' ? 'bottom' : 'right'} onClose={onClose} finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          sx={size == '500px' ? { w: size, h: '80vh' } : { maxW: '35vw', h: 'full' }}
          maxW={size == '500px' ? '500px' : '50vw'}
          borderRadius={size == '500px' ? '20px 20px 0 0' : 0} m={'auto'} p={'30px'}
        >
          <DrawerCloseButton />
          <DrawerHeader display={'flex'} justifyContent={'center'}>
            Ubah Toko
          </DrawerHeader>
          <form
            style={{ width: '100%', height: '100%' }} onSubmit={formik.handleSubmit}
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
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                      />
                    </Flex>
                    <Flex py={'10px'}>
                      <Select variant="unstyled" placeholder={'Provinsi'} value={provinceId} onChange={handleProvinceChange}
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
                      <Select placeholder={'Kota / Kabupaten'} value={cityId} onChange={handleCityChange} variant="unstyled">
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
