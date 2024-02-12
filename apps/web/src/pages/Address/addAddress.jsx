/* eslint-disable react/prop-types */
import axios from 'axios';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import {
  Flex,
  FormControl,
  Input,
  Text,
  Switch,
  Select,
} from '@chakra-ui/react';
// import { useWebSize } from '../../provider.websize';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import HereGeocodingApp from '../profile/HereGeocodingApp';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import { AddressAutoComplate } from '../../components/AddressAutoComplate/addressAutoComplate';
import { MyButton } from '../../components/Button';
import { useWebSize } from '../../provider.websize';

export const AddAddress = () => {
  const [province, setProvince] = useState();
  const [cities, setCities] = useState();
  const [provinceId, setProvinceId] = useState();
  const [cityId, setCityId] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const { size } = useWebSize();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.AuthReducer?.user?.id);
  const [address, setAddress] = useState();
  const location = useLocation();
  const fromPage = new URLSearchParams(location.search).get('fromPage');
  const [update, setUpdate] = useOutletContext();
  const [suggestedAddresses, setSuggestedAddresses] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [visible, setVisible] = useState(false);
  const [userCoordinates, setUserCoordinates] = useState();

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

  const addAddress = async (
    addressLine,
    recipientNames,
    recipientsMobileNumber,
    addressLabel,
    postalCode,
    addressDetails,
    latitude,
    longitude,
  ) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/address/createAddress?userId=${userId}&cityId=${cityId}&isMain=${
          isChecked ? 1 : 0
        }`,
        {
          addressLine,
          postalCode,
          recipientNames,
          recipientsMobileNumber,
          addressLabel,
          addressDetails,
          latitude,
          longitude,
        },
      );

      formik.resetForm();
      setProvinceId();
      setUpdate(true);
      toast.success('Alamat berhasil ditambahakan');
      if (fromPage) {
        navigate(fromPage);
      } else navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      addressLine: address || '',
      recipientNames: '',
      recipientsMobileNumber: '',
      addressLabel: '',
      postalCode: '',
      addressDetails: '',
      latitude: '',
      longitude: '',
    },
    onSubmit: (values) => {
      addAddress(
        inputValue,
        values.recipientNames,
        values.recipientsMobileNumber,
        values.addressLabel,
        values.postalCode,
        values.addressDetails,
        userCoordinates?.lat,
        userCoordinates?.lng,
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
    <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
      <Flex
        w={'full'}
        mt={'80px'}
        px={size == '500px' ? '30px' : '200px'}
        direction={'column'}
        justify={'space-between'}
        h={'90%'}
      >
        <FormControl>
          <Flex w={'full'} direction={'column'} gap={'20px'}>
            <Flex>
              <Input
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
            <Flex>
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
            <Flex gap={5} p={'10px 0px'}>
              <Select
                placeholder="Provinsi"
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
                placeholder="Kota"
                onChange={handleCityChange}
                _placeholder={{ fontSize: '14px' }}
                borderRadius={'20px'}
                bgColor={'white'}
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
            <Flex direction={'column'} gap={2}>
              <Input
                placeholder="Alamat"
                name="addressLine"
                value={inputValue}
                _placeholder={{ fontSize: '14px' }}
                borderRadius={'20px'}
                bgColor={'white'}
                p={'10px 20px'}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  handleAddressChange(inputValue);
                  setInputValue(inputValue);
                  setVisible(true);
                }}
                autoComplete="off"
              />
              <HereGeocodingApp
                value={address}
                setUserAddress={setUserCoordinates}
              />
              <AddressAutoComplate
                inputValue={inputValue}
                visible={visible}
                suggestedAddresses={suggestedAddresses}
                handleInputChange={handleInputChange}
                setAddress={setAddress}
                setVisible={setVisible}
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
                placeholder="Kode Pos"
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
        <Flex w={'full'}>
          <MyButton value={'Simpan'} type={'submit'} />
        </Flex>
      </Flex>
    </form>
  );
};
