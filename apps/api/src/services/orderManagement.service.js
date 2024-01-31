import { findProductStockQuery } from '../queries/cart.query';
import {getUserRoleQuery} from '../queries/user.query';
import { findOrderQuery, updateOrderStatusQuery } from '../queries/checkout.query';
import {
  checkStockAvailabilityQuery,
  createStockJournalQuery,
  getAllOrderQuery,
  getAllStoresQuery,
  getOrderDetailsQuery,
  getProductAndBranchStoreQuery,
  updateStockQtyQuery,
} from '../queries/orderManagement.query';

import {addJournalQuery} from '../queries/journal.query';


export const getAllOrderService = async (storeId) => {
  try {
    const result = await getAllOrderQuery(storeId);
    return result;
  } catch (err) {
    throw err;
  }
};

export const sendUserOrderService = async (orderId) => {
  try {
    const status = 'Dikirim';

    // Get order details with product stock information
    const orderDetails = await getOrderDetailsQuery(orderId);
    console.log('cek orderDetails: ', orderDetails);

    // Check if there is sufficient stock available before proceeding with shipment
    const isStockAvailable = await Promise.all(
      orderDetails.map(async (detail) => {
        const productStock = await findProductStockQuery(
          detail.productStock_idproductStock,
        );
        return productStock && productStock.stock >= detail.quantity;
      }),
    );

    console.log('cekk', isStockAvailable);

    if (!isStockAvailable.every((available) => available)) {
      throw new Error(
        'Insufficient stock. Please wait until the stock arrives at the warehouse.',
      );
    } else {
      // Update order status to 'On Process'
      await updateOrderStatusQuery(orderId, 'on process');

      return orderDetails;
    }
  } catch (err) {
    throw err;
  }
};

export const acceptOrderService = async (adminStoreId, orderId) => {
    try {
      const user = await getUserRoleQuery(adminStoreId);
      console.log('User details: ', user);
  
      if (!user || user.role_idrole !== 2) {
        throw new Error('Access Denied. The user does not have the Admin Store role.');
      }
  
      const order = await findOrderQuery(orderId);
  
      if (!order) {
        throw new Error('Order not found. Please check the order ID again.');
      }
  
      if (order.status !== 'payment accepted') {
        throw new Error('Status is not pending');
      }
  
      await updateOrderStatusQuery(order.id, 'on process');
  
      const orderDetails = await getOrderDetailsQuery(orderId);
  
      // Perform stock reversal and create stock journal entries
      await Promise.all(
        orderDetails.map(async (detail) => {
          try {
            const productStock = await findProductStockQuery(
              detail.productStock_idproductStock
            );
  
            // Revert stock quantity
            const newStock = productStock.stock - detail.quantity;
            console.log('cek stock', newStock);
            await updateStockQtyQuery(
              productStock.product_idproduct,
              order.store_idstore,
              newStock
            );
    
            // Assuming addJournalQuery parameters (storeId, mutationQuantity, initialStock, newStock, type, productId)
            await addJournalQuery(order.store_idstore, detail.quantity, productStock.stock, newStock, 1, productStock.id)
          } catch (error) {
            console.error('Error processing order detail:', error);
            // Handle error for a specific order detail
          }
        })
      );
  
      return order;
    } catch (err) {
      throw err;
    }
  };
  
