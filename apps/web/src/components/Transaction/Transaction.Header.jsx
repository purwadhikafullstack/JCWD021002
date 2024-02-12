import { Flex, Heading, IconButton } from '@chakra-ui/react';
import { ResizeButton } from '../../components/ResizeButton';
import { IconChevronLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const TransactionHeader = ({ handleWebSize, size }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // navigate(-1);
    navigate('/');
  };
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
      <Heading hidden={size === '500px'? false : true} size="sm">Pesanan Saya</Heading>
      <IconButton
          hidden={size == '500px' ? true : false}
          variant='ghost'
          icon={<IconChevronLeft />}
          onClick={handleGoBack}
          _hover={{ color: 'gray.600', opacity: 0.9 }}
            transition='color 0.3s ease-in-out, opacity 0.3s ease-in-out'
        />
      <ResizeButton
        webSize={size}
        handleWebSize={handleWebSize}
        color="black"
      />
    </Flex>
  );
};
