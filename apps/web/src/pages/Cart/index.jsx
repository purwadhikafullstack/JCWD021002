import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  useToast,
  Flex,
  Heading,
  VStack,
  Button,
  Image,
  Text,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { CartHeader } from '../../components/Cart/Cart.Header';
import { CartBody } from '../../components/Cart/Cart.Body';
import { useWebSize } from '../../provider.websize';
import { CartSidebar } from '../../components/Cart/Cart.Sidebar';
import EmptyCart from '../../assets/empty_cart.png';

export const Cart = () => {
  const user = useSelector((state) => state.AuthReducer.user);
  const toast = useToast();
  const [carts, setCarts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const { size, handleWebSize } = useWebSize();

  const userId = user?.id;

  const showToast = (type, message) => {
    toast({
      title: message,
      status: type,
      duration: 3000,
      isClosable: true,
    });
  };

  const fetchCart = async (userId) => {
    try {
      if (!userId) {
        console.warn('User ID not available. Skipping cart fetch.');
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart/${userId}`,
      );

      console.log('Cart API Response:', response);

      const updatedCart = response?.data?.data[0]?.CartDetails || [];
      const updatedQuantities = updatedCart.reduce(
        (q, item) => ({
          ...q,
          [item.productStock_idproductStock]: item.quantity,
        }),
        {},
      );

      setCarts(updatedCart);
      setQuantities(updatedQuantities);
      setSelectedItems([]);

      return updatedCart;
    } catch (err) {
      console.warn('Cart not found for user:', userId);
    }
  };

  useEffect(() => {
    fetchCart(userId);
  }, [user, userId]);

  const handleCheckboxAllChange = () => {
    setSelectedItems((prevSelectedItems) => {
      const allProductIds = carts.map(
        (item) => item.productStock_idproductStock,
      );
      return prevSelectedItems.length === allProductIds.length
        ? []
        : allProductIds;
    });
  };

  const handleCheckboxStoreChange = (storeId) => {
    setSelectedItems((prevSelectedItems) => {
      const storeProductIds = carts
        .filter((item) => item.ProductStock.Store.id === storeId)
        .map((item) => item.productStock_idproductStock);

      const allStoreProductsSelected =
        storeProductIds.length > 0 &&
        storeProductIds.every((productId) =>
          prevSelectedItems.includes(productId),
        );

      let updatedSelectedItems;

      if (allStoreProductsSelected) {
        updatedSelectedItems = prevSelectedItems.filter(
          (item) => !storeProductIds.includes(item),
        );
      } else {
        updatedSelectedItems = [
          ...prevSelectedItems.filter(
            (item) => !storeProductIds.includes(item),
          ),
          ...storeProductIds,
        ];
      }

      if (updatedSelectedItems.length === 0) {
        return [];
      }

      return updatedSelectedItems;
    });
  };

  const deleteCartProduct = async (productStockId) => {
    console.log(productStockId);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/cart/delete-product/${userId}`,
        { data: { productStockId } },
      );

      if (response.status === 200) {
        showToast('success', 'Item quantity deleted successfully!');
        await fetchCart(userId);
      } else {
        console.error('Failed to delete item:', response.data);
        showToast('error', 'Failed to delete item');
      }
    } catch (err) {
      console.error('Error deleting item:', err);
      showToast('error', 'Error deleting item');
    }
  };

  return (
    <Box
      flexDirection="column"
      p="0"
      w={{ base: '100vw', md: size }}
      h="fit-content"
      transition="width 0.3s ease"
      backgroundColor="#f5f5f5"
      display="flex"
    >
      <CartHeader
        handleWebSize={handleWebSize}
        size={size}
        user={user}
        selectedItems={selectedItems}
        isScrolled={isScrolled}
        deleteCartProduct={deleteCartProduct}
        showToast={showToast}
      />
      {carts.length === 0 ? (
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          w="full"
          h="100vh"
          p={0}
          gap={4}
        >
          <VStack gap={0}>
            <Image src={EmptyCart} w="10em" />
            <Text fontSize="12pt">Wah, keranjang belanjamu masih kosong</Text>
            <Text fontSize="11pt" color="gray">
              Yuk, telusuri promo menarik di Groceria!
            </Text>
          </VStack>
          <Button colorScheme="teal" variant="outline">
            Belanja Sekarang
          </Button>
        </Flex>
      ) : (
        <>
          <Heading hidden={size == '500px'} px={175} py={5} size="md">
            Keranjang
          </Heading>

          <Flex
            w={{ base: '100vw', md: size }}
            gap={5}
            alignItems="flex-start"
            px={size === '500px' ? 0 : 175}
            flexDirection={size == '500px' ? 'column' : 'row'}
            h={'full'}
          >
            <CartBody
              size={size}
              deleteCartProduct={deleteCartProduct}
              user={user}
              handleCheckboxAllChange={handleCheckboxAllChange}
              setIsScrolled={setIsScrolled}
              uniqueStoreIds={[
                ...new Set(carts.map((item) => item.ProductStock.Store.id)),
              ]}
              carts={carts}
              fetchCart={fetchCart}
              handleCheckboxStoreChange={handleCheckboxStoreChange}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              quantities={quantities}
              setQuantities={setQuantities}
              showToast={showToast}
              isScrolled={isScrolled}
            />
            <Flex
              position={size == '500px' ? 'fixed' : 'sticky'}
              top={size == '500px' ? undefined : '85px'}
              bottom={0}
            >
              <CartSidebar
                size={size}
                userId={userId}
                carts={carts}
                selectedItems={selectedItems}
                handleCheckboxAllChange={handleCheckboxAllChange}
                quantities={quantities}
              />
            </Flex>
          </Flex>
        </>
      )}
    </Box>
  );
};
