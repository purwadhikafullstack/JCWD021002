import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,

  Text,

  IconButton,

  Flex,

  Avatar,
  Icon,
  Table, Thead, Tbody, Tr, Th, Td, TableContainer

} from '@chakra-ui/react';
import {

    IconCircleCheckFilled,
    IconCircleXFilled,
  IconEditCircle,
  IconTrashX,
  IconTrashXFilled,
} from '@tabler/icons-react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import { useWebSize } from '../../provider.websize';




export const TableLists = ({ dataUser, handleDeleteUser, navigate }) => {
  const {size, handleWebSize } = useWebSize();
  console.log(dataUser);
    
    return (
        <>
        <Box overflowX='auto'>
        <TableContainer borderRadius='10px' border='solid black 1px'>
        <Table size='sm' border='solid 1 px black' variant='striped' colorScheme='gray'>
      <Thead>
        <Tr bgColor='gray' >
            <Th textColor='white'>Photo</Th>
          <Th textColor='white'>Category Name</Th>
          <Th textColor='white'>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
      {dataCategory?.categories?.map((item, index) => (
          <Tr key={index}>
              <Td>
              <Avatar
                        key={item?.imageUrl}
                        boxSize={'64px'}
                        name={item?.username}
                        borderRadius={'full'}
                        src={
                          item?.avatar
                            ? `${import.meta.env.VITE_API_IMAGE_URL}/categories/${
                                item?.iamgeUrl
                              }`
                            : 'https://bit.ly/broken-link'
                        }
                        cursor="pointer"
                        _hover={{
                          transform: 'scale(1.1)',
                        }}
                      />
              </Td>
            <Td>{item.category}</Td>
            <Td>
            <Flex alignItems={'center'} gap={'8px'}>
                          {/* <IconButton  icon={<IconInfoCircle />} variant='ghost' colorScheme='blue' onClick={() => navigate(`/detail-user/${item?.id}`)} /> */}
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
          </Tr>
        ))}
      </Tbody>
    </Table>
        </TableContainer>
        </Box>
        </>
    )
}