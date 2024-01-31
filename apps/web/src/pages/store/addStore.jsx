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
  List,
  ListItem,
  Box,
} from '@chakra-ui/react';
import { useWebSize } from '../../provider.websize';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BsBuildingAdd } from 'react-icons/bs';
import HereGeocodingApp from '../profile/HereGeocodingApp';

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
      setInputValue();
    },
  });
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

  const addStore = async (
    storeName,
    latitude,
    longitude,
    storeAddress,
    cityId,
  ) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/store/add?cityId=${cityId}`,
        {
          storeName,
          latitude,
          longitude,
          storeAddress,
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
      latitude: '',
      longitude: '',
      storeAddress: '',
    },
    onSubmit: (values) => {
      addStore(
        values.storeName,
        userCoordinates?.lat,
        userCoordinates?.lng,
        inputValue,
        cityId,
      );
    },
  });
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
              ? { w: size, h: '90vh' }
              : { maxW: '35vw', h: 'full' }
          }
          borderRadius={size == '500px' ? '25px 25px 0 0' : 0}
          p={'30px'}
          m={'auto'}
        >
          <DrawerCloseButton />
          <DrawerHeader display={'flex'} justifyContent={'center'}>
            Toko Baru
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
                        type="name"
                        placeholder="Nama Toko*"
                        _placeholder={{ fontSize: '14px' }}
                        name="storeName"
                        value={formik.values.storeName}
                        onChange={formik.handleChange}
                        borderRadius={'20px'}
                        bgColor={'#E8EAEF'}
                      />
                    </Flex>
                    <Flex py={'10px'} gap={5}>
                      <Select
                        placeholder={'Provinsi'}
                        fontSize={'14px'}
                        value={provinceId}
                        onChange={handleProvinceChange}
                        borderRadius={'20px'}
                        bgColor={'#E8EAEF'}
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
                        fontSize={'14px'}
                        value={cityId}
                        onChange={handleCityChange}
                        borderRadius={'20px'}
                        bgColor={'#E8EAEF'}
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
                        bgColor={'#E8EAEF'}
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
