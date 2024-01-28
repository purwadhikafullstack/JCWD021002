import axios from 'axios';

export const fetchDataProduct = async ( categoryId, productName, setDataProduct ) => {
    try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/product-lists-v2?categoryId=${categoryId}&productName=${productName}`
        );
        setDataProduct(response?.data);
  } catch (err) {
      console.log(err);
  }
  }