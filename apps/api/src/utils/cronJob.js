// import cron from 'node-cron';
import { getDeliveredOrdersQuery } from '../queries/orderManagement.query';
import { updateOrderStatusQuery } from '../queries/checkout.query';

export async function finishUnconfirmedOrders() {
  try {
    // Get orders that are in 'delivery' status and have 'settlement' payment status
    const deliveredOrders = await getDeliveredOrdersQuery();

    // Loop through the delivered orders
    deliveredOrders.forEach(async (order) => {
      const currentDate = new Date();
      const deliveryDate = new Date(order.orderDate);

      const minutesDifference = Math.floor((currentDate - deliveryDate) / (1000 * 60));

      // Check if 1 minute has passed since delivery
      if (minutesDifference >= 1) {
        // Automatically confirm the order
        await updateOrderStatusQuery(order.id, 'done');
      }

    //   const hoursDifference = Math.floor((currentDate - deliveryDate) / (1000 * 60 * 60));
    //   // Check if 48 hours (2 x 24 hours) have passed since delivery
    //   if (hoursDifference >= 48) {
    //     // Automatically confirm the order
    //     await updateOrderStatusQuery(order.id, 'confirmed');
    //   }
    });
  } catch (error) {
  }
}
