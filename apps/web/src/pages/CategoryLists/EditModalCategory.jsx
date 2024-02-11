// EditCategoryModal.js
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  Input,
  VStack,
  Button,
  IconButton,
  Image,
  Box,
  FormLabel,
} from "@chakra-ui/react";
import { FiUpload } from "react-icons/fi";
import { IconPlus } from "@tabler/icons-react";
import LogoGroceria from '../../assets/Logo-Groceria-no-Bg.png';

export const EditModalCategory = ({
  editModalOpen,
  setEditModalOpen,
  confirmEditCategory,
  editCategory,
  setEditCategory,
  handleImageChange,
  fieldImage,
  selectedImage,
  selectedCategory,
}) => {
    console.log(editModalOpen);
  return (
    <>
            <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Category {selectedCategory?.category}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <VStack>
                    {selectedImage ? <Image
                    src={selectedImage}
                    alt="Selected Image"
                    boxSize="150px"
                    objectFit="cover"
                    borderRadius="50%"/> : <Image boxSize='150px' objectFit='cover' borderRadius='full' src={selectedCategory?.imageUrl ? `${import.meta.env.VITE_API_IMAGE_URL}/categories/${selectedCategory?.imageUrl}` : LogoGroceria} />}
                          <Box mt='-50px' mr='-90px'>
                    <Input display="none" id="fileInput" 
                            type="file"
                            name="image"
                            size="md"
                            onChange={(event) => {
                              setFieldImage(event.currentTarget.files[0]);
                            }, handleImageChange}
                          />
                    <IconButton
                      onClick={() => document.getElementById('fileInput').click()}
                      icon={<FiUpload color='white' />}
                      variant='outline'
                      background='blue'
                      borderRadius='50%'
                      colorScheme="white"
                      border='solid white 2px'
                    >
                    </IconButton>
                  </Box>
                  </VStack>
                  <FormLabel>New Category Name</FormLabel>
                  <Input border='solid black 1px' name='editCategory' value={editCategory} onChange={(e) => setEditCategory(e.target.value)} type='text'></Input>
                  <VStack>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={() => setEditModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button colorScheme='red' onClick={confirmEditCategory}>
                    Edit
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
    </>
  );
};
