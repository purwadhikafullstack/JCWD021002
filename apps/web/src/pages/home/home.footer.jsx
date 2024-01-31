import { Box, Flex, Link, Text, Image } from '@chakra-ui/react';
import imageGroceria from '../../assets/Groceria-no-Bg.png';
import { useWebSize } from '../../provider.websize';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaFacebook } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';

export const Footer = () => {
  const { size } = useWebSize();

  return (
    <Flex
      w={{base: '100vw', md: size}}
      p={'20px'}
      direction={'column'}
      bgColor={'#F2F5E4FF'}
      mt={'30px'}
      gap={5}
      justify={'center'}
      align={'center'}
    >
      <Flex direction={'column'} align={'center'}>
        <Flex justify={'center'} align={'center'}>
          <Box>
            <Image src={imageGroceria} w={'150px'} />
          </Box>
        </Flex>
        <Flex justify={'space-evenly'} p={'10px'} fontSize={'14px'}>
          <Flex gap={3} fontWeight={600} color={'colors.primary'}>
            <Link>Home</Link>
            <Link>Products</Link>
            <Link>About as</Link>
            <Link>Contact</Link>
          </Flex>
        </Flex>
      </Flex>
      <Flex align={'center'} direction={'column'} gap={2}>
        <Text fontSize="12px">© 2024 Groceria. All rights reserved.</Text>
        <Flex gap={5}>
          <Link>
            <FaSquareXTwitter />
          </Link>
          <Link>
            <FaFacebook color='blue'/>
          </Link>
          <Link>
            <IoLogoWhatsapp color='green'/>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};
