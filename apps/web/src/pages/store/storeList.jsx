import {
  Input,
  Card,
  Flex,
  Text,
  Grid,
  Menu,
  MenuButton,
  MenuList,
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
import DeleteAlert from '../../components/DeleteAlert';

export const StoreList = () => {
  const { size } = useWebSize();
  const [store, setStore] = useState();
  const [inputValue, setInputValue] = useState('');
  const [selectedItems, setSelectedItems] = useState();
  const [isOpenEdit, setIsOpenEDit] = useState(false);
  const [updateStore, setUpdateStore] = useState(false);

  const getStore = async (inputValue) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/store/list?name=${inputValue}`,
      );
      setStore(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStore(inputValue);
  }, [updateStore, inputValue]);

  const handleClick = (items) => {
    setSelectedItems(items);
    setIsOpenEDit(true);
  };

  const handleDelete = async (storeId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/store/delete?storeId=${storeId}`,
      );
      setUpdateStore(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex direction={'column'} w={'full'} gap={size == '500px' ? 5 : '40px'} mt={'80px'} px={size == '100vw' && '30px'}>
      <Flex justify={'space-between'}>
        <Flex w={'40%'}>
          <Input
            placeholder="Cari"
            name="inputValue"
            onChange={(even) => setInputValue(even.target.value)}
            value={inputValue}
          />
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
                        Provinsi
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <ul>
                      {/* {province?.map((item) => (
                        <li key={item.province}>{item?.province}</li>
                      ))} */}
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
        <Grid
          gridTemplateColumns={
            size == '500px'
              ? 'repeat(2, 1fr)'
              : { base: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }
          }
          w={'full'}
          gridGap={5}
        >
          {store?.map((item) => {
            return (
              <Card key={item?.name} p={'20px'} gap={2}>
                <Flex direction={'column'}>
                  <Text fontWeight={600}>{item?.name}</Text>
                  <Flex fontSize={'12px'} gap={2}>
                    <Text fontSize={'12px'}>
                      {item?.City?.city}, {item?.City?.Province?.province}
                    </Text>
                  </Flex>
                </Flex>
                <Flex gap={2} fontSize={'12px'}>
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
                    mainValue={`Apakah kamu yakin ingin menhapus ${item?.name}?`}
                    deleteAction={() => handleDelete(item?.id)}
                    style={{ color: 'colors.tertiary', fontWeight: '400', size: 'xm'}}
                    buttonActionValue={'Delete'}
                  />
                </Flex>
              </Card>
            );
          })}
        </Grid>
      </Flex>
      <EditStore
        isOpen={isOpenEdit}
        onClose={() => {
          setIsOpenEDit(false);
          setSelectedItems();
        }}
        selectedItems={selectedItems}
        setUpdate={setUpdateStore}
      />
    </Flex>
  );
};
