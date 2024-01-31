/* eslint-disable react/prop-types */
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
import { MyButton } from '../../../components/Button';
import { CiMail, CiLock } from 'react-icons/ci';
import { BiHide, BiShow } from 'react-icons/bi';
import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/reducer/authReducer';
import Loader from '../../../components/Loader';

const loginSchema = Yup.object().shape({
  emailOrUsername: Yup.string()
    .required('email or username is required')
    .test('emailOrUsername', 'Invalid email or username', function (value) {
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const isUsername = /^[a-zA-Z0-9_]+$/.test(value);

      if (!isEmail && !isUsername) {
        return this.createError({ message: 'Invalid email or username' });
      }

      return true;
    }),
  password: Yup.string().required('password is required'),
});

export const FormLogin = ({ fromPage }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [displayLoader, setDisplayLoader] = useState('none');
  const handleClickshow = () => setShow(!show);

  const formik = useFormik({
    initialValues: {
      emailOrUsername: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setDisplayLoader('flex');
      try {
        let user;
        setTimeout(async () => {
          user = await dispatch(login(values.emailOrUsername, values.password));
          if (user) {
            if (user?.role_idrole === 3) {
              setDisplayLoader('none');
              navigate(fromPage ? fromPage : '/');
            } else if (user?.role_idrole === 1 || user?.role_idrole === 2) {
              setDisplayLoader('none');
              navigate('/dashboard');
            } else {
              setDisplayLoader('none');
              navigate(fromPage ? fromPage : '/');
            }
          } else {
            setDisplayLoader('none');
          }
        }, 1500);
      } catch (error) {
        setTimeout(() => {
          setDisplayLoader('none');
          toast.error('Login Failed');
        }, 1500);
      }
    },
  });

  return (
    <form
      style={{ width: '100%', height: '100%' }}
      onSubmit={formik.handleSubmit}
    >
      <Flex direction={'column'} gap={'20px'}>
        <Flex direction={'column'} gap={'30px'}>
          <FormControl
            isInvalid={
              formik.touched.emailOrUsername && formik.errors.emailOrUsername
            }
          >
            <FormLabel>Email or Username</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <CiMail />
              </InputLeftElement>
              <Input
                placeholder="Enter email or username"
                bgColor={'#F3F4F6FF'}
                name="emailOrUsername"
                value={formik.values.emailOrUsername}
                onChange={formik.handleChange}
              />
            </InputGroup>
            {formik.touched.emailOrUsername &&
              formik.errors.emailOrUsername && (
                <FormErrorMessage position={'absolute'}>
                  {formik.errors.emailOrUsername}
                </FormErrorMessage>
              )}
          </FormControl>

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
                type={show ? 'text' : 'password'}
                bgColor={'#F3F4F6FF'}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <InputRightElement>
                <Button size={'xm'} onClick={handleClickshow}>
                  {show ? <BiShow /> : <BiHide />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {formik.touched.password && formik.errors.password && (
              <FormErrorMessage position={'absolute'}>
                {formik.errors.password}
              </FormErrorMessage>
            )}
            <Flex justify={'end'} mt={'5px'}>
              <Button
                variant={'link'}
                fontSize={'14px'}
                fontWeight={400}
                onClick={() => navigate('/verify/forget-password')}
              >
                Lupa password?
              </Button>
            </Flex>
          </FormControl>
        </Flex>

        <Flex display={displayLoader} position={'absolute'} top={0} left={0}>
          <Loader />
        </Flex>

        <MyButton type="submit" value={<Text>Sign in</Text>} />
      </Flex>
    </form>
  );
};
