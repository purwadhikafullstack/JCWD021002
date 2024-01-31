import React from 'react';
import { Flex, Box, HStack, Text, Select, Spacer, Button } from '@chakra-ui/react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const MAX_VISIBLE_PAGES = 3;


export const PaginationControls = ({
  page,
  pageSize,
  selectedPage,
  setPage,
  setPageSize,
  setSelectedPage,
  data,
}) => {

  
  const getPageNumbers = () => {
    const totalPages = data?.totalPages || 0;
    const currentPage = selectedPage;

    let startPage = Math.max(
      currentPage - Math.floor(MAX_VISIBLE_PAGES / 2),
      1,
    );
    let endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);

    if (totalPages - endPage < Math.floor(MAX_VISIBLE_PAGES / 2)) {
      startPage = Math.max(endPage - MAX_VISIBLE_PAGES + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) {
      pages.unshift('...');
    }

    if (endPage < totalPages) {
      pages.push('...');
    }

    return pages;
  };


  return (
    <>
    <Flex marginTop="10px" flexWrap="wrap">
              <Box mt="20px">
                <HStack>
                  <Text>Show per Page</Text>
                  <Select
                    border="solid 1px black"
                    width="fit-content"
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}
                  >
                    <option value={1}>1</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option>All</option>
                  </Select>
                </HStack>
              </Box>
              <Spacer />
              <Box mt="20px">
                <Button
                  borderRadius="full"
                  backgroundColor="#286043"
                  textColor="white"
                  border="solid 1px #286043"
                  leftIcon={<IconChevronLeft />}
                  isDisabled={page == 1 ? true : false}
                  onClick={() => {
                    setPage(page - 1);
                    setSelectedPage(selectedPage - 1);
                  }}
                ></Button>
                {getPageNumbers().map((pageNumber, index) => (
                  <Button
                    key={index}
                    ml="2px"
                    mr="2px"
                    borderRadius="full"
                    backgroundColor={
                      selectedPage === pageNumber ? '#286043' : 'white'
                    }
                    textColor={
                      selectedPage === pageNumber ? 'white' : '#286043'
                    }
                    border={`solid 1px ${
                      selectedPage === pageNumber ? 'white' : '#286043'
                    }`}
                    onClick={() => {
                      // Handle the case where the button is "..." separately
                      if (pageNumber !== '...') {
                        setPage(pageNumber);
                        setSelectedPage(pageNumber);
                      }
                    }}
                  >
                    {pageNumber}
                  </Button>
                ))}
                <Button
                  borderRadius="full"
                  backgroundColor="#286043"
                  textColor="white"
                  border="solid 1px #286043"
                  rightIcon={<IconChevronRight />}
                  isDisabled={page == data?.totalPages ? true : false}
                  onClick={() => {
                    setSelectedPage(selectedPage + 1);
                    setPage(page + 1);
                  }}
                ></Button>
              </Box>
            </Flex>
    </>
  );
};

