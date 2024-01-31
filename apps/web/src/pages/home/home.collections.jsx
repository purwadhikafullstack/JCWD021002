import { Flex, Grid } from '@chakra-ui/react';
import Img1 from '../../assets/LP_IMAGEBLOCK_08012024054633_vubo2.jpg';
import Img2 from '../../assets/LP_IMAGEBLOCK_08012024055039_A56S3.jpg';
import Img3 from '../../assets/LP_IMAGEBLOCK_05012024092930_Msyhh.jpg';
import Img4 from '../../assets/LP_IMAGEBLOCK_05012024092742_w6fxV.jpg';

export const Collections = () => {
  const collection = [
    { img: Img1, link: '#' },
    { img: Img2, link: '#' },
    { img: Img3, link: '#' },
    { img: Img4, link: '#' },
  ];

  return (
    <Flex direction={'column'} p={'0 20px'}>
      <Grid templateColumns={'repeat(2, 1fr)'} gap={5}>
        {collection?.map((item, index) => {
          return (
            <Flex
              key={index}
              h={'90px'}
              border={'1px solid #F3F4F6FF'}
              borderRadius={'6px'}
              bgColor={'red'}
              background={`url(${item.img})`}
              backgroundPosition="bottom"
              backgroundSize="cover"
              backgroundRepeat="no-repeat"
            />
          );
        })}
      </Grid>
    </Flex>
  );
};
