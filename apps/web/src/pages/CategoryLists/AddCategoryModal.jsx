// AddCategoryModal.js
import React, { useState } from "react";
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

export const AddCategoryModal = ({
  isOpen,
  onClose,
  addNewCategory,
  newCategory,
  setNewCategory,
  handleImageChange,
  fieldImage,
  selectedImage,
}) => {
  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add Category</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <VStack>
                    {selectedImage ? <Image
                    src={selectedImage}
                    alt="Selected Image"
                    boxSize="150px"
                    objectFit="cover"
                    borderRadius="50%"/> : <Image src={LogoGroceria} />}
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
                  <FormLabel>Category Name</FormLabel>
                  <Input border='solid black 1px' name='newCategory' value={newCategory} onChange={(e) => setNewCategory(e.target.value)} type='text'></Input>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme='green' mr={3} onClick={addNewCategory}>
                    Add Category
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
    </>
  );
};