export const mutateStockService = async (
    productId,
    storeId,
    mutationQuantity,
  ) => {
    try {
      const allStores = await getAllStoresQuery();
      const currentStore = allStores.find((store) => store.id === storeId);
  
      if (!currentStore) {
        throw new Error('Current store not found.');
      }
  
      const sortedStoresByDistance = allStores
        .filter((store) => store.id !== currentStore.id)
        .sort((storeA, storeB) => {
          const distanceA = calculateDistance(
            currentStore.latitude,
            currentStore.longitude,
            storeA.latitude,
            storeA.longitude,
          );
          const distanceB = calculateDistance(
            currentStore.latitude,
            currentStore.longitude,
            storeB.latitude,
            storeB.longitude,
          );
          return distanceA - distanceB;
        });
  
      let nearestStoreId = null;
  
      // Find the first store with valid stock
      for (const store of sortedStoresByDistance) {
        const productStock = await getProductAndBranchStoreQuery(
          productId,
          store.id,
        );
  
        if (
          productStock &&
          productStock.stock !== null &&
          productStock.stock >= mutationQuantity
        ) {
          nearestStoreId = store.id;
          break;
        }
      }
  
      // If the first nearest store doesn't have valid stock, move to the second nearest store
      if (!nearestStoreId) {
        for (const store of sortedStoresByDistance) {
          const productStock = await getProductAndBranchStoreQuery(
            productId,
            store.id,
          );
  
          if (
            productStock &&
            productStock.stock !== null &&
            productStock.stock >= mutationQuantity
          ) {
            nearestStoreId = store.id;
            break;
          }
        }
      }
  
      // Check if productStock is null
      if (!nearestStoreId) {
        throw new Error('No suitable store found for mutation.');
      }
  
      // Fetch the initial stock values
      const [initialStockCurrentStore, initialStockNearestStore] = await Promise.all([
        getProductAndBranchStoreQuery(productId, storeId),
        getProductAndBranchStoreQuery(productId, nearestStoreId),
      ]);

      const newQtyNearestStore =
        initialStockNearestStore.stock - mutationQuantity;
      const newQtyCurrentStore =
        initialStockCurrentStore.stock + mutationQuantity;

        
        // Check if stock in nearest store is valid for mutation
        if (initialStockNearestStore.stock !== null && newQtyNearestStore >= 0) {
  
            await Promise.all([
          updateStockQtyQuery(productId, nearestStoreId, newQtyNearestStore),
          updateStockQtyQuery(productId, storeId, newQtyCurrentStore),
        ]);
  
        // Fetch the updated stock values
        const [newStockCurrentStore, newStockNearestStore] = await Promise.all([
          getProductAndBranchStoreQuery(productId, storeId),
          getProductAndBranchStoreQuery(productId, nearestStoreId),
        ]);

         // Add Journal entries for history
         const productStock = await getProductAndBranchStoreQuery(
            productId,
            storeId,
          );
         console.log(productStock);
         await Promise.all([
        addJournalQuery(storeId, mutationQuantity, initialStockCurrentStore.stock, newStockCurrentStore.stock, 1, productStock.id),
        addJournalQuery(nearestStoreId, -mutationQuantity, initialStockNearestStore.stock, newStockNearestStore.stock, 1, productStock.id),
      ]);
  
        return { newStockCurrentStore, newStockNearestStore, success: true };
      } else {
        throw new Error('Invalid stock in the nearest store for mutation.');
      }
    } catch (err) {
      throw err;
    }
  };
  
  export const cancelOrderService = async (adminStoreId, orderId) => {
    try {
      const order = await findOrderQuery(orderId);
  
    //   if (order.status === 'pending') {
    //     await cancelPendingOrder(order);
    //   } else if (order.status === 'payment accepted') {
        await cancelAcceptedOrder(order);
    //   } else {
    //     throw new Error('Error cancelling order');
    //   }
  
      return { order };
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  };
  
  const cancelPendingOrder = async (order) => {
    await updateOrderStatusQuery(order.id, 'cancelled');
  };
  
  const cancelAcceptedOrder = async (order) => {
    await updateOrderStatusQuery(order.id, 'cancelled');
  
    const orderDetails = await getOrderDetailsQuery(order.id);
  
    await Promise.all(
      orderDetails.map(async (detail) => {
        try {
          const productStock = await findProductStockQuery(detail.productStock_idproductStock);
  
          if (!productStock) {
            throw new Error('Product stock not found');
          }
  
          // Revert stock quantity
          const newStock = productStock.stock + detail.quantity;
          console.log('check');
          console.log(productStock.product_idproduct);
          console.log(order.store_idstore,);

          await updateStockQtyQuery(
            productStock.product_idproduct,
            order.store_idstore,
            newStock
          );
  
          // Add Journal entries for history
          const productStockForJournal = await getProductAndBranchStoreQuery(
            productStock.product_idproduct,
            order.store_idstore,
          );
  
          await Promise.all([
            addJournalQuery(order.store_idstore, detail.quantity, productStock.stock, newStock, 1, productStockForJournal.id),
          ]);
        } catch (error) {
          console.error('Error processing order detail:', error);
          // Handle error for a specific order detail
        }
      })
    );
  };
  
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};
