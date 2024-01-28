import {
  Flex,
  FormControl,
  Text,
  Input,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import { MyButton } from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'email is invalid',
    )
    .required('Email is required'),
});

export const VerifyResetPassword = () => {
  const navigate = useNavigate();

  const verify = async (email) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        {
          email,
        },
      );
      if (res) {
        navigate('/sentMailSuccess');
      }
    } catch (err) {
      toast.error(err.response.data)
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      verify(values.email);
    },
  });
  return (
    <Flex p={'30px'}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          display={'flex'}
          gap={'40px'}
          flexDirection={'column'}
          mb={'25px'}
          isInvalid={formik.touched.email && formik.errors.email}
        >
          <Flex direction={'column'} gap={3}>
            <Text fontSize={'28px'} fontWeight={700}>
              Lupa Password
            </Text>
            <Text>
              Masukkan alamat email yang Anda gunakan saat bergabung dan kami
              akan mengirimkan instruksi untuk mereset kata sandi Anda.
            </Text>
          </Flex>
          <Flex direction={'column'}>
            <FormLabel fontWeight={'500'} color={'gray'} fontSize={'14px'}>
              Email address*
            </FormLabel>
            <Input
              placeholder="Enter your email..."
              name="email"
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
              autoComplete="off"
            />
            {formik.touched.email && formik.errors.email && (
              <FormErrorMessage position={'absolute'} left={'5px'} bottom={'-18px'} fontSize={'12px'}>{formik.errors.email}</FormErrorMessage>
            )}
          </Flex>
        </FormControl>

        <MyButton type={'submit'} value={'Kirim verifikasi'} />
      </form>
    </Flex>
  );
};
