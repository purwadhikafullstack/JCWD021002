import { Flex, Grid, Text } from '@chakra-ui/react';

export const Collections = () => {
  const collection = [
    { img: 'test', link: '#' },
    { img: 'test', link: '#' },
    { img: 'test', link: '#' },
    { img: 'test', link: '#' },
  ];

  return (
    <Flex direction={'column'}>
      <Text mb={"10px"}>Collections</Text>
      <Grid templateColumns={"repeat(2, 1fr)"} gap={5}>
        {collection?.map((item, index) => {
          return (
            <Flex
              key={index}
              h={'90px'}
              border={'1px solid #F3F4F6FF'}
              borderRadius={'6px'}
              bgColor={"red"}
            >
              {item.img}
            </Flex>
          );
        })}
      </Grid>
    </Flex>
  );
};
