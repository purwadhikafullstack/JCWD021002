/* eslint-disable react/prop-types */
import { Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';
import { MyButton } from '../../components/Button';

// const address = [
//   {}
// ]

export const MyAddress = ({ size }) => {
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
              Alamat
            </Text>
          </Flex>
        </Flex>

        <Flex w={'full'} px={'30px'}>
          <Link
            to={'/profile/personal-information/address/addAddress'}
            style={{ width: '100%' }}
          >
            <MyButton value={'Tambah alamat'} />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
