import axios from 'axios';

export const addTotalShipping = async (selectedShippingCost, orderId, token) => {
    try {
        const result = await axios.patch(
            `${import.meta.env.VITE_API_URL}/checkout/add-total-shipping-cost`,
            {
                shippingCost: selectedShippingCost, orderId: orderId
            },
            {headers: {
              Authorization: `Bearer ${token}`,
            }}
          );
    } catch (err) {
        console.log(err);
    }
}