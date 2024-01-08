/* eslint-disable react/prop-types */
import { Flex, FormControl, Input, Text, Switch } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';

export const AddAddress = ({ size }) => {
  return (
    <Flex w={size}>
      <Flex w={'full'} direction={'column'}>
        <Flex
          align={'center'}
          w={'full'}
          mb={'40px'}
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

        <form style={{ width: '100%' }}>
          <FormControl>
            <Flex w={'full'} p={'30px'} direction={"column"} gap={5}>
              <Flex>
                <Input placeholder="Nama Penerima*" />
              </Flex>
              <Flex>
                <Input placeholder="Nomor Handphone Penerima*" />
              </Flex>
              <Flex>
                <Input placeholder="Label Alamat" />
              </Flex>
              <Flex>
                <Input placeholder="Detail Alamat" />
              </Flex>
              <Flex>
                <Input placeholder="Catatan Pengiriman" />
              </Flex>
              <Flex justify={"space-between"}>
                <Text>Atur sebagai Alamat Utama</Text>
                <Switch size="lg" />
              </Flex>
            </Flex>
          </FormControl>
        </form>
      </Flex>
    </Flex>
  );
};
