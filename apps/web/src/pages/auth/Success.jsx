/* eslint-disable react/prop-types */
import { Flex, Text, Image } from '@chakra-ui/react';
import LogoEncrypt from '../../assets/encrypted.png';
import { MyButton } from '../../components/Button';
import { Link, useLocation } from 'react-router-dom';

export const Success = () => {
  const location = useLocation();

  const { title, description } = location.state || {};

  return (
    <Flex
      direction={'column'}
      h={'100vh'}
      p={'30px'}
      transition="width 0.3s ease"
      justify={'space-between'}
      align={'center'}
      gap={'50px'}
    >
      <Flex
        direction={'column'}
        p={'30px'}
        transition="width 0.3s ease"
        justify={'center'}
        align={'center'}
        gap={'50px'}
        h={'90%'}
      >
        <Flex
          w={'120px'}
          bgColor={'colors.secondary'}
          p={'25px'}
          borderRadius={'20px'}
        >
          <Image src={LogoEncrypt} />
        </Flex>

        <Flex
          direction={'column'}
          justify={'center'}
          align={'center'}
          textAlign={'center'}
        >
          <Text fontSize={'24px'} fontWeight={700}>{title}</Text>
          <Flex p={'10px 10px'}>
            <Text textAlign={'center'}>{description}</Text>
          </Flex>
        </Flex>
      </Flex>

      <Link to={'/login'} style={{ width: '100%' }}>
        <MyButton value={'Go to login'} />
      </Link>
    </Flex>
  );
};
