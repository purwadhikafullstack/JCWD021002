import { useNavigate } from 'react-router-dom';
import { Flex, IconButton, Heading } from '@chakra-ui/react';
import { IconChevronLeft } from '@tabler/icons-react';
import { ResizeButton } from '../../components/ResizeButton';

<<<<<<< Updated upstream
export const CheckoutHeader = ({ handleWebSize, size }) => {
=======
export const CheckoutHeader = ({ heading, handleWebSize, size }) => {
>>>>>>> Stashed changes
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Flex
      position='sticky'
      top={0}
      bgColor='white'
      zIndex={99}
      px='15px'
      w='full'
      h='10vh'
      justify='space-between'
      align='center'
      //   boxShadow='md'
      //   boxShadow='0px 2px 4px rgba(0, 0, 0, 0.2), 0px 1px 2px rgba(0, 0, 0, 0.1)'
      boxShadow='0px 4px 4px -2px rgba(0, 0, 0, 0.1)'
    >
      <Flex gap={0} alignItems='center' justifyContent='center'>
        <IconButton
          variant='ghost'
          icon={<IconChevronLeft />}
          onClick={handleGoBack}
          _hover={{ color: 'gray.600', opacity: 0.9 }}
            transition='color 0.3s ease-in-out, opacity 0.3s ease-in-out'
        />
<<<<<<< Updated upstream
        <Heading size='sm'>Checkout</Heading>
=======
        <Heading size='sm'>{heading}</Heading>
>>>>>>> Stashed changes
      </Flex>
      <ResizeButton
        webSize={size}
        handleWebSize={handleWebSize}
        color='black'
      />
    </Flex>
  );
};
