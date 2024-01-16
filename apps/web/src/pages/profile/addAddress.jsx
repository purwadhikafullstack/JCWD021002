/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import {
  Flex,
  FormControl,
  Input,
  Text,
  Switch,
  Button,
  Select,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useWebSize } from '../../provider.websize';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export const AddAddress = () => {
  const [province, setProvince] = useState();
  const [cities, setCities] = useState();
  const [provinceId, setProvinceId] = useState();
  const [cityId, setCityId] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const { size } = useWebSize();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const userId = useSelector((state) => state.AuthReducer?.user?.id);

  const handleProvinceChange = (event) => {
    setProvinceId(event.target.value);
  };
  const handleCityChange = (event) => {
    setCityId(event.target.value);
  };
  const handleSwitchChange = (event) => {
    setIsChecked(event.target.checked);
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

  useEffect(() => {
    getProvince();
  }, []);
  useEffect(() => {
    if (provinceId) {
      getCity(provinceId);
    }
  }, [provinceId]);

  const addAddress = async (
    addressLine,
    recipientNames,
    recipientsMobileNumber,
    addressLabel,
    postalCode,
    addressDetails,
  ) => {
    try {
      await axios.post(
        `http://localhost:8000/api/address/createAddress?userId=${userId}&cityId=${cityId}&isMain=${
          isChecked ? 1 : 0
        }`,
        {
          addressLine,
          postalCode,
          recipientNames,
          recipientsMobileNumber,
          addressLabel,
          addressDetails,
        },
      );

      onClose();
      formik.resetForm();
      setProvinceId();
      toast.success('Alamat berhasil ditambahakan');
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      addressLine: '',
      recipientNames: '',
      recipientsMobileNumber: '',
      addressLabel: '',
      postalCode: '',
      addressDetails: ''
    },
    onSubmit: (values) => {
      addAddress(
        values.addressLine,
        values.recipientNames,
        values.recipientsMobileNumber,
        values.addressLabel,
        values.postalCode,
        values.addressDetails
      );
    },
  });

  return (
    <Flex w={'full'}>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen} w={'full'}>
        Tambah Alamat
      </Button>
      <Drawer
        isOpen={isOpen}
        placement={size == '500px' ? 'bottom' : 'right'}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          sx={size == '500px' ? { w: size } : { maxW: '35vw' }}
          borderRadius={size == '500px' ? '20px 20px 0 0' : 0}
          maxH={size == '500px' ? '90vh' : 'full'}
          p={'30px'}
          m={'auto'}
        >
          <DrawerCloseButton />
          <DrawerHeader display={'flex'} justifyContent={'center'}>
            Alamat Baru
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
                        variant={'unstyled'}
                        placeholder="Nama Penerima*"
                        name="recipientNames"
                        value={formik.values.recipientNames}
                        onChange={formik.handleChange}
                      />
                    </Flex>
                    <Flex bgColor={'white'} py={'10px'}>
                      <Input
                        variant={'unstyled'}
                        placeholder="Nomor Handphone Penerima*"
                        name="recipientsMobileNumber"
                        value={formik.values.recipientsMobileNumber}
                        onChange={formik.handleChange}
                      />
                    </Flex>
                    <Flex py={'10px'}>
                      <Select
                        variant="unstyled"
                        placeholder="Provinsi"
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
                        placeholder="Kota"
                        onChange={handleCityChange}
                        borderRadius={0}
                        variant="unstyled"
                      >
                        {cities?.map((item, index) => {
                          return (
                            <option
                              value={item?.id}
                              key={index}
                              style={{ backgroundColor: 'transparent' }}
                            >
                              {item?.city}
                            </option>
                          );
                        })}
                      </Select>
                    </Flex>
                    <Flex bgColor={'white'} py={'10px'}>
                      <Input
                        variant={'unstyled'}
                        placeholder="Alamat"
                        name="addressLine"
                        value={formik.values.addressLine}
                        onChange={formik.handleChange}
                      />
                    </Flex>
                    <Flex bgColor={'white'} py={'10px'}>
                      <Input
                        variant={'unstyled'}
                        placeholder="Detail Alamat (Cth: Blok / Unit No., Patokan)"
                        name='addressDetails'
                        value={formik.values.addressDetails}
                        onChange={formik.handleChange}
                      />
                    </Flex>
                    <Flex bgColor={'white'} py={'10px'}>
                      <Input
                        variant={'unstyled'}
                        placeholder="Kode Pos"
                        name='postalCode'
                        value={formik.values.postalCode}
                        onChange={formik.handleChange}
                      />
                    </Flex>
                    <Flex bgColor={'white'} py={'10px'}>
                      <Input
                        variant={'unstyled'}
                        placeholder="Label Alamat"
                        name="addressLabel"
                        value={formik.values.addressLabel}
                        onChange={formik.handleChange}
                      />
                    </Flex>
                    <Flex justify={'space-between'} py={'10px'}>
                      <Text>Atur sebagai Alamat Utama</Text>
                      <Switch
                        size="lg"
                        isChecked={isChecked}
                        onChange={handleSwitchChange}
                      />
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
