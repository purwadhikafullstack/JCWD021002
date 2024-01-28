import {
  Flex,
  Text,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  useDisclosure,
} from '@chakra-ui/react';
import { MyButton } from '../../../components/Button';
import { CiMail, CiUser } from 'react-icons/ci';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { register } from '../../../redux/reducer/authReducer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../../../components/Loader';
import { useState } from 'react';
import { ModalReverify } from '../modalReverify';

const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, 'Username must be at least 5 characters')
    .matches(/^\S{5,}$/, 'username is invalid')
    .required('username is required'),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'email is invalid',
    )
    .required('Email is required'),
});

export const FormRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayLoader, setDisplayLoader] = useState('none');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: 'pass12345',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setDisplayLoader('flex');
      const res = await dispatch(
        register({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      );
      if (res?.payload == 'Register Success') {
        setDisplayLoader('none');
        const state = { email: res?.meta?.arg?.email, isNew: false };
        navigate('/sentMailSuccess', { state });
        toast.success(res?.payload);
      } else if (
        res?.error?.message == 'Email or username has already existed'
      ) {
        setTimeout(() => {
          setDisplayLoader('none');
          toast.error(res?.error?.message);
        }, 1000);
      } else if (res?.error?.message == 'Email or username is not verified') {
        setTimeout(() => {
          setDisplayLoader('none');
          toast.error(res?.error?.message);
          onOpen();
        }, 1000);
      }
    },
  });

  return (
    <form
      style={{ width: '100%', height: 'fit-content' }}
      onSubmit={formik.handleSubmit}
    >
      <Flex direction={'column'} gap={10} h={'fit-content'}>
        <Flex direction={'column'} gap={'40px'}>
          <FormControl
            bgColor={'#F3F4F6FF'}
            borderRadius={'4px'}
            pt={'5px'}
            isInvalid={formik.touched.username && formik.errors.username}
          >
            <FormLabel m={' 0 0 0 13px'}>Username</FormLabel>
            <InputGroup>
              <InputLeftElement fontSize={'20px'}>
                <CiUser />
              </InputLeftElement>
              <Input
                placeholder="Enter username"
                variant={'unstyled'}
                h={'40px'}
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
            </InputGroup>
            {formik.touched.username && formik.errors.username && (
              <FormErrorMessage position={'absolute'}>
                {formik.errors.username}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl
            bgColor={'#F3F4F6FF'}
            borderRadius={'4px'}
            pt={'5px'}
            isInvalid={formik.touched.email && formik.errors.email}
          >
            <FormLabel m={' 0 0 0 13px'}>Email</FormLabel>
            <InputGroup>
              <InputLeftElement fontSize={'20px'}>
                <CiMail />
              </InputLeftElement>
              <Input
                placeholder="Enter email"
                variant={'unstyled'}
                h={'40px'}
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </InputGroup>
            {formik.touched.email && formik.errors.email && (
              <FormErrorMessage position={'absolute'}>
                {formik.errors.email}
              </FormErrorMessage>
            )}
          </FormControl>
        </Flex>
        <Flex display={displayLoader} position={'absolute'} top={0} left={0}>
          <Loader />
        </Flex>
        <MyButton type="submit" value={<Text>Sign up</Text>} />
      </Flex>

      <ModalReverify
        isOpen={isOpen}
        onClose={onClose}
        modalTitle={'Email belum terverifikasi'}
        modalDescription={
          'Email Anda sudah terdaftar, namun akun belum terverifikasi. pakah Anda ingin melanjutkan proses verifikasi?'
        }
        title={'Verifikasi email'}
        description={
          'Masukkan alamat email yang Anda gunakan saat bergabung dan kami akan mengirimkan instruksi untuk memverifikasi akun anda.'
        }
        link={'/verify/email'}
      />
    </form>
  );
};
