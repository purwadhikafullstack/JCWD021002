import { useNavigate } from 'react-router-dom';
import { Flex, IconButton, Heading, Box } from '@chakra-ui/react';
import { IconChevronLeft } from '@tabler/icons-react';
import { ResizeButton } from '../ResizeButton';
import { CartTotalSelected } from './Cart.TotalSelected';

export const CartHeader = ({ handleWebSize, size, user,
  selectedItems,
  isScrolled,
  deleteCartProduct,
  showToast }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box
    position="sticky"
    top={0}
    bgColor="white"
    zIndex={100}
    // px="15px"
    w="full"
    h='10vh'
    justify="space-between"
    align="center"
    // borderBottom="1px solid rgba(128, 128, 128, 0.3)"
    // boxShadow="0px 3px 3px -2px rgba(0, 0, 0, 0.1)"
    >
    <Flex
      // position="sticky"
      // top={0}
      // bgColor="white"
      zIndex={99}
      // px="15px"
      w="full"
      h="10vh"
      justify="space-between"
      align="center"
    boxShadow="0px 3px 3px -2px rgba(0, 0, 0, 0.1)"
      borderBottom="1px solid rgba(128, 128, 128, 0.3)"
      >
      <Flex gap={0} alignItems="center" justifyContent="center">
        <IconButton
          variant="ghost"
          icon={<IconChevronLeft />}
          onClick={handleGoBack}
          _hover={{ color: 'gray.600', opacity: 0.9 }}
          transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
          />
        <Heading size="sm">Keranjang</Heading>
      </Flex>
      <ResizeButton
        webSize={size}
        handleWebSize={handleWebSize}
        color="black"
        />
    </Flex>
    <CartTotalSelected
        user={user}
        selectedItems={selectedItems}
        isScrolled={isScrolled}
        showToast={showToast}
        deleteCartProduct={deleteCartProduct}
        />
        </Box>
  );
};
