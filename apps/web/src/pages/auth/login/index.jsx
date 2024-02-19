/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Center, Flex, Text, Button, Image } from '@chakra-ui/react';
import { FormLogin } from './formLogin';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LogoGroceria from '../../../assets/Groceria-no-Bg.png';
import { signInWithGoogle } from '../../../config/firebase-config';
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
      if (!res) throw new Error('Email has not been registered');

      localStorage.setItem('token', res?.data?.data?.token);

      dispatch(setUser(res.data.data));
      dispatch(keepLogin());

      toast.success('Sign in with google Success');
      if (result.message == 'signin with google success') {
        setDisplayLoader('flex');
        setTimeout(() => {
          setDisplayLoader('none');
          navigate(fromPage);
        }, 1500);
      } else {
        throw new Error('Email has not been registered');
      }
    } catch (err) {
      setDisplayLoader('none');
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const handleClickLogin = () => {
    // setDisplayLoader('flex');
    onLoginWithGoogle();
  };

  return (
    <Flex
      direction={'column'}
      w={{ base: '100vw', md: size }}
      h={{ base: '100vh', lg: '100vh' }}
      transition="width 0.3s ease"
      bgSize={size == '500px' ? 'contain' : 'cover'}
      // bgColor={'white'}
      // bgImage={bgImg}
      sx={size == '500px' ? { bgColor: 'white' } : { bgImage: bgImg }}
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
              gap={4}
            >
              <Text color={'#6F7787FF'} fontSize={'12px'} fontWeight={400}>
                OR
              </Text>
              <Button
                size={'md'}
                p={'5px 15px'}
                borderRadius={'5px'}
                bgColor={'white'}
                fontSize={'16px'}
                fontWeight={400}
                onClick={handleClickLogin}
                gap={2}
                boxShadow={'sm'}
              >
                <FcGoogle size={'20px'} />
                <Text>Sign in with Google</Text>
              </Button>

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
