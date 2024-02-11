import axios from "axios";

  export const handleDeleteProductStock = async (selectedProductStock, token) => {
    try {
      // You can replace this URL with your actual API endpoint for adding stock
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/stocks/edit-product-stock`,
        {
          productStockId: selectedProductStock?.ProductStocks[0]?.id,
          status: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // Handle the response as needed
    //   setDeleteModalOpen;
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };