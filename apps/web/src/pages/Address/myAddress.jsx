/* eslint-disable react/prop-types */
import { Button, Flex, Text } from '@chakra-ui/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MdArrowBackIos } from 'react-icons/md';
import { useState } from 'react';
import { useWebSize } from '../../provider.websize';

export const MyAddress = () => {
  const { size } = useWebSize();
  const location = useLocation();
  const fromPage = new URLSearchParams(location.search).get('fromPage');
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
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
            <Button
              variant={'unstyled'}
              onClick={fromPage ? () => navigate(fromPage) : () => navigate(-1)}
            >
              <MdArrowBackIos />
            </Button>
          </Flex>
          <Flex w={'full'} justify={'center'}>
            <Text fontWeight={600} fontSize={'16px'}>
              Alamat
            </Text>
          </Flex>
        </Flex>

        <Outlet context={[update, setUpdate]}/>
      </Flex>
    </Flex>
  );
};
