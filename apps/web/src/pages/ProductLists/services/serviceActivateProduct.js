import axios from "axios";

  export const handleActivateProduct = async (selectedProduct, token) => {
    try {
      // You can replace this URL with your actual API endpoint for adding stock
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/products/update-product`,
        {
          id: selectedProduct?.id,
          status: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // Handle the response as needed
      console.log(response);
    //   setDeleteModalOpen;
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };