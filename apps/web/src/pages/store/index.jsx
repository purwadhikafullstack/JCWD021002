import { Box, Flex } from '@chakra-ui/react';
import { useWebSize } from '../../provider.websize';
import SideBar from '../../components/SideBar/SideBar';
import { Outlet } from 'react-router-dom';

const Store = () => {
  const { size, handleWebSize } = useWebSize();

  return (
    <Box bgColor={'white'}>
      <Box w={{ base: '100vw', md: size }} overflowX="hidden">
        <SideBar size={size} handleWebSize={handleWebSize} />
      </Box>

      <Box p={"20px"}>
        <Flex pl={size == '500px' ? '0px' : '150px'}>
          <Outlet />
        </Flex>
      </Box>
    </Box>
  );
};

export default Store;
