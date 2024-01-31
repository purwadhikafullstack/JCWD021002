/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
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

export const ChangeEmailVerfy = () => {
  const {size } = useWebSize()
  const navigate = useNavigate();
  const [show, setShow] = useState({
    showP: false,
    showC: false,
  });
  const handleClickshow = (key) =>
    setShow((prev) => ({ ...prev, [key]: !prev[key] }));

  const userId = useSelector((state) => state.AuthReducer.user.id);

  const changeEmailVerify = async (password) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/change-email-verification/${userId}`,
        {
          password,
        },
      );
      navigate('/profile/detail/account/change-email');
    } catch (err) {
      toast.error(err?.response?.data);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    // validationSchema: changeEmailSchema,
    onSubmit: async (values) => {
      await changeEmailVerify(values.password);
    },
  });

  return (
    <Flex direction={'column'} w={{base: "100vw",md: size}} bgColor={"white"}>
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
              Verify email
            </Text>
          </Flex>
        </Flex>

        <Flex direction={'column'} gap={5} px={'30px'}>
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
        <Flex w={'full'} p={'30px'}>
          <Button
            type="submit"
            w={'full'}
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
