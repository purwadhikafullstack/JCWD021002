import { useEffect } from 'react';
import {
  Box,
  Checkbox,
  Flex,
  Text,
  Image,
  Stack,
  VStack,
  Button,
} from '@chakra-ui/react';
import EmptyCart from '../../assets/empty_cart.png';
import { CartItemList } from './Cart.ItemList';

export const CartBody = ({
  user,
  uniqueStoreIds,
  carts,
  fetchCart,
  handleCheckboxStoreChange,
  selectedItems,
  setSelectedItems,
  quantities,
  setQuantities,
  setIsScrolled,
  showToast,
}) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isStoreAllSelected = (storeId) => {
    const storeProductIds = carts
      .filter((item) => item.ProductStock.Store.id === storeId)
      .map((item) => item.id);

    return (
      storeProductIds.length > 0 &&
      storeProductIds.length ===
        selectedItems.filter((item) => storeProductIds.includes(item)).length
    );
  };

  return (
    <Box height='100vh' overflowY='auto' position='relative'>
      {uniqueStoreIds.length === 0 ? (
        <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        h='70vh'
        gap={4}
      >
        <VStack gap={0}>
          <Image src={EmptyCart} w='10em' />
          <Text fontSize='12pt'>Wah, keranjang belanjamu masih kosong</Text>
          <Text fontSize='11pt' color='gray'>
            Yuk, telusuri promo menarik di Groceria!
          </Text>
        </VStack>
        <Button colorScheme='teal' variant='outline'>
          Belanja Sekarang
        </Button>
      </Flex>
      ) : (
        uniqueStoreIds.map((storeId, storeIndex) => (
            <Stack
              key={storeIndex}
              pt={3}
              pb={4}
              top={0}
              marginBottom='12px'
              backgroundColor='white'
            >
              <Box
                w='full'
                pl={4}
                pr={4}
                pb={2}
                borderBottom='1px'
                borderBottomColor='rgba(192, 192, 192, 0.5)'
                marginBottom='5px'
              >
                <Checkbox
                  colorScheme='green'
                  isChecked={isStoreAllSelected(storeId)}
                  onChange={() => handleCheckboxStoreChange(storeId)}
                >
                  {carts.find((item) => item.ProductStock.Store.id === storeId)
                    ?.ProductStock.Store.name || 'Loading...'}
                </Checkbox>
              </Box>
              <Flex flexDirection='column' pl={4} pr={4} gap={2}>
                {carts
                  .filter((item) => item.ProductStock.Store.id === storeId)
                  .map((item) => (
                    <CartItemList
                      key={item.id}
                      user={user}
                      carts={carts}
                      fetchCart={fetchCart}
                      storeId={storeId}
                      item={item}
                      selectedItems={selectedItems}
                      setSelectedItems={setSelectedItems}
                      isStoreAllSelected={isStoreAllSelected}
                      handleCheckboxStoreChange={handleCheckboxStoreChange}
                      quantities={quantities}
                      setQuantities={setQuantities}
                      showToast={showToast}
                    />
                  ))}
              </Flex>
            </Stack>
          ))
      )}
    </Box>
  );
};
