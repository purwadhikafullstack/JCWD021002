/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Center, Flex, Text, Button, Image } from '@chakra-ui/react';
import { FormLogin } from './formLogin';
import { FaGoogle, FaFacebook, FaTwitter, FaApple } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';

export const Login = ({ size }) => {
  const socialButtons = [
    { icon: <FaGoogle />, bgColor: 'red' },
    { icon: <FaFacebook />, bgColor: '#4267B2FF' },
    { icon: <FaTwitter />, bgColor: 'blue.200' },
    { icon: <FaApple />, bgColor: 'black' },
  ];

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

      <Flex flexDirection={size == '500px' ? 'column' : 'row'} h={"full"}>
        <Flex
          w={size == '500px' ? { base: '100vw', md: '500px' } : '50%'}
          h={{ base: 'full', md: '80%', lg: 'full' }}
          p={'20px'}
          direction={'column'}
          transition="width 0.3s ease"
          mt={{ base: '-20px', lg: '-30px' }}
          ml={size == '500px' ? '0' : ''}
        >
          <Center
            h={{ base: '30%', md: '10%', lg: '40%' }}
            mt={{ base: '10%', md: '30%', lg: '0' }}
          >
            <Text fontSize={'32px'} fontWeight={700}>
              Sign in
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
            <FormLogin />

            <Flex
              direction={'column'}
              w={'full'}
              justify={'center'}
              align={'center'}
              gap={5}
            >
              <Text color={'#6F7787FF'} fontSize={'12px'} fontWeight={400}>
                OR
              </Text>
              <Flex gap={5} align={'center'} justify={'center'}>
                {socialButtons?.map((social, index) => {
                  return (
                    <Button
                      key={index}
                      color={'white'}
                      _hover={{ transform: 'scale(1.1)' }}
                      _active={{ transform: 'scale(.9)' }}
                      size={'lg'}
                      p={'10px'}
                      borderRadius={'50%'}
                      bgColor={social.bgColor}
                      fontSize={'20px'}
                    >
                      {social.icon}
                    </Button>
                  );
                })}
              </Flex>
              <Flex gap={1} justify={'center'}>
                Don't have an account?
                <Link
                  style={{ color: '#1B4332', fontWeight: 600 }}
                  to={'/register'}
                >
                  Sign up
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
