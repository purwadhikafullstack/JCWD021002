import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ErrorRobbotImg from '../src/assets/Oops!404Errorwithabrokenrobot-cuate.png';

export default function ErrorPage() {
  return (
    <Flex h={'100vh'} justify={'center'} align={'center'} direction={'column'} gap={5}>
      <Image src={ErrorRobbotImg} w={'300px'} />
      <Flex direction={'column'} justify={'center'} align={'center'} gap={3}>
        <Text fontSize={'20px'} fontWeight={700}>
          Maaf, halaman tidak dapat ditemukan.
        </Text>
        <Text>
          <Link to="/">
            <Button variant={'link'} fontWeight={400}>
              Kembali ke Halaman Utama
            </Button>
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}
