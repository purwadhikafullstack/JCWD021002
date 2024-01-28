import { Flex, Text} from "@chakra-ui/react";

export const VerifyForgetPassword = () => {
  return (
    <Flex direction={'column'} gap={3}>
      <Text fontSize={'28px'} fontWeight={700}>
      Lupa Password
      </Text>
      <Text>Masukkan alamat email yang Anda gunakan saat bergabung dan kami akan mengirimkan instruksi untuk mereset kata sandi Anda.</Text>
    </Flex>
  );
};
