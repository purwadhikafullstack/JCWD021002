import React from 'react';
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  HStack,
} from '@chakra-ui/react';
import {
    IconSortAscending2,
    IconSortDescending2,
    IconAbc,
    IconTags,
  } from '@tabler/icons-react';
import { useSelector } from 'react-redux';

export const FilterModal = ({ isOpen, onClose, setSortField, setSortOrder, dataCategory, 
    categoryId, setCategoryId, dataStore, storeId, setStoreId, 
    statusStock, setStatusStock, sortOrder, sortField }) => {
  const { user, isLogin } = useSelector((state) => state.AuthReducer);

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Filter</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Sort Order</Text>
                <HStack>
                  <Button
                    leftIcon={<IconSortAscending2 />}
                    border="solid black 1px"
                    borderRadius="full"
                    onClick={() => setSortOrder('asc')}
                    isDisabled={sortOrder == 'asc' ? true : false}
                  >
                    Ascending
                  </Button>
                  <Button
                    leftIcon={<IconSortDescending2 />}
                    border="solid black 1px"
                    borderRadius="full"
                    onClick={() => setSortOrder('desc')}
                    isDisabled={sortOrder == 'desc' ? true : false}
                  >
                    Descending
                  </Button>
                </HStack>
                <Text>Sort Field</Text>
                <HStack>
                  <Button
                    leftIcon={<IconAbc />}
                    border="solid black 1px"
                    borderRadius="full"
                    onClick={() => setSortField('name')}
                    isDisabled={sortField == 'name' ? true : false}
                  >
                    Name
                  </Button>
                  <Button
                    leftIcon={<IconTags />}
                    border="solid black 1px"
                    borderRadius="full"
                    onClick={() => setSortField('price')}
                    isDisabled={sortField == 'price' ? true : false}
                  >
                    Price
                  </Button>
                </HStack>
                <Text>Category</Text>
                <Select
                  placeholder="Select option"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  {dataCategory?.categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category}
                    </option>
                  ))}
                </Select>
                <Text fontWeight="bold">Store</Text>
                <Select
                  placeholder="Select store"
                  value={storeId}
                  onChange={(e) => setStoreId(e.target.value)}
                  isDisabled={user.store_idstore ? true : false}
                >
                  {dataStore?.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
                </Select>
                <Text>Status Stock</Text>
                <Select
                  placeholder="Select option"
                  value={statusStock}
                  onChange={(e) => setStatusStock(e.target.value)}
                >
                  <option value={''}>All</option>
                  <option value={parseInt(1)}>Active</option>
                  <option value={parseInt(0)}>Deactive</option>
                </Select>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
    </>
  );
}

