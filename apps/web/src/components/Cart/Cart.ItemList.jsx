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
import { calculateDiscountPrice } from '../../utils/calculateDiscountPrice';

export const CartItemList = ({
  user,
  fetchCart,
  item,
  selectedItems,
  setSelectedItems,
  quantities,
  setQuantities,
  showToast,
  deleteCartProduct,
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
  

  const handleQuantityChange = (productId, quantityChange) => {
    const newQuantity = quantities[productId] + quantityChange;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
    updateQuantities(productId, newQuantity);
  };

  const handleDecrement = (productId) => {
    if (quantities[productId] > 1)
      handleQuantityChange(productId, -1);
  };


  const handleIncrement = (productId) =>
    handleQuantityChange(productId, 1);

  const handleDeleteProduct = async (productStockId) => {
    if (quantities[productStockId] === 1) await deleteCartProduct(productStockId);
  };

  function formatPriceToIDR(price) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(price);
  }

  return (
    <Flex key={item.id} flexDirection='row' gap={2}>
      <Checkbox
        colorScheme='green'
        isChecked={selectedItems.includes(item.productStock_idproductStock)}
        onChange={() => handleCheckboxChange(item.productStock_idproductStock)}
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
        {formatPriceToIDR(calculateDiscountPrice(item?.price, item?.ProductStock?.Discounts))}
        </Text>
        <Flex gap={1} border='1px' borderColor='gray.200'>
          <IconButton
            onClick={() =>
              quantities[item.productStock_idproductStock] !== 1
                ? handleDecrement(
                    item.productStock_idproductStock
                  )
                : handleDeleteProduct(
                    item.productStock_idproductStock
                  )
            }
            h='30px'
            borderRadius={0}
            variant='outline'
            color='black'
            icon={
              quantities[item.productStock_idproductStock] === 1 ? (
                <RiDeleteBinLine />
              ) : (
                <HiMinusSmall />
              )
            }
          />
          <Text mx='10px' fontSize='lg'>
            {quantities[item.productStock_idproductStock]}
          </Text>
          <IconButton
            onClick={() =>
              handleIncrement(item.productStock_idproductStock)
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
