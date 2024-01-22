/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button
} from '@chakra-ui/react'

function DeleteAlert({btnValue, titleValue, mainValue, deleteAction, style}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const handleDelete = () => {
    onClose()
    deleteAction()
  }

  return (
    <>
      <Button variant={'unstayled'} onClick={onOpen} w={'fit-content'} size={'xm'} {...style}>
        {btnValue}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {titleValue}
            </AlertDialogHeader>

            <AlertDialogBody>
              {mainValue}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteAlert