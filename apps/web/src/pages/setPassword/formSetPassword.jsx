import { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import {
  Flex,
  Text,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import { MyButton } from '../../components/Button';
import { CiLock } from 'react-icons/ci';
import { BiHide, BiShow } from 'react-icons/bi';
import toast from 'react-hot-toast';

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter and one number',
    )
    .required('password is required'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const FormSetPassword = () => {
  const [show, setShow] = useState({
    showP: false,
    showC: false,
  });
  const handleClickshow = (key) =>
  setShow((prev) => ({ ...prev, [key]: !prev[key] }));

  const navigate = useNavigate();

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }


  const resetToken = getQueryParam('resetToken');

  const SetPassword = async (password, confirmPassword) => {
    try {
      if (resetToken == null) {
        return alert('Invalid or missing reset token');
      }
      if (password == confirmPassword) {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/auth/setPassword?resetToken=${encodeURIComponent(
            resetToken,
          )}`,
          {
            password,
          },
        );
        toast.success('Set password success');
        navigate('/login');
      } else {
        toast.success('Passwords must match');
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      SetPassword(values.password, values.confirmPassword);
    },
  });

  return (
    <form
      style={{ width: '100%', height: '100%' }}
      onSubmit={formik.handleSubmit}
    >
      <Flex direction={'column'} gap={'50px'}>
        <Flex direction={'column'} gap={'30px'}>
          <FormControl
            isInvalid={formik.touched.password && formik.errors.password}
          >
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <CiLock />
              </InputLeftElement>
              <Input
                placeholder="Enter password"
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

          <FormControl
            isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
          >
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <CiLock />
              </InputLeftElement>
              <Input
                placeholder="Confirm password"
                type={show?.showC ? 'text' : 'password'}
                bgColor={'#F3F4F6FF'}
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              <InputRightElement>
                <Button size={'xm'} onClick={() => handleClickshow('showC')}>
                  {show?.showC ? <BiShow /> : <BiHide />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <FormErrorMessage position={'absolute'}>
                {formik.errors.confirmPassword}
              </FormErrorMessage>
            )}
          </FormControl>
        </Flex>

        <MyButton type={'submit'} value={<Text>Set password</Text>} />
      </Flex>
    </form>
  );
};
