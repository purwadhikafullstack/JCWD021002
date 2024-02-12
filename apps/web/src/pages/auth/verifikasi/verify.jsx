import {
  Flex,
  FormControl,
  Input,
  FormLabel,
  FormErrorMessage,
  Image,
} from '@chakra-ui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import { MyButton } from '../../../components/Button';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useWebSize } from '../../../provider.websize';
import { Link } from 'react-router-dom';
import LogoGroceria from '../../../assets/Groceria-no-Bg.png';
import { ResizeButton } from '../../../components/ResizeButton';
import { useEffect, useState } from 'react';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'email is invalid',
    )
    .required('Email is required'),
});

export const Verify = () => {
  const navigate = useNavigate();
  const { size } = useWebSize();
  const [isNew, setIsNew] = useState();

  const location = useLocation();

  useEffect(() => {
    if (location?.pathname == '/verify/forget-password') {
      setIsNew(true);
    } else if (location?.pathname == '/verify/email') {
      setIsNew(false);
    }
  }, [location]);

  const verify = async (email, isNew) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/verify`,
        {
          email,
          isNew: isNew,
        },
      );
      const state = { email: email, isNew: isNew };
      if (res) {
        navigate('/sentMailSuccess', { state });
      }
    } catch (err) {
      toast.error(err.response.data);
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      verify(values.email, isNew);
    },
  });
  return (
    <Flex
      direction={'column'}
      w={{ base: '100vw', md: size }}
      h={{ base: '100vh', lg: '100vh' }}
      transition="width 0.3s ease"
      bgSize={size == '500px' ? 'contain' : 'cover'}
      bgColor={'white'}
    >
      <Flex
        position={'relative'}
        // top={{ base: '20px', lg: '-30px' }}
        px={'20px'}
        h={'10vh'}
        justify={'space-between'}
        align={'center'}
      >
        <Link to={'/'}>
          <Image src={LogoGroceria} h={'30px'} />
        </Link>
        <ResizeButton color={'black'} />
      </Flex>
      <Flex px={size == '500px' ? '30px' : '200px'} width={'100%'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            display={'flex'}
            gap={'40px'}
            flexDirection={'column'}
            mb={'25px'}
            isInvalid={formik.touched.email && formik.errors.email}
          >
            <Outlet />
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
                <FormErrorMessage
                  position={'absolute'}
                  left={'5px'}
                  bottom={'-18px'}
                  fontSize={'12px'}
                >
                  {formik.errors.email}
                </FormErrorMessage>
              )}
            </Flex>
          </FormControl>

          <MyButton type={'submit'} value={'Kirim verifikasi'} />
        </form>
      </Flex>
    </Flex>
  );
};
