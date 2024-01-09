/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  Flex,
  FormControl,
  Input,
  Text,
  Switch,
  Button,
  Select,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';

export const AddAddress = ({ size }) => {
  const [province, setProvince] = useState();
  const [city, setCity] = useState();
  const [provinceId, setProvinceId] = useState();
  const [cityId, setCityId] = useState();

  const handleProvinceChange = (event) => {
    const selectedProvinceId = event.target.value;
    setProvinceId(selectedProvinceId);
  };
  const handleCityChange = (event) => {
    const selectedCityId = event.target.value;
    setCityId(selectedCityId);
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

  useEffect(() => {
    getProvince();
  }, []);

  useEffect(() => {
    const getCity = async (provinceId) => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/address/getCity/${provinceId}`,
        );
        setCity(res?.data?.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCity(provinceId);
  }, [provinceId]);

  return (
    <Flex w={size} h={'100vh'}>
      <Flex w={'full'} direction={'column'}>
        <Flex
          align={'center'}
          w={'full'}
          h={'60px'}
          p={'10px 30px'}
          boxShadow={'base'}
        >
          <Flex position={'absolute'}>
            <Link to={'/profile/personal-information'}>
              <MdArrowBackIos />
            </Link>
          </Flex>
          <Flex w={'full'} justify={'center'}>
            <Text fontWeight={600} fontSize={'16px'}>
              Tambah alamat
            </Text>
          </Flex>
        </Flex>

        <form style={{ width: '100%', height: '100%' }}>
          <FormControl>
            <Flex w={'full'} p={'30px'} direction={'column'} gap={1}>
              <Flex bgColor={'white'} py={'10px'}>
                <Input variant={'unstyled'} placeholder="Nama Penerima*" />
              </Flex>
              <Flex bgColor={'white'} py={'10px'}>
                <Input
                  variant={'unstyled'}
                  placeholder="Nomor Handphone Penerima*"
                />
              </Flex>
              <Flex bgColor={'white'} py={'10px'}>
                <Input variant={'unstyled'} placeholder="Label Alamat" />
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
                      <option
                        value={item?.id}
                        key={index}
                      >
                        {item?.province}
                      </option>
                    );
                  })}
                </Select>
              </Flex>
              <Flex py={'10px'}>
                <Select
                  variant="unstyled"
                  placeholder="Kota"
                  value={cityId}
                  onChange={handleCityChange}
                >
                  {city?.map((item, index) => {
                    return (
                      <option value={item?.id} key={index}>
                        {item?.city}
                      </option>
                    );
                  })}
                </Select>
              </Flex>
              <Flex bgColor={'white'} py={'10px'}>
                <Input variant={'unstyled'} placeholder="Detail Alamat" />
              </Flex>
              <Flex bgColor={'white'} py={'10px'}>
                <Input variant={'unstyled'} placeholder="Catatan Pengiriman" />
              </Flex>
              <Flex justify={'space-between'}>
                <Text>Atur sebagai Alamat Utama</Text>
                <Switch size="lg" />
              </Flex>
            </Flex>
          </FormControl>

          <Flex px={'30px'}>
            <Button type="submit" w={'full'}>
              Simpan
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};
