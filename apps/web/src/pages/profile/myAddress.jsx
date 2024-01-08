/* eslint-disable react/prop-types */
import { Flex, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';

// const address = [
//   {}
// ]

export const MyAddress = ({ size }) => {
  return (
    <Flex w={size}>
      <Flex w={'full'} direction={"column"}>
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

        <Flex>
          <Link to={"/profile/personal-information/address/addAddress"}>
            <Button>Tambah alamat</Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
