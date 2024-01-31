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
                  <Th textColor='white'>Code Transaction</Th>
                  <Th textColor='white'>Quantity</Th>
                  <Th textColor='white'>Subtotal</Th>
                  <Th textColor='white'>Product Name</Th>
                  <Th textColor='white'>Order Date</Th>
                  <Th textColor='white'>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.data?.map((orderDetail, index) => (
                  <Tr key={index}>
                    <Td>{orderDetail.Order?.codeTransaction}</Td>
                    <Td>{orderDetail.quantity}</Td>
                    <Td>{orderDetail.subtotal}</Td>
                    <Td>{orderDetail.ProductStock?.Product?.name}</Td>
                    <Td>
                    {new Date(orderDetail.Order?.orderDate).toLocaleString('id-ID', {
                                year: 'numeric',
                                month: 'long', // 'long' for full month name, 'short' for abbreviated
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                // second: 'numeric',
                                timeZone: 'Asia/Jakarta', // Adjust the time zone to match Indonesia's time zone
                            })}
                    </Td>
                    <Td>
                      <Flex justifyContent='center' flexDirection='row' flexWrap='wrap'>
                        <Text color={orderDetail.Order?.status === 'Pending' ? 'red' : 'green'}>
                          {orderDetail.Order?.status === 'Pending' ? <IconCircleXFilled /> : <IconCircleCheckFilled />}
                        </Text>
                        <Text color={orderDetail.Order?.status === 'Pending' ? 'red' : 'green'} fontWeight='bold'>
                          {orderDetail.Order?.status}
                        </Text>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  };