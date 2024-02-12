/* eslint-disable react/prop-types */
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
  Heading,
} from '@chakra-ui/react';
import { CartItemList } from './Cart.ItemList';
import { CartTotalSelected } from './Cart.TotalSelected';
import { CheckboxSelectedAll } from './Cart.CheckboxSelectedAll';

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
  isScrolled,
  setIsScrolled,
  showToast,
  deleteCartProduct,
  handleCheckboxAllChange,
  size,
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
      .map((item) => item.productStock_idproductStock);

    return (
      storeProductIds.length > 0 &&
      storeProductIds.length ===
        selectedItems.filter((item) => storeProductIds.includes(item)).length
    );
  };

  return (
      <Stack w='full' height='100vh' overflowY='auto' position='relative'>
            <CheckboxSelectedAll
            carts={carts}
            size={size}
            handleCheckboxAllChange={handleCheckboxAllChange}
        user={user}
        selectedItems={selectedItems}
        isScrolled={isScrolled}
        showToast={showToast}
        deleteCartProduct={deleteCartProduct}
        />
    {/* <Box height='100vh'> */}
      {/* <CartTotalSelected
        user={user}
        selectedItems={selectedItems}
        isScrolled={isScrolled}
        showToast={showToast}
        /> */}
      
      
        {uniqueStoreIds.map((storeId, storeIndex) => (
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
              <Flex flexDirection='column' px={4} gap={2}>
                {carts
                  .filter((item) => item.ProductStock.Store.id === storeId)
                  .map((item) => (
                    <CartItemList
                    size={size}
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
                    deleteCartProduct={deleteCartProduct}
                    />
                    ))}
              </Flex>
            </Stack>
          ))
          }
    {/* </Box> */}
          </Stack>
  );
};
