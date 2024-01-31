/* eslint-disable react/prop-types */
import axios from 'axios';
import {
  Checkbox,
  Flex,
  Text,
  IconButton,
  Image,
  Stack,
} from '@chakra-ui/react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { HiMinusSmall } from 'react-icons/hi2';
import { FiPlus } from 'react-icons/fi';
import angkaRupiahJs from '@develoka/angka-rupiah-js';

export const CartItemList = ({
  user,
  fetchCart,
  item,
  selectedItems,
  setSelectedItems,
  quantities,
  setQuantities,
  showToast,
}) => {
  const handleCheckboxChange = (cartDetailId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(cartDetailId)
        ? prevSelectedItems.filter((item) => item !== cartDetailId)
        : [...prevSelectedItems, cartDetailId],
    );
  };

  const updateQuantities = async (productId, newQuantity) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/cart/update/${
          user.id
        }/${productId}/${newQuantity}`,
      );

      if (response.status === 200)
        showToast('success', 'Item quantity updated successfully!');
      else {
        console.error('Failed to update item quantity:', response.data);
        showToast('error', 'Failed to update item quantity');
      }
    } catch (err) {
      console.error('Error updating item quantity:', err);
      showToast('error', 'Error updating item quantity');
    }
  };
  
  const deleteCartProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/cart/delete-product/${user.id}`,
        { data: { productId } }
      );
  
      if (response.status === 200) {
        showToast('success', 'Item quantity deleted successfully!');
        await fetchCart(user.id);
      } else {
        console.error('Failed to delete item:', response.data);
        showToast('error', 'Failed to delete item');
      }
    } catch (err) {
      console.error('Error deleting item:', err);
      showToast('error', 'Error deleting item');
    }
  };

  const handleQuantityChange = (cartDetailId, productId, quantityChange) => {
    const newQuantity = quantities[cartDetailId] + quantityChange;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [cartDetailId]: newQuantity,
    }));
    updateQuantities(productId, newQuantity);
  };

  const handleDecrement = (cartDetailId, productId) => {
    if (quantities[cartDetailId] > 1)
      handleQuantityChange(cartDetailId, productId, -1);
  };


  const handleIncrement = (cartDetailId, productId) =>
    handleQuantityChange(cartDetailId, productId, 1);

  const handleDeleteProduct = async (cartDetailId, productId) => {
    if (quantities[cartDetailId] === 1) await deleteCartProduct(productId);
  };

  return (
    <Flex key={item.id} flexDirection='row' gap={2}>
      <Checkbox
        colorScheme='green'
        isChecked={selectedItems.includes(item.id)}
        onChange={() => handleCheckboxChange(item.id)}
      />
      <Image
        w={'10vw'}
        height='15vh'
        backgroundColor='white'
        src={`${import.meta.env.VITE_API_IMAGE_URL}/products/${
          item.ProductStock?.Product?.ProductImages[0]?.imageUrl
        }`}
        alt={item.ProductStock.Product.name}
        objectFit='contain'
        borderRadius='10px'
      />
      <Stack spacing={1}>
        <Text>{item.ProductStock.Product.name}</Text>
        <Text fontSize='md' fontWeight='bold' color='tomato'>
        {angkaRupiahJs(item.price, {formal: false})}
        </Text>
        <Flex gap={1} border='1px' borderColor='gray.200'>
          <IconButton
            onClick={() =>
              quantities[item.id] !== 1
                ? handleDecrement(
                    item.id,
                    item.productStock_idproductStock
                  )
                : handleDeleteProduct(
                    item.id,
                    // item.productStock_idproductStock
                  )
            }
            h='30px'
            borderRadius={0}
            variant='outline'
            color='black'
            icon={
              quantities[item.id] === 1 ? (
                <RiDeleteBinLine />
              ) : (
                <HiMinusSmall />
              )
            }
          />
          <Text mx='10px' fontSize='lg'>
            {quantities[item.id]}
          </Text>
          <IconButton
            onClick={() =>
              handleIncrement(item.id, item.productStock_idproductStock)
            }
            h='30px'
            borderRadius={0}
            variant='outline'
            color='black'
            fontSize='18px'
            icon={<FiPlus />}
          />
        </Flex>
      </Stack>
    </Flex>
  );
};
