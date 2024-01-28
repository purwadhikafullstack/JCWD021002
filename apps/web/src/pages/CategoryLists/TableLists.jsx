import React from "react";
import {
  IconEditCircle,
  IconTrashXFilled,
} from '@tabler/icons-react';
import { Avatar, Box, Flex, IconButton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export const TableLists = ({ dataCategory, user, handleEditCategory, handleDeleteCategory }) => {
  return (
    <TableContainer borderRadius='10px' border='solid black 1px'>
      <Table size='sm' border='solid 1 px black' variant='striped' colorScheme='gray'>
        <Thead>
          <Tr bgColor='gray' >
            <Th textColor='white'>Photo</Th>
            <Th textColor='white'>Category Name</Th>
            {user?.role_idrole === 1 ? 
              <Th textColor='white'>Actions</Th>
            : null}
          </Tr>
        </Thead>
        <Tbody>
          {dataCategory?.categories?.map((item, index) => (
            <Tr key={index}>
              <Td>
                <Avatar
                  key={item?.imageUrl}
                  boxSize={'64px'}
                  name={item?.category}
                  borderRadius={'full'}
                  src={
                    item?.imageUrl
                      ? `${import.meta.env.VITE_API_IMAGE_URL}/categories/${item?.imageUrl}`
                      : 'https://bit.ly/broken-link'
                  }
                  cursor="pointer"
                  _hover={{
                    transform: 'scale(1.1)',
                  }}
                />
              </Td>
              <Td>{item.category}</Td>
              {user?.role_idrole === 1 ? 
                <Td>
                  <Flex alignItems={'center'} gap={'8px'}>
                    <IconButton
                      icon={<IconEditCircle />}
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() => handleEditCategory(item)}
                    />
                    <IconButton
                      icon={<IconTrashXFilled />}
                      variant="ghost"
                      colorScheme="red"
                      onClick={() => handleDeleteCategory(item)}
                    />
                  </Flex>
                </Td> 
                : null  
              }
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
