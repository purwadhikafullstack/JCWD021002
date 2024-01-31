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
  List,
  ListItem,
  Box,
} from '@chakra-ui/react';
import { useWebSize } from '../../provider.websize';
import { useFormik } from 'formik';
import axios from 'axios';
import HereGeocodingApp from '../profile/HereGeocodingApp';

export const EditStore = ({ isOpen, onClose, selectedItems, setUpdate }) => {
  const { size } = useWebSize();
  const btnRef = React.useRef();
  const [province, setProvince] = useState();
  const [provinceId, setProvinceId] = useState();
  const [cities, setCities] = useState();
  const [cityId, setCityId] = useState();
  const [storeId, setStoreId] = useState();
  const [address, setAddress] = useState();
  const [suggestedAddresses, setSuggestedAddresses] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [userCoordinates, setUserCoordinates] = useState();
  const [visible, setVisible] = useState(false);

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
      setAddress(selectedItems?.storeAddress);
      setInputValue(selectedItems?.storeAddress);
      setSuggestedAddresses([]);
    }
  }, [selectedItems]);

  const changeStore = async (
    name,
    cityId,
    latitude,
    longitude,
    storeAddress,
    storeId,
  ) => {
    try {
      const res = await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/store/change?storeId=${storeId}&cityId=${cityId}`,
        {
          name,
          latitude,
          longitude,
          storeAddress,
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

  const handleAddressChange = async (inputValue) => {
    try {
      const response = await axios.get(
        `https://geocode.search.hereapi.com/v1/autocomplete?q=${encodeURIComponent(
          inputValue,
        )}&apiKey=q2eLAxpU5cGor4pcibhkDNzrsvJXJWzVw2bNQvljwuk`,
      );

      if (response.data.items) {
        const addresses = response.data.items.map((item) => item.title);
        setSuggestedAddresses(addresses);
      } else {
        setSuggestedAddresses([]);
      }
    } catch (error) {
      console.error('Error fetching autocomplete data:', error);
    }
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    setVisible(true);
    setSuggestedAddresses([]);
  };

  const handleCancel = () => {
    onClose();
    formik.resetForm();
    setSuggestedAddresses([]);
  };

  const formik = useFormik({
    initialValues: {
      name: selectedItems?.name || '',
      latitude: selectedItems?.latitude || '',
      longitude: selectedItems?.longitude || '',
      storeAddress: selectedItems?.storeAddress,
    },
    onSubmit: (values) => {
      changeStore(
        values.name,
        cityId,
        userCoordinates?.lat,
        userCoordinates?.lng,
        inputValue,
        storeId,
      );
    },
  });
  return (
    <Flex w={'full'}>
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
              ? { w: size, h: '90vh' }
              : { maxW: '35vw', h: 'full' }
          }
          borderRadius={size == '500px' ? '25px 25px 0 0' : 0}
          p={'30px'}
          m={'auto'}
        >
          <DrawerCloseButton />
          <DrawerHeader display={'flex'} justifyContent={'center'}>
            Ubah Toko
          </DrawerHeader>
          <form
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            onSubmit={formik.handleSubmit}
          >
            <DrawerBody>
              <Flex h={'fit-content'} bgColor={'white'}>
                <FormControl>
                  <Flex w={'full'} direction={'column'} gap={1}>
                    <Flex bgColor={'white'} py={'10px'}>
                      <Input
                        type="text"
                        variant={'unstyled'}
                        placeholder="Nama Toko*"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                      />
                    </Flex>
                    <Flex py={'10px'} gap={5}>
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
                    <Flex
                      bgColor={'white'}
                      py={'10px'}
                      direction={'column'}
                      gap={1}
                    >
                      <HereGeocodingApp
                        value={address}
                        setUserAddress={setUserCoordinates}
                      />
                      <Input
                        placeholder="Alamat"
                        _placeholder={{ fontSize: '14px' }}
                        name="addressLine"
                        autoComplete="off"
                        borderRadius={'20px'}
                        bgColor={'#E8EAEF'}
                        value={inputValue}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          handleAddressChange(inputValue);
                          setInputValue(inputValue);
                          setVisible(true);
                        }}
                      />
                      <List
                        display={
                          inputValue ? (visible ? 'flex' : 'none') : 'none'
                        }
                        flexDirection={'column'}
                        // bgColor={'#E8EAEF'}
                        gap={2}
                        borderRadius={'20px'}
                        p={'10px 20px'}
                      >
                        {suggestedAddresses.map((address, index) => (
                          <ListItem key={index}>
                            <Box
                              onClick={() => {
                                handleInputChange(address);
                                setAddress(address);
                                setVisible(false);
                              }}
                              cursor="pointer"
                            >
                              {address}
                            </Box>
                          </ListItem>
                        ))}
                      </List>
                    </Flex>
                  </Flex>
                </FormControl>
              </Flex>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={handleCancel}>
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
