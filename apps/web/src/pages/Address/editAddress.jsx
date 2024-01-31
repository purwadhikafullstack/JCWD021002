/* eslint-disable react/prop-types */
import axios from 'axios';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useWebSize } from '../../provider.websize';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

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
} from '@chakra-ui/react';

export const EditAddress = ({ selectedItem, setUpdate, isOpen, onClose }) => {
  const userId = useSelector((state) => state.AuthReducer?.user?.id);
  const [province, setProvince] = useState();
  const [cities, setCities] = useState();
  const [provinceId, setProvinceId] = useState();
  const [cityId, setCityId] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const { size } = useWebSize();

  const btnRef = React.useRef();

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

  const changeAddress = async (
    addressLine,
    postalCode,
    recipientNames,
    recipientsMobileNumber,
    addressLabel,
    addressDetails,
  ) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/address/changeAddress?userId=${userId}&cityId=${cityId}&isMain=${
          isChecked ? 1 : 0
        }&addressId=${selectedItem?.id}`,
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
      setUpdate(true);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      addressLine: '',
      postalCode: '',
      recipientNames: '',
      recipientsMobileNumber: '',
      addressLabel: '',
      addressDetails: '',
    },
    onSubmit: (values) => {
      changeAddress(
        values.addressLine,
        values.postalCode,
        values.recipientNames,
        values.recipientsMobileNumber,
        values.addressLabel,
        values.addressDetails,
      );
    },
  });

  useEffect(() => {
    if (selectedItem) {
      formik.resetForm();
      formik.setValues({
        addressLine: selectedItem.addressLine || '',
        postalCode: selectedItem.postalCode || '',
        recipientNames: selectedItem.recipientNames || '',
        recipientsMobileNumber: selectedItem.recipientsMobileNumber || '',
        addressLabel: selectedItem.addressLabel || '',
        addressDetails: selectedItem.addressDetails || '',
      });
      setProvinceId(selectedItem?.City?.Province?.id);
      setCityId(selectedItem?.city_idcity);
      if (selectedItem.isMain == 1) {
        setIsChecked(true);
      } else if (selectedItem.isMain == 0) {
        setIsChecked(false);
      }
      setUpdate(false);
    }
  }, [selectedItem]);

  return (
    <Flex>
      <Drawer
        isOpen={isOpen}
        placement={size == '500px' ? 'bottom' : 'right'}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          sx={size == '500px' ? { w: size } : { maxW: '35vw' }}
          borderRadius={size == '500px' ? '10px 10px 0 0' : 0}
          maxH={size == '500px' ? '100vh' : 'full'}
          m={'auto'}
          p={'10px 30px'}
        >
          <DrawerCloseButton />
          <DrawerHeader display={'flex'} justifyContent={'center'}>
            Ubah Alamat
          </DrawerHeader>
          <form
            style={{ width: '100%', height: '100%' }}
            onSubmit={formik.handleSubmit}
          >
            <DrawerBody>
              <Flex h={'fit-content'} bgColor={'white'}>
                <FormControl>
                  <Flex w={'full'} direction={'column'} gap={'20px'}>
                    <Flex bgColor={'white'}>
                      <Input
                        type="recipientNames"
                        placeholder="Nama Penerima*"
                        name="recipientNames"
                        value={formik.values.recipientNames}
                        onChange={formik.handleChange}
                        _placeholder={{ fontSize: '14px' }}
                        borderRadius={'20px'}
                        bgColor={'white'}
                        p={'10px 20px'}
                      />
                    </Flex>
                    <Flex bgColor={'white'}>
                      <Input
                        placeholder="Nomor Handphone Penerima*"
                        name="recipientsMobileNumber"
                        value={formik.values.recipientsMobileNumber}
                        onChange={formik.handleChange}
                        _placeholder={{ fontSize: '14px' }}
                        borderRadius={'20px'}
                        bgColor={'white'}
                        p={'10px 20px'}
                      />
                    </Flex>
                    <Flex gap={5}>
                      <Select
                        placeholder={'Provinsi'}
                        value={provinceId}
                        onChange={handleProvinceChange}
                        _placeholder={{ fontSize: '14px' }}
                        borderRadius={'20px'}
                        bgColor={'white'}
                      >
                        {province?.map((item, index) => {
                          return (
                            <option value={item?.id} key={index}>
                              {item?.province}
                            </option>
                          );
                        })}
                      </Select>
                      <Select
                        placeholder={'Kota / Kabupaten'}
                        value={cityId}
                        onChange={handleCityChange}
                        _placeholder={{ fontSize: '14px' }}
                        borderRadius={'20px'}
                        bgColor={'white'}
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
                    <Flex bgColor={'white'}>
                      <Input
                        placeholder="Alamat"
                        name="addressLine"
                        value={formik.values.addressLine}
                        onChange={formik.handleChange}
                        _placeholder={{ fontSize: '14px' }}
                        borderRadius={'20px'}
                        bgColor={'white'}
                        p={'10px 20px'}
                      />
                    </Flex>
                    <Flex bgColor={'white'}>
                      <Input
                        placeholder="Detail Alamat (Cth: Blok / Unit No., Patokan)"
                        name="addressDetails"
                        value={formik.values.addressDetails}
                        onChange={formik.handleChange}
                        _placeholder={{ fontSize: '14px' }}
                        borderRadius={'20px'}
                        bgColor={'white'}
                        p={'10px 20px'}
                      />
                    </Flex>
                    <Flex bgColor={'white'}>
                      <Input
                        placeholder="Kode pos"
                        name="postalCode"
                        value={formik.values.postalCode}
                        onChange={formik.handleChange}
                        _placeholder={{ fontSize: '14px' }}
                        borderRadius={'20px'}
                        bgColor={'white'}
                        p={'10px 20px'}
                      />
                    </Flex>
                    <Flex bgColor={'white'}>
                      <Input
                        placeholder="Label Alamat"
                        name="addressLabel"
                        value={formik.values.addressLabel}
                        onChange={formik.handleChange}
                        _placeholder={{ fontSize: '14px' }}
                        borderRadius={'20px'}
                        bgColor={'white'}
                        p={'10px 20px'}
                      />
                    </Flex>
                    <Flex justify={'space-between'} p={'10px 10px'}>
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
