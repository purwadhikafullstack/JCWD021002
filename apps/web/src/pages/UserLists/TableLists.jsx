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
  IconProgressCheck,
  IconRefresh,
  IconTrashXFilled,
} from '@tabler/icons-react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import { useWebSize } from '../../provider.websize';




export const TableLists = ({ dataUser, handleDeleteUser, navigate }) => {
  const {size, handleWebSize } = useWebSize();
    
    return (
        <>
        <Box overflowX='auto'>
        <TableContainer borderRadius='10px' border='solid black 1px'>
        <Table size='sm' border='solid 1 px black' variant='striped' colorScheme='gray'>
      <Thead>
        <Tr bgColor='gray'>
            <Th textColor='white'>Avatar</Th>
          <Th textColor='white'>Full Name</Th>
          <Th textColor='white'>Username</Th>
          <Th textColor='white'>Email</Th>
          <Th textColor='white'>Role</Th>
          <Th textColor='white'>Store</Th>
          <Th textColor='white'>Location</Th>
          <Th textColor='white'>Status</Th>
          <Th textColor='white'>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {dataUser?.allUsers?.map((item, index) => (
          <Tr key={index}>
              <Td>
              <Avatar
                        key={item?.avatar}
                        boxSize={'64px'}
                        name={item?.username}
                        borderRadius={'full'}
                        src={
                          item?.avatar
                            ? `${import.meta.env.VITE_API_IMAGE_URL}/avatar/${
                                item?.avatar
                              }`
                            : 'https://bit.ly/broken-link'
                        }
                        onClick={() => navigate(`/detail-user/${item?.id}`)}
                        cursor="pointer"
                        _hover={{
                          transform: 'scale(1.1)',
                        }}
                      />
              </Td>
            <Td>{item.fullname}</Td>
            <Td>{item.username}</Td>
            <Td>{item.email}</Td>
            <Td>
              {item.role_idrole === 1
                ? 'Super Admin'
                : item.role_idrole === 2
                ? 'Admin Store'
                : 'User'}
            </Td>
            <Td>{item.Store?.name}</Td>

            <Td>{item?.store_idstore ? `${item.Store?.City?.city}, ${item?.Store?.City?.Province?.province}` : null}</Td>
            <Td>
            <Flex justifyContent='center' flexDirection='row' flexWrap='wrap'>
                          <Text  color={item?.status == 'Active' ? "green" : "red"}>{item?.status == 'Active' ? (<IconCircleCheckFilled />) : (<IconCircleXFilled />)}</Text>
                          <Text color={item?.status == 'Active' ? 'green' : 'red'} fontWeight='bold'>
                          {item?.status == 'Active' ? 'Active' : 'Deactive'}
                          </Text>
                          {/* <IconButton  icon={<IconInfoCircle />} variant='ghost' colorScheme='blue' onClick={() => navigate(`/product-detail-admin/${item?.id}`)} /> */}
                      </Flex>
            </Td>
            <Td>
            <Flex alignItems={'center'} gap={'8px'}>
                          {/* <IconButton  icon={<IconInfoCircle />} variant='ghost' colorScheme='blue' onClick={() => navigate(`/detail-user/${item?.id}`)} /> */}
                          <IconButton
                            icon={<IconEditCircle />}
                            variant="ghost"
                            colorScheme="blue"
                            isDisabled={item?.status == 'Active' ? false : true}
                            onClick={() => navigate(`/edit-user/${item?.id}`)}
                          />
                          {item?.status == 'Active' ? 
                        <IconButton
                        icon={<IconTrashXFilled />}
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleDeleteUser(item)}
                      /> : 
                      <IconButton
                      icon={<IconProgressCheck />}
                      variant="ghost"
                      colorScheme="blue"
                      onClick={() => handleDeleteUser(item)}
                    />
                        }
                          
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