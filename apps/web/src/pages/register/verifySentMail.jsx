/* eslint-disable react/prop-types */
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ResizeButton } from '../../components/ResizeButton';
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import LogoRocket from '../../assets/roket.png';

export const VerifySentMail = ({ size, handleWebSize }) => {
  return (
    <Flex
      direction={'column'}
      w={{ base: '100vw', md: size }}
      h={'100vh'}
      transition="width 0.3s ease"
      bgSize={size == '500px' ? 'contain' : 'cover'}
      justify={'space-between'}
    >
      <Flex
        position={'relative'}
        px={'20px'}
        h={'10vh'}
        justify={'space-between'}
        align={'center'}
      >
        <Link to={'/'}>
          <Image src={LogoGroceria} h={'30px'} />
        </Link>
        <ResizeButton
          webSize={size}
          handleWebSize={handleWebSize}
          color={'black'}
        />
      </Flex>

      <Flex justify={'center'} align={'center'} direction={'column'}>
        <Flex>
          <Image src={LogoRocket} />
        </Flex>
        <Flex>
          <Text fontSize={'32px'} fontWeight={700}>
            Verify your email
          </Text>
        </Flex>
        <Flex p={'30px 90px'}>
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
      <Link to={'/login'} style={{ width: '100%' }}>
        <Flex mb={'20px'} w={'full'} justify={'center'}>
          <Button
            w={'80%'}
            borderRadius={'12px'}
            border={'1px solid'}
            borderColor={'colors.primary'}
            color={'colors.primary'}
            fontWeight={400}
          >
            Beck to login
          </Button>
        </Flex>
      </Link>
    </Flex>
  );
};
