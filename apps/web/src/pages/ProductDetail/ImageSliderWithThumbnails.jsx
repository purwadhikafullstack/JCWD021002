// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { Box, Image } from '@chakra-ui/react';

// const ImageSliderWithThumbnails = ({ images }) => {
//   const settingsMain = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   const settingsThumbnails = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     focusOnSelect: true,
//   };

//   return (
//     <div>
//       {/* <Slider {...settingsMain}>
//         {images?.map((image, index) => (
//           <Box key={index}>
//             <Image
//             backgroundColor='white' objectFit='contain' height='30vh' borderRadius='10px' src={`${import.meta.env.VITE_API_IMAGE_URL}/products/${image?.imageUrl}`} alt={`Slide ${index + 1}`} />
//           </Box>
//         ))}
//       </Slider> */}

//       <Slider {...settingsThumbnails}>
//         {images?.map((image, index) => (
//           <Box key={index}>
//             <Image
//             backgroundColor='white' objectFit='contain' height='10vh' borderRadius='10px'  src={`${import.meta.env.VITE_API_IMAGE_URL}/products/${image?.imageUrl}`} alt={`Thumbnail ${index + 1}`} />
//           </Box>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default ImageSliderWithThumbnails;
