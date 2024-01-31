/* eslint-disable react/prop-types */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const LoginModal = ({isOpen, onClose, fromPage}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent alignItems={'center'} w={'80%'}>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          gap={5}
        >
          <Text textAlign={'center'}>
            Hanya satu langkah lagi! Silakan login untuk melanjutkan.
          </Text>
          <Link to={`/login?fromPage=${fromPage}`}>
            <Button
              variant="ghost"
              bgColor="colors.primary"
              color={'white'}
              _hover={{
                transform: 'scale(1.1)',
              }}
              _active={{
                transform: 'scale(1)',
              }}
              borderRadius={'10px'}
              px={'30px'}
            >
              Login
            </Button>
          </Link>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
