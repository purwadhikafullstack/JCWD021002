/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import { useState } from 'react';

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
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useWebSize } from '../../provider.websize';
import { keepLogin } from '../../redux/reducer/authReducer';

const changeEmailSchema = Yup.object().shape({
  newEmail: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'email is invalid',
    )
    .required('Email is required'),
});

export const ChangeEmail = () => {
  const navigate = useNavigate();
  const { size } = useWebSize();
  const userId = useSelector((state) => state.AuthReducer.user.id);
  const dispatch = useDispatch();

  const changeEmail = async (newEmail) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/auth/change-email/${userId}`,
        {
          newEmail,
        },
      );
      toast.success('Ganti Email Berhasil');
      dispatch(keepLogin());
      navigate('/profile/detail/account');
    } catch (err) {
      toast.error(err?.response?.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      newEmail: '',
    },
    validationSchema: changeEmailSchema,
    onSubmit: async (values) => {
      await changeEmail(values.newEmail);
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
              Ganti Email
            </Text>
          </Flex>
        </Flex>

        <Flex
          direction={'column'}
          gap={5}
          px={size == '500px' ? '30px' : '200px'}
        >
          <FormControl
            isInvalid={formik.touched.newEmail && formik.errors.newEmail}
          >
            <FormLabel>Email baru</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <MdOutlineEmail />
              </InputLeftElement>
              <Input
                placeholder="Masukkan email baru"
                type={'text'}
                bgColor={'#F3F4F6FF'}
                name="newEmail"
                value={formik.values.newEmail}
                onChange={formik.handleChange}
              />
            </InputGroup>
            {formik.touched.newEmail && formik.errors.newEmail && (
              <FormErrorMessage position={'absolute'}>
                {formik.errors.newEmail}
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
            isDisabled={formik.values.newEmail == '' ? true : false}
          >
            Simpan
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
