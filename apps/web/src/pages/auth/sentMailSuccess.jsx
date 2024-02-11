/* eslint-disable react/prop-types */
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import LogoMail from '../../assets/mail.png';
import { useWebSize } from '../../provider.websize';
import { MyButton } from '../../components/Button';
import axios from 'axios';
import toast from 'react-hot-toast';

export const SentMailSuccess = () => {
  const { size } = useWebSize();
  const location = useLocation();
  const { email, isNew } = location.state || {};

  const handleReVerify = async (email, isNew) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/auth/reverify`, {
        email,
        isNew,
      });
      toast.success(res?.data?.message);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <Flex
      direction={'column'}
      w={{ base: '100vw', md: size }}
      h={'100vh'}
      transition="width 0.3s ease"
      bgSize={size == '500px' ? 'contain' : 'cover'}
      justify={'space-between'}
      bgColor={'white'}
    >
      <Flex
        position={'relative'}
        px={'30px'}
        h={'10vh'}
        justify={'space-between'}
        align={'center'}
      >
        <Link to={'/'}>
          <Image src={LogoGroceria} h={'30px'} />
        </Link>
        <ResizeButton color={'black'} />
      </Flex>

      <Flex
        justify={'center'}
        align={'center'}
        direction={'column'}
        gap={5}
        px={size == '500px' ? '0' : { base: 0, lg: '200px', xl: '400px' }}
      >
        <Flex
          w={'120px'}
          bgColor={'colors.secondary'}
          p={'25px'}
          borderRadius={'20px'}
        >
          <Image src={LogoMail} />
        </Flex>
        <Flex direction={'column'} justify={'center'} align={'center'}>
          <Text fontSize={'32px'} fontWeight={700}>
            Check your email
          </Text>
          <Flex p={'10px 90px'}>
            <Text textAlign={'center'}>
              Please check the verification link that
              <span style={{ fontWeight: '600' }}>
                {' '}
                we sent to your email address
              </span>{' '}
              to complete the verification process.
            </Text>
          </Flex>
        </Flex>
        <Flex direction={'column'} w={size == '500px' ? '80%' : '30%'}>
          <a
            href="https://mail.google.com/mail/u/2"
            target="_blank"
            rel="noreferrer"
          >
            <MyButton value={'Open email'} />
          </a>
        </Flex>
      </Flex>

      <Flex
        justify={'center'}
        align={'center'}
        w={'full'}
        mb={'20px'}
        textAlign={'center'}
        fontSize={'12px'}
      >
        <Text>
          Jika Anda tidak menerima email dalam beberapa menit, periksa folder
          spam atau{' '}
          <Button
            variant={'link'}
            fontSize={'12px'}
            color={'blue'}
            onClick={() => handleReVerify(email, isNew)}
          >
            kirim ulang email verifikasi{' '}
          </Button>
          .
        </Text>
      </Flex>
    </Flex>
  );
};
