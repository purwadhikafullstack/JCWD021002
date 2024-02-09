import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  useToast,
  Stack,
  Image,
} from '@chakra-ui/react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useWebSize } from '../../provider.websize';
import { TransactionHeader } from '../../components/Transaction/Transaction.Header';
import angkaRupiahJs from '@develoka/angka-rupiah-js';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { PaymentDrawer } from '../../components/Transaction/Transaction.Payment';
import { BottomBar } from '../../components/BottomBar';

export const TabItem = ({ label, status, onClick }) => (
  <Tab
    onClick={onClick}
    _selected={{
      //   borderBottom: '2px solid #286043',
      fontWeight: 'bold',
      position: 'relative',
      _after: {
        content: '""',
        position: 'absolute',
        bottom: '-2px',
        left: 0,
        right: 0,
        height: '4px',
        borderRadius: '4px 4px 0 0',
        background: '#286043',
      },
    }}
    style={{ height: '50px' }} // Set a fixed width for each TabItem
  >
    <Text textAlign="center" isTruncated>
      {label}
    </Text>
  </Tab>
);
