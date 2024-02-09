import { Flex, Text } from '@chakra-ui/react';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';

// export const CartIcon = ({ transform }) => {
//   const user = useSelector((state) => state.AuthReducer.user);

//   const [carts, setCarts] = useState([]);

//   const fetchCarts = async (user) => {
//     try {
//       console.log('userId: ', user.id);
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/cart/${user.id}`,
//       );
//       console.log('res data: ', response?.data?.data);
//       setCarts(response?.data?.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCarts(user);
//   }, [user]);
//   return (
//     <Link to="/cart">
//       <HiOutlineShoppingCart size={'26px'} />
//       {carts.length > 0
//         ? carts.map((item, index) => (
//             <Flex
//               hidden={item.totalQuantity === 0 ? true : false}
//               key={index}
//               position="absolute"
//               top={0}
//               w="20px"
//               h="20px"
//               borderRadius={'50%'}
//               justifyContent="center"
//               alignItems="center"
//               cursor={'pointer'}
//               // transform="translate(60%, 50%)"
//               transform={transform}
//               background="red"
//               color="white"
//               p={1.5}
//             >
//               <Text fontSize="10pt">
//                 {/* 300 */}
//                 {item.totalQuantity}
//               </Text>
//             </Flex>
//           ))
//         : null}
//     </Link>
//   );
// };
