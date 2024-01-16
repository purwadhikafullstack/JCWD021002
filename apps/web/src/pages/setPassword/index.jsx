/* eslint-disable react/prop-types */
import { Center, Flex, Text, Image } from '@chakra-ui/react';
// import { Link } from 'react-router-dom';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import { FormSetPassword } from './formSetPassword';
import { useWebSize } from '../../provider.websize';

export const SetPassword = () => {
  const { size } = useWebSize();
  return (
    <Flex
      direction={'column'}
      w={{ base: '100vw', md: size }}
      h={{ base: '100vh', lg: '90vh' }}
      transition="width 0.3s ease"
      bgSize={size == '500px' ? 'contain' : 'cover'}
    >
      <Flex
        position={'relative'}
        top={{ base: '20px', lg: '-30px' }}
        px={'20px'}
      >
        <Image src={LogoGroceria} h={'30px'} />
      </Flex>

      <Flex flexDirection={size == '500px' ? 'column' : 'row'} h={'full'}>
        <Flex
          w={size == '500px' ? { base: '100vw', md: '500px' } : '50%'}
          h={{ base: 'full', md: '80%', lg: 'full' }}
          p={'20px'}
          direction={'column'}
          transition="width 0.3s ease"
          mt={{ base: '-20px', lg: '-30px' }}
        >
          <Center
            h={{ base: '30%', md: '10%', lg: '40%' }}
            mt={{ base: '10%', md: '30%', lg: '0' }}
          >
            <Text fontSize={'32px'} fontWeight={700}>
              Set Password
            </Text>
          </Center>

          <Flex
            justify={{
              base: 'space-evenly',
              lg: 'space-between',
            }}
            direction={'column'}
            h={'full'}
          >
            <FormSetPassword />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
