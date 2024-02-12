import axios from "axios";

  export 
  const handleDeleteProduct = async (selectedProduct, token) => {
    try {
      // You can replace this URL with your actual API endpoint for adding stock
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/product-soft-delete/${selectedProduct?.id}`,
        {headers: {
          Authorization: `Bearer ${token}`,
        }}
      );
      // Handle the response as needed
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };
