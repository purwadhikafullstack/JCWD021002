/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Center, Flex, Text, Button, Image } from '@chakra-ui/react';
import { FormLogin } from './formLogin';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoGroceria from '../../../assets/Groceria-no-Bg.png';
import {
  signInWithFacebook,
  signInWithGoogle,
  signInWithTwitter,
} from '../../../config/firebase-config';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ResizeButton } from '../../../components/ResizeButton';
import { keepLogin, setUser } from '../../../redux/reducer/authReducer';
import { useWebSize } from '../../../provider.websize';
import { useState } from 'react';
import Loader from '../../../components/Loader';
import bgImg from './../../../assets/imagebg.png';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { size } = useWebSize();
  const [displayLoader, setDisplayLoader] = useState('none');
  const location = useLocation();
  const fromPage = new URLSearchParams(location.search).get('fromPage');

  const onLoginWithGoogle = async () => {
    try {
      const result = await signInWithGoogle(dispatch);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/loginsocial`,
        {
          email: result.user.email,
        },
      );
      localStorage.setItem('token', res?.data?.data?.token);

      dispatch(setUser(res.data.data));
      dispatch(keepLogin());

      if (!res) throw new Error('Email has not been registered');
      toast.success('Sign in with google Success');
      if (result.message == 'signin with google success') {
        setDisplayLoader('flex');
        setTimeout(() => {
          setDisplayLoader('none');
          navigate(fromPage);
        }, 1500);
      }
    } catch (err) {
      setDisplayLoader('none');
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const onLoginWithFacebook = async () => {
    try {
      const result = await signInWithFacebook(dispatch);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/loginsocial`,
        {
          email: result.user.email,
        },
      );
      if (!res) throw new Error('Email has not been registered');
      toast.success('Sign in Success');
      if (result.message == 'signin with facebook success') {
        setDisplayLoader('none');
        navigate(fromPage);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };
  const onLoginWithTwitter = async () => {
    try {
      const result = await signInWithTwitter(dispatch);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/loginsocial`,
        {
          email: result.user.email,
        },
      );
      if (!res) throw new Error('Email has not been registered');
      toast.success('Sign in Success');
      if (result.message == 'signin with twitter success') {
        navigate(fromPage);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const handleClickLogin = () => {
    // setDisplayLoader('flex');
    onLoginWithGoogle();
  };

  const socialButtons = [
    { icon: <FaGoogle />, bgColor: 'red', click: handleClickLogin },
    { icon: <FaFacebook />, bgColor: '#4267B2FF', click: onLoginWithFacebook },
    { icon: <FaTwitter />, bgColor: 'blue.200', click: onLoginWithTwitter },
  ];

  return (
    <Flex
      direction={'column'}
      w={{ base: '100vw', md: size }}
      h={{ base: '100vh', lg: '100vh' }}
      transition="width 0.3s ease"
      bgSize={size == '500px' ? 'contain' : 'cover'}
      // bgColor={'white'}
      // bgImage={bgImg}
      sx={size == '500px' ? {bgColor: 'white'} : {bgImage: bgImg}}
      bgRepeat={'no-repeat'}
      bgPosition={'center'}
    >
      <Flex
        position={'relative'}
        // top={{ base: '20px', lg: '-30px' }}
        px={'30px'}
        h={'10vh'}
        justify={'space-between'}
        align={'center'}
        bgColor={'rgba(255, 255, 255, .5)'}
      >
        <Link to={'/'}>
          <Image src={LogoGroceria} h={'30px'} />
        </Link>
        <ResizeButton color={'black'} />
      </Flex>

      <Flex flexDirection={size == '500px' ? 'column' : 'row'} h={'full'}>
        <Flex
          w={size == '500px' ? { base: '100vw', md: '500px' } : '40%'}
          h={'95%'}
          p={'20px 30px'}
          direction={'column'}
          transition="width 0.3s ease"
          // mt={{ base: '-20px', lg: '-30px' }}
          m={size == '500px' ? '0' : '10px 100px'}
          // margin={size == '500px' ? '0' : '100px'}
          bgColor={'transparent'}
          borderRadius={'20px'}
        >
          <Center
            h={{ base: '30%', md: '40%', lg: '40%' }}
            mt={{ base: '10%', md: '0' }}
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
            <FormLogin fromPage={fromPage} />

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

              <Flex
                display={displayLoader}
                position={'absolute'}
                top={0}
                left={0}
              >
                <Loader />
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
