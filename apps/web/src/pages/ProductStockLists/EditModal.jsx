// EditModal.js

import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Select,
  Input,
  Button,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { handleEditToStock } from './services/serviceEditStock';

export function EditModal({
  editToStockModalIsOpen,
  selectedProductStock,
  selectedStore,
  setSelectedStore,
  stockAmount,
  setStockAmount,
  handleCancel,
  dataStore,
}) {
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const token = localStorage.getItem('token');

  return (
    <Modal
            isOpen={editToStockModalIsOpen}
            onClose={() => setEditToStockModalIsOpen(false)}
          >
            {/* ... (other modal content) */}
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Product Stock</ModalHeader>

              <ModalCloseButton />
              <ModalBody>
                <Text fontWeight="bold">Name Product</Text>
                <Text>{selectedProductStock.name}</Text>
                <Text fontWeight="bold">Store</Text>
                <Select
                  placeholder="Select store"
                  value={selectedStore}
                  onChange={(e) => setSelectedStore(e.target.value)}
                  isDisabled={user.store_idstore ? true : false}
                >
                  {dataStore?.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
                </Select>
                <Text fontWeight="bold">Stock Amount</Text>
                <Input
                  type="number"
                  onInput={(e) => {
                    const enteredValue = e.target.value;
                    const parsedValue = Number(enteredValue);

                    if (!isNaN(parsedValue) && parsedValue >= 0) {
                      setStockAmount(String(parsedValue));
                    }
                  }}
                  placeholder="Enter stock amount"
                  value={stockAmount}
                  onChange={(e) => setStockAmount(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={() => {handleEditToStock(selectedProductStock, stockAmount, token)
      .then(() => {
        // handleEditToStock was successful, now you can call handleCancel
        handleCancel();
      })
      .catch((error) => {
        // handleEditToStock encountered an error, you can handle the error here
        console.error('Error in handleEditToStock:', error);
      });} }>
                  Edit to Stock
                </Button>
                <Button
                  colorScheme="red"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
  );
}
