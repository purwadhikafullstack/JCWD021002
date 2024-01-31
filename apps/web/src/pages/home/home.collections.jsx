import { Flex, Grid } from '@chakra-ui/react';
import Img1 from '../../assets/LP_IMAGEBLOCK_08012024054633_vubo2.jpg';
import Img2 from '../../assets/LP_IMAGEBLOCK_08012024055039_A56S3.jpg';
import Img3 from '../../assets/LP_IMAGEBLOCK_05012024092930_Msyhh.jpg';
import Img4 from '../../assets/LP_IMAGEBLOCK_05012024092742_w6fxV.jpg';
import { useWebSize } from '../../provider.websize';

export const Collections = () => {
  const collection = [
    { img: Img1, link: '#' },
    { img: Img2, link: '#' },
    { img: Img3, link: '#' },
    { img: Img4, link: '#' },
  ];

  const { size } = useWebSize();

  return (
    <Flex direction={'column'} p={size == '500px' ? '0 20px' : {base: '0 40px',lg: '30px 100px', xl: '30px 200px'}}>
      <Grid templateColumns={'repeat(2, 1fr)'} gap={5}>
        {collection?.map((item, index) => {
          return (
            <Flex
              key={index}
              h={size == '500px' ? '90px' :{base: '90px',md: '140px', lg: '180px'}}
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
