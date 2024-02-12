import axios from "axios";

  export const handleEditToStock = async (selectedProductStock, stockAmount, token, setEditToStockModalIsOpen) => {
    try {
      // You can replace this URL with your actual API endpoint for adding stock
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/stocks/edit-product-stock`,
        {
          productStockId: selectedProductStock?.ProductStocks[0]?.id,
          stockProduct: stockAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // Handle the response as needed
      setEditToStockModalIsOpen(false); // Close the modal after successful addition
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };