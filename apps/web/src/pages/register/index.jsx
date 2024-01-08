/* eslint-disable react/prop-types */
import { Center, Flex, Text, Button, Image } from '@chakra-ui/react';
import { FormRegister } from './formRegister';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import { signUpWithFeacebook, signUpWithGoogle, signUpWithTwitter } from '../../config/firebase-config';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ResizeButton } from '../../components/ResizeButton';

export const Register = ({ size, handleWebSize }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegisterWithGoogle = async () => {
    try {
      const result = await signUpWithGoogle(dispatch);
      console.log(result.user);
      await axios.post(
        'http://localhost:8000/api/auth/registersocial',
        {
          username: result.user.displayName,
          email: result.user.email,
          fullname: result.user.displayName
        },
      );

      toast.success('Sign up Success');
      if (result.message == 'signup with google success') {
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const onRegisterWithFacebook = async () => {
    try {
      const result = await signUpWithFeacebook(dispatch);
      console.log(result.user);
      await axios.post(
        'http://localhost:8000/api/auth/registersocial',
        {
          username: result.user.displayName,
          email: result.user.email,
          fullname: result.user.displayName
        },
      );

      toast.success('Sign up Success');
      if (result.message == 'signup with google success') {
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const onRegisterWithTwitter = async () => {
    try {
      const result = await signUpWithTwitter(dispatch);
      console.log(result.user);
      await axios.post(
        'http://localhost:8000/api/auth/registersocial',
        {
          username: result.user.displayName,
          email: result.user.email,
          fullname: result.user.displayName
        },
      );

      toast.success('Sign up Success');
      if (result.message == 'signup with google success') {
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const socialButtons = [
    { icon: <FaGoogle />, bgColor: 'red', click: onRegisterWithGoogle },
    { icon: <FaFacebook />, bgColor: '#4267B2FF',  click: onRegisterWithFacebook },
    { icon: <FaTwitter />, bgColor: 'blue.200',  click: onRegisterWithTwitter },
  ];

  return (
    <Flex
      direction={'column'}
      w={{ base: '100vw', md: size }}
      h={{ base: '100vh', lg: '100vh' }}
      transition="width 0.3s ease"
      bgSize={size == '500px' ? 'contain' : 'cover'}
    >
      <Flex
        position={'relative'}
        // top={{ base: '20px', lg: '-30px' }}
        px={'20px'}
        h={"10vh"}
        justify={"space-between"}
        align={"center"}
      >
        <Image src={LogoGroceria} h={'30px'} />
        <ResizeButton webSize={size} handleWebSize={handleWebSize} color={"black"}/>
      </Flex>

      <Flex flexDirection={size == '500px' ? 'column' : 'row'} h={'full'}>
        <Flex
          w={size == '500px' ? { base: '100vw', md: '500px' } : '50%'}
          h={{ base: 'full', md: '80%', lg: 'full' }}
          p={'20px'}
          direction={'column'}
          transition="width 0.3s ease"
          // mt={{ base: '-20px', lg: '-30px' }}
        >
          <Center
            h={{ base: '30%', md: '10%', lg: '40%' }}
            mt={{ base: '10%', md: '30%', lg: '0' }}
          >
            <Text fontSize={'32px'} fontWeight={700}>
              Sign up
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
            <FormRegister />

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
                      onClick={social.click}
                    >
                      {social.icon}
                    </Button>
                  );
                })}
              </Flex>
              <Flex gap={1} justify={'center'}>
                Already have an account?
                <Link
                  style={{ color: '#1B4332', fontWeight: 600 }}
                  to={'/login'}
                >
                  Sign in
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
