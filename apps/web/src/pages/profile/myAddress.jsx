/* eslint-disable react/prop-types */
import {
  Flex,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';
// import { MyButton } from '../../components/Button';

import { useWebSize } from '../../provider.websize';
import { AddAddress } from './addAddress';
import { EditAddress } from './editAddress';


export const MyAddress = () => {
  const { size } = useWebSize();

  return (
    <Flex w={size} bgColor={'#F8F9FAFF'}>
      <Flex w={'full'} direction={'column'}>
        <Flex
          align={'center'}
          w={size}
          mb={'40px'}
          h={'60px'}
          p={'10px 30px'}
          boxShadow={'base'}
          position={'fixed'}
          bgColor={'white'}
        >
          <Flex position={'absolute'}>
            <Link to={'/profile/detail'}>
              <MdArrowBackIos />
            </Link>
          </Flex>
          <Flex w={'full'} justify={'center'}>
            <Text fontWeight={600} fontSize={'16px'}>
              Alamat
            </Text>
          </Flex>
        </Flex>

        <EditAddress />

        <Flex w={'full'} p={'30px'} justify={'center'}>
          <AddAddress />
        </Flex>
      </Flex>
    </Flex>
  );
};
