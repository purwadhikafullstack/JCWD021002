import { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';
import { Text, Box, HStack, Image, Flex, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Select, Stack, Card, Divider, CardFooter, ButtonGroup, useColorModeValue, CardBody, Heading, InputGroup, InputLeftElement, Spacer, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from '@chakra-ui/react';
import { IconChevronLeft, IconCircleXFilled, IconCirclePlus, IconTrashXFilled, IconSquareRoundedPlusFilled, IconClock, IconPlus } from '@tabler/icons-react';
import { IconSearch, IconAdjustmentsHorizontal, IconChevronRight, IconEditCircle, IconTrashX, IconInfoCircle, IconLayoutGrid, IconList, IconSortAscending2, IconSortDescending2, IconAbc, IconTags, IconCircleCheckFilled} from '@tabler/icons-react'
import LogoGroceria from '../../assets/Groceria-no-Bg.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toRupiah from '@develoka/angka-rupiah-js';
import { IoIosArrowForward } from 'react-icons/io';
import { useWebSize } from '../../provider.websize';
import { PaginationControls } from '../../components/PaginationControls/PaginationControls';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RedeemReferral = ({ order, setDiscountVoucher, fetchOrder, }) => {
  const {size, handleWebSize } = useWebSize();
  const { user, isLogin } = useSelector((state) => state.AuthReducer);
  const [userStore, setUserStore] = useState(user?.store_idstore);
  const userId = user?.id;
  const [sampleData, setSampleData] = useState([]);
  const [data, setData] = useState([]);
  const [dataStore, setDataStore] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addToStockModalIsOpen, setAddToStockModalIsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc")
  const [page, setPage] = useState();
  const [pageSize, setPageSize] = useState()
  const [categoryId, setCategoryId] = useState();
  const [productName, setProductName] = useState()
  const [redeem, setRedeem] = useState(false);
  const navigate = useNavigate();
  const [ referral, setReferral ] = useState();
  const token = localStorage.getItem("token");


  const useReferral = async (referral) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/voucher/redeem-referral`,
      {
        referral: referral,
      },
      {headers: {
        Authorization: `Bearer ${token}`,
      }}
      )

      toast.success('Referral Redeem');
      onClose();
      setRedeem(true);
      setReferral(null);
    } catch (err) {
      console.log(err);
      toast.error('Something wrong... Check referral code');
      onClose();
      setReferral(null);
    }
  }



  return (
    <Box>
      <ToastContainer position="top-center" closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
          <Button
            rightIcon={<IoIosArrowForward />}
            variant="ghost"
            _hover={{ color: 'black', opacity: 0.9 }}
            transition="color 0.3s ease-in-out, opacity 0.3s ease-in-out"
            fontWeight="medium"
            color="gray.600"
            onClick={onOpen}
            fontSize='small'
            hidden={ redeem == true ? true : false }
          >
            Redeem Referral
          </Button>
    
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Redeem Referral</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>You just can redeem referral code 1 time</Text>
            <Input value={referral} onChange={(e) => setReferral(e.target.value)} placeholder="Redeem kode disini..." />
            <Button onClick={() => useReferral(referral)}>Redeem</Button>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Box>
  );
}
