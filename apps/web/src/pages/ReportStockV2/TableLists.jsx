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
                  <Th textColor='white'>Transaction Date</Th>
                  <Th textColor='white'>ProductName</Th>
                  <Th textColor='white'>Transaction</Th>
                  <Th textColor='white'>Quantity</Th>
                  <Th textColor='white'>Before Stock</Th>
                  <Th textColor='white'>After Stock</Th>
                  <Th textColor='white'>Admin</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data?.map((item, index) => (
                  <Tr key={index}>
                    <Td>{item?.Store?.name}</Td>
                    <Td>{item?.Store?.City?.city}, {item?.Store?.City?.Province?.province}</Td>
                    <Td>
                    {new Date(item.transactionDate).toLocaleString('id-ID', {
                                year: 'numeric',
                                month: 'long', // 'long' for full month name, 'short' for abbreviated
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                // second: 'numeric',
                                timeZone: 'Asia/Jakarta', // Adjust the time zone to match Indonesia's time zone
                            })}
                    </Td>
                    <Td>{item.ProductStock.Product.name}</Td>
                    <Td>{item.add == true ? "Additions" : "Subtractions"}</Td>
                    <Td>{item.quantity}</Td>
                    <Td>{item?.beforeStock}</Td>
                    <Td>{item.afterStock}</Td>
                    <Td>{item?.User?.username}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  };