import { Flex, Heading } from '@chakra-ui/react';
import { ResizeButton } from '../../components/ResizeButton';

export const TransactionHeader = ({ handleWebSize, size }) => {
  return (
    <Flex
      position="sticky"
      top={0}
      bgColor="white"
      zIndex={99}
      px="25px"
      w="full"
      h="10vh"
      justify="space-between"
      align="center"
      //   boxShadow='md'
      //   boxShadow='0px 2px 4px rgba(0, 0, 0, 0.2), 0px 1px 2px rgba(0, 0, 0, 0.1)'
      boxShadow="0px 4px 4px -2px rgba(0, 0, 0, 0.1)"
    >
      {/* <Sidebar size={size} handleWebSize={handleWebSize}/> */}
      <Heading size="sm">Pesanan Saya</Heading>
      <ResizeButton
        webSize={size}
        handleWebSize={handleWebSize}
        color="black"
      />
    </Flex>
  );
};
