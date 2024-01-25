import {
  Input,
  Card,
  Flex,
  Text,
  Grid,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Box,
} from '@chakra-ui/react';
import { useWebSize } from '../../provider.websize';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { EditStore } from './editStore';
import { AddStore } from './addStore';
import { CiFilter } from 'react-icons/ci';

export const StoreList = () => {
  const { size } = useWebSize();
  const [store, setStore] = useState();
  const [province, setProvince] = useState();
  const [provinceId, setProvinceId] = useState();
  const [cities, setCities] = useState();
  const [cityId, setCityId] = useState();
  const [selectedItems, setSelectedItems] = useState();
  const [isOpenEdit, setIsOpenEDit] = useState(false);
  const [updateStore, setUpdateStore] = useState(false);

  const getStore = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/store/list`);
      setStore(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStore();
  }, [updateStore]);

  const handleClick = (items) => {
    setSelectedItems(items);
    setIsOpenEDit(true);
  };

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

  // console.log(province);
  // console.log(cities);

  useEffect(() => {
    getProvince();
  }, []);
  useEffect(() => {
    getCity(provinceId);
  }, [provinceId]);

  return (
    <Flex direction={'column'} w={'full'} gap={5}>
      <Flex justify={'space-between'}>
        <Flex w={'40%'}>
          <Input placeholder="Cari" />
        </Flex>
        <Flex gap={2}>
          <Menu>
            <MenuButton as={Button} variant={'unstyled'}>
              <CiFilter size={'28px'} />
            </MenuButton>
            <MenuList>
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Profinsi
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <ul>
                      {province?.map((item) => (
                        <li key={item.province}>{item?.province}</li>
                      ))}
                    </ul>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Kota / Kabupaten
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} maxW={'220px'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </MenuList>
          </Menu>
          <AddStore setUpdate={setUpdateStore} />
        </Flex>
      </Flex>
      <Flex w={'full'}>
        <Grid gridTemplateColumns={'repeat(2, 1fr)'} w={'full'} gridGap={5}>
          {store?.map((item) => {
            return (
              <Card
                key={item?.name}
                p={'20px'}
                onClick={() => handleClick(item)}
                cursor={'pointer'}
              >
                <Text>{item?.name}</Text>
                <Flex fontSize={'12px'} gap={2}>
                  <Text>
                    {item?.City?.city}, {item?.City?.Province?.province}
                  </Text>
                </Flex>
              </Card>
            );
          })}
        </Grid>
      </Flex>
      <EditStore
        isOpen={isOpenEdit}
        onClose={() => setIsOpenEDit(false)}
        selectedItems={selectedItems}
        setUpdate={setUpdateStore}
      />
    </Flex>
  );
};
