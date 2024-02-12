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
  IconTrashXFilled,
} from '@tabler/icons-react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import { useWebSize } from '../../provider.websize';



export const TableLists = ({ data, handleDeleteOrder, navigate }) => {
    const { size, handleWebSize } = useWebSize();
  
    return (
      <>
        <Box overflowX='auto'>
          <TableContainer borderRadius='10px' border='solid black 1px'>
            <Table size='sm' border='solid 1px black' variant='striped' colorScheme='gray'>
              <Thead>
                <Tr bgColor='gray'>
                  <Th textColor='white'>Store Name</Th>
                  <Th textColor='white'>Location</Th>
                  <Th textColor='white'>ProductName</Th>
                  <Th textColor='white'>Total Additions</Th>
                  <Th textColor='white'>Total Subtractions</Th>
                  <Th textColor='white'>Final Stock</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data?.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item.storeName}</Td>
                    <Td>{item.city}, {item.province}</Td>
                    <Td>{item.productName}</Td>
                    <Td>{item.totalAdditions}</Td>
                    <Td>{item.totalSubtractions}</Td>
                    <Td>{item.finalStock}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  };