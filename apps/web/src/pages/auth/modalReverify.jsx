/* eslint-disable react/prop-types */
import React from 'react';
import {
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const ModalReverify = ({ isOpen, onClose, modalTitle, modalDescription, link }) => {
  const cancelRef = React.useRef();
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate('/login');
  };

  return (
    <Flex>
      {/* <Button onClick={onOpen}>Discard</Button> */}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{modalTitle}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody fontSize={'14px'}>
            {modalDescription}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleClose}>
              No
            </Button>
              <Button bgColor={'colors.primary'} color={'white'} ml={3} onClick={() => navigate(link)}>
                Yes
              </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  );
};
