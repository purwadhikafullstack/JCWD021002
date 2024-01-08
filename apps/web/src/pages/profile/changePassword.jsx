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

const changePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter and one number',
    )
    .required('password is required'),
});

export const ChangePassword = ({ size }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState({
    showP: false,
    showC: false,
  });
  const handleClickshow = (key) =>
    setShow((prev) => ({ ...prev, [key]: !prev[key] }));

  const userId = useSelector((state) => state.AuthReducer.user.id);

  const changePassword = async (password, newPassword) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/auth/change-password/${userId}`,
        {
          password,
          newPassword,
        },
      );
      toast.success('Ganti Password Berhasil');
      navigate('/profile/personal-information/account');
    } catch (err) {
      toast.error(err?.response?.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      await changePassword(values.password, values.newPassword);
    },
  });

  return (
    <Flex direction={'column'} w={size}>
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
          <Flex w={"40px"}>
            <Link to={'/profile/personal-information/account'}>
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

        <Flex direction={'column'} gap={5} px={'30px'}>
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
        </Flex>
      </form>
    </Flex>
  );
};
