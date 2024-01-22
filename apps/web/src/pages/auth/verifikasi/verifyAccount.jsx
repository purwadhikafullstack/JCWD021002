import { Flex, Text } from '@chakra-ui/react';

export const VerifyAccount = () => {
  return (
    <Flex direction={'column'} gap={2}>
      <Text fontSize={'28px'} fontWeight={700}>
        Verifikasi Email
      </Text>
      <Text fontSize={'14px'} textAlign={'justify'}>
        Masukkan alamat email yang Anda gunakan saat bergabung dan kami akan
        mengirimkan email untuk melakukan verifikasi akun anda.
      </Text>
    </Flex>
  );
};
