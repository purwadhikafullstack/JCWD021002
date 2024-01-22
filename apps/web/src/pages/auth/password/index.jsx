import { Flex, Image } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { useWebSize } from '../../../provider.websize';
import { Link } from 'react-router-dom';
import LogoGroceria from '../../../assets/Groceria-no-Bg.png'
import { ResizeButton } from '../../../components/ResizeButton';

export const ResetPassword = () => {
  const { size } = useWebSize();
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
        <Link to={"/"}>
          <Image src={LogoGroceria} h={'30px'} />
        </Link>
        <ResizeButton
          color={'black'}
        />
      </Flex>
      <Outlet />
    </Flex>
  );
};
