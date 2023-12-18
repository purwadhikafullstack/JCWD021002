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
import { CiMail, CiLock } from 'react-icons/ci';
import { BiHide, BiShow } from 'react-icons/bi';
import { useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

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
  password: Yup.string().required('password is required')
});

export const FormLogin = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClickshow = () => setShow(!show);

  const Login = async (emailOrUsername, password) => {
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', {
        emailOrUsername,
        password,
      });
      alert('login success');
      const role = res.data.data.user.role_idrole;
      if (role == 3) {
        navigate('/');
      } else if (role == 2) {
        navigate('/admin');
      } else {
        navigate('/superadmin');
      }
    } catch (err) {
      alert(err.response?.data);
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      emailOrUsername: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      Login(values.emailOrUsername, values.password);
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
            {formik.touched.emailOrUsername && formik.errors.emailOrUsername && (
              <FormErrorMessage position={"absolute"}>{formik.errors.emailOrUsername}</FormErrorMessage>
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
              <FormErrorMessage position={"absolute"}>{formik.errors.password}</FormErrorMessage>
            )}
          </FormControl>
        </Flex>

        <MyButton type="submit" value={<Text>Sign in</Text>} />
      </Flex>
    </form>
  );
};
