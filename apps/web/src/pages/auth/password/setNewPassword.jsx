import {
  Flex,
  FormControl,
  Text,
  Input,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import { MyButton } from '../../../components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import toast from 'react-hot-toast';
import { ModalReverify } from '../modalReverify';
import { useWebSize } from '../../../provider.websize';

const validationSchema = Yup.object().shape({
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

export const SetNewPassword = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [resetToken, setResetToken] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const { size } = useWebSize();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const resetToken = searchParams.get('resetToken');

    if (resetToken) setResetToken(resetToken);
  }, []);

  const setNewPassword = async (password, confirmPass, resetToken) => {
    try {
      if (password == confirmPass) {
        await axios.patch(
          `${
            import.meta.env.VITE_API_URL
          }/auth/setPassword?resetToken=${resetToken}`,
          {
            password,
          },
        );
        const state = {
          title: 'Perubahan kata sandi berhasil!',
          description:
            'Kata Sandi anda berhasil diubah dengan sukses! Kami akan memberitahu Anda jika ada masalah lebih lanjut dengan akun Anda.',
        };

        navigate('/password/success', { state });
      } else {
        toast.error('Passwords must match');
      }
    } catch (err) {
      toast.error(err.response.data);
      console.log(err);
      if (err.response.data == 'Link tidak valid') {
        onOpen();
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setNewPassword(values.password, values.confirmPassword, resetToken);
    },
  });
  return (
    <Flex
      py={'30px'}
      px={size == '500px' ? '30px' : { base: 0, lg: '200px', xl: '500px' }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Flex direction={'column'} gap={'40px'}>
          <Flex direction={'column'} gap={3}>
            <Text fontSize={'28px'} fontWeight={700}>
              Password baru
            </Text>
            <Text>
              Password baru Anda harus berbeda dengan password yang digunakan
              sebelumnya.
            </Text>
          </Flex>
          <Flex direction={'column'}>
            <FormControl
              display={'flex'}
              flexDirection={'column'}
              mb={'25px'}
              isInvalid={formik.touched.password && formik.errors.password}
            >
              <FormLabel fontWeight={'500'} color={'gray'} fontSize={'14px'}>
                Password*
              </FormLabel>
              <InputGroup>
                <Input
                  placeholder="Enter your new password..."
                  name="password"
                  type={show ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  autoComplete="off"
                />
                <InputRightElement>
                  <Button size={'xm'} onClick={() => setShow(!show)}>
                    {show ? <BiShow /> : <BiHide />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formik.touched.password && formik.errors.password && (
                <FormErrorMessage
                  position={'absolute'}
                  left={'5px'}
                  bottom={'-18px'}
                  fontSize={'12px'}
                >
                  {formik.errors.password}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              display={'flex'}
              flexDirection={'column'}
              mb={'25px'}
              isInvalid={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            >
              <FormLabel fontWeight={'500'} color={'gray'} fontSize={'14px'}>
                Confirm Password*
              </FormLabel>
              <Input
                placeholder="Confirm password"
                name="confirmPassword"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                autoComplete="off"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <FormErrorMessage
                    position={'absolute'}
                    left={'5px'}
                    bottom={'-18px'}
                    fontSize={'12px'}
                  >
                    {formik.errors.confirmPassword}
                  </FormErrorMessage>
                )}
            </FormControl>
          </Flex>
        </Flex>

        <MyButton type={'submit'} value={'Reset Password'} />
      </form>
      <ModalReverify
        isOpen={isOpen}
        onClose={onClose}
        title={'Link Verifikasi Kadaluwarsa'}
        description={
          'Sayangnya, link verifikasi sudah tidak berlaku. Jangan khawatir! Kami siap mengirimkan link verifikasi baru untuk memastikan keamanan akun Anda. Apakah Anda ingin melanjutkan proses verifikasi?'
        }
        link={'/verify/email'}
      />
    </Flex>
  );
};
