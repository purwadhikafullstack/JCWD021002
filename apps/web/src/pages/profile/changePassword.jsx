/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

import { MdArrowBackIos } from 'react-icons/md';
import {
  Button,
  Flex,
  Input,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { CiLock } from 'react-icons/ci';
import { BiHide, BiShow } from 'react-icons/bi';
import toast from 'react-hot-toast';
import { useWebSize } from '../../provider.websize';

const changePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter and one number',
    )
    .required('password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter and one number',
    )
    .required('password is required')
    .notOneOf([Yup.ref('password'), null], 'New password must be different from the previous password'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

export const ChangePassword = () => {
  const navigate = useNavigate();
  const { size } = useWebSize();
  const [show, setShow] = useState({
    showP: false,
    showC: false,
  });
  const handleClickshow = (key) =>
    setShow((prev) => ({ ...prev, [key]: !prev[key] }));

  const userId = useSelector((state) => state.AuthReducer.user.id);

  const changePassword = async (password, newPassword, confirmPassword) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/auth/change-password/${userId}`,
        {
          password,
          newPassword,
          confirmPassword
        },
      );
      toast.success('Ganti Password Berhasil');
      navigate('/profile/detail/account');
    } catch (err) {
      toast.error(err?.response?.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      await changePassword(values.password, values.newPassword, values.confirmPassword);
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
          h={'60px'}
          mb={'40px'}
          p={'10px 30px'}
          boxShadow={'base'}
          justify={'space-between'}
        >
          <Flex w={'40px'}>
            <Link to={'/profile/detail/account'}>
              <MdArrowBackIos />
            </Link>
          </Flex>
          <Text fontWeight={600} fontSize={'16px'}>
            Ganti Password
          </Text>
          <Button
            type="submit"
            variant={'unstyled'}
            isDisabled={
              formik.values.password === '' || formik.values.newPassword === ''
                ? true
                : false
            }
          >
            Simpan
          </Button>
        </Flex>

        <Flex direction={'column'} gap={size == '500px' ? 5 : '40px'} px={size == '500px' ? '30px' : '200px'}>
          <FormControl
            isInvalid={formik.touched.password && formik.errors.password}
          >
            <FormLabel>Password saat ini</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <CiLock />
              </InputLeftElement>
              <Input
                placeholder="Masukkan password saat ini"
                type={show?.showP ? 'text' : 'password'}
                bgColor={'#F3F4F6FF'}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <InputRightElement>
                <Button size={'xm'} onClick={() => handleClickshow('showP')}>
                  {show?.showP ? <BiShow /> : <BiHide />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {formik.touched.password && formik.errors.password && (
              <FormErrorMessage position={'absolute'}>
                {formik.errors.password}
              </FormErrorMessage>
            )}
          </FormControl>

          {/* New Password */}
          <FormControl
            isInvalid={formik.touched.newPassword && formik.errors.newPassword}
          >
            <FormLabel>Password baru</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <CiLock />
              </InputLeftElement>
              <Input
                placeholder="Masukkan password baru"
                type={show?.showC ? 'text' : 'password'}
                bgColor={'#F3F4F6FF'}
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
              />
              <InputRightElement>
                <Button size={'xm'} onClick={() => handleClickshow('showC')}>
                  {show?.showC ? <BiShow /> : <BiHide />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {formik.touched.newPassword && formik.errors.newPassword && (
              <FormErrorMessage position={'absolute'}>
                {formik.errors.newPassword}
              </FormErrorMessage>
            )}
          </FormControl>
          {/* New Password */}
          <FormControl
            isInvalid={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          >
            <FormLabel>Confirm password</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <CiLock />
              </InputLeftElement>
              <Input
                placeholder="Masukkan ulang password baru"
                type={'password'}
                bgColor={'#F3F4F6FF'}
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
            </InputGroup>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <FormErrorMessage position={'absolute'}>
                  {formik.errors.confirmPassword}
                </FormErrorMessage>
              )}
          </FormControl>
        </Flex>
      </form>
    </Flex>
  );
};
