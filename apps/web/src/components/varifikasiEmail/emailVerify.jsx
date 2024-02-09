/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useState } from 'react';
import { useWebSize } from '../../provider.websize';

import { MdArrowBackIos, MdOutlineEmail } from 'react-icons/md';
import {
  Button,
  Flex,
  Input,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  InputRightElement,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BiHide, BiShow } from 'react-icons/bi';
import { useState } from 'react';
import { keepLogin, logoutSuccess } from '../../redux/reducer/authReducer';
import { logout } from '../../config/firebase-config';
import { useLocation } from 'react-router-dom';

export const ChangeEmailVerfy = () => {
  const { size } = useWebSize();
  const navigate = useNavigate();
  const [show, setShow] = useState({
    showP: false,
    showC: false,
  });
  const handleClickshow = (key) =>
    setShow((prev) => ({ ...prev, [key]: !prev[key] }));

  const userId = useSelector((state) => state.AuthReducer.user.id);
  const location = useLocation();
  // const navigateTo = new URLSearchParams(location.search).get('navTo');
  const fromPage = new URLSearchParams(location.search).get('fromPage');
  const dispatch = useDispatch();

  const changeEmailVerify = async (password) => {
    try {
      await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/auth/change-email-verification/${userId}`,
        {
          password,
        },
      );
      navigate('/profile/detail/account/change-email');
    } catch (err) {
      toast.error(err?.response?.data);
    }
  };

  const deleteAccount = async (password) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/delete/${userId}`,
        {
          password,
        },
      );

      logout();
      dispatch(logoutSuccess());
      dispatch(keepLogin());
      navigate('/register');
      toast.success('akun berhasil di hapus');
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    // validationSchema: changeEmailSchema,
    onSubmit: async (values) => {
      if (fromPage == '/account') {
        await changeEmailVerify(values.password);
      } else if (fromPage == '/detail') {
        await deleteAccount(values.password);
      }
    },
  });

  return (
    <Flex
      direction={'column'}
      w={{ base: '100vw', md: size }}
      bgColor={'white'}
    >
      <form onSubmit={formik.handleSubmit}>
        <Flex
          align={'center'}
          w={'full'}
          mb={'40px'}
          h={'60px'}
          p={'10px 30px'}
          boxShadow={'base'}
        >
          <Flex position={'absolute'}>
            <Link to={'/profile/detail/account'}>
              <MdArrowBackIos />
            </Link>
          </Flex>
          <Flex w={'full'} justify={'center'}>
            <Text fontWeight={600} fontSize={'16px'}>
              Verifikasi email
            </Text>
          </Flex>
        </Flex>

        <Flex
          direction={'column'}
          gap={5}
          px={size == '500px' ? '30px' : '200px'}
        >
          <FormControl
            isInvalid={formik.touched.password && formik.errors.password}
          >
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <MdOutlineEmail />
              </InputLeftElement>
              <Input
                placeholder="Masukkan Password"
                type={show?.showC ? 'text' : 'password'}
                bgColor={'#F3F4F6FF'}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <InputRightElement>
                <Button size={'xm'} onClick={() => handleClickshow('showC')}>
                  {show?.showC ? <BiShow /> : <BiHide />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {formik.touched.password && formik.errors.password && (
              <FormErrorMessage position={'absolute'}>
                {formik.errors.password}
              </FormErrorMessage>
            )}
          </FormControl>
        </Flex>
        <Flex
          w={'full'}
          p={'30px'}
          px={size == '500px' ? '30px' : '200px'}
          justify={'end'}
        >
          <Button
            type="submit"
            w={size == '500px' ? 'full' : '15%'}
            bgColor={'colors.primary'}
            color={'white'}
            isDisabled={formik.values.password == '' ? true : false}
          >
            Selanjutnya
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
