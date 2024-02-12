import { findProductStockQuery } from '../queries/cart.query';
import {getUserRoleQuery, getDetailUserQuery} from '../queries/user.query';
import { findOrderQuery, updateOrderStatusQuery } from '../queries/checkout.query';
import {
  checkStockAvailabilityQuery,
  createStockJournalQuery,
  getAllOrderQuery,
  getAllStoresQuery,
  getOrderDetailsQuery,
  getOrderbyAdminQuery,
  getProductAndBranchStoreQuery,
  updateStockQtyQuery,
} from '../queries/orderManagement.query';

import {addJournalQuery} from '../queries/journal.query';


export const getOrderbyAdminService = async (userId, storeId, status, paymentStatus) => {
  try {
    const user = await getDetailUserQuery(userId);
    const userRoleId = parseInt(user.role_idrole)

    if (!user || user.role_idrole === 3) {
      throw new Error('Access Denied. The user does not have the Super Admin or Admin Store role.');
    }

    if (!user || user.role_idrole === 1) {
      const result = await getOrderbyAdminQuery(storeId, status, paymentStatus);
      return result;     
    } else if (user.role_idrole === 2) {
      const result = await getOrderbyAdminQuery(user.store_idstore, status, paymentStatus);
      return result;     
    } else {
      throw new Error('Error');
    }
  } catch (err) {
    throw err;
  }
};

export const sendUserOrderService = async (orderId) => {
  try {
    // Get order details with product stock information
    const orderDetails = await getOrderDetailsQuery(orderId);

    // Check if there is sufficient stock available before proceeding with shipment
    const isStockAvailable = await Promise.all(
      orderDetails.map(async (detail) => {
        const productStock = await findProductStockQuery(
          detail.productStock_idproductStock,
        );
        return productStock && productStock.stock >= detail.quantity;
      }),
    );


    if (!isStockAvailable.every((available) => available)) {
      throw new Error(
        'Insufficient stock. Please wait until the stock arrives at the warehouse.',
      );
    } else {
      // Update order status to 'On Process'
      await updateOrderStatusQuery(orderId, 'delivery');
      
      return orderDetails;
    }
  } catch (err) {
    throw err;
  }
};

export const acceptOrderService = async (adminStoreId, orderId) => {
  try {
    const user = await getUserRoleQuery(adminStoreId);

    if (!user || user.role_idrole !== 2) {
      throw new Error('Access Denied. The user does not have the Admin Store role.');
    }

    const order = await findOrderQuery(orderId);

    if (!order) {
      throw new Error('Order not found. Please check the order ID again.');
    }

    if (!(order.status === 'new_order' && order.paymentStatus === 'settlement')) {
      throw new Error('Failed to accept order. Order must be in "new_order" status and "settlement" payment status.');
    }

    const orderDetails = await getOrderDetailsQuery(order.id);

    // Check if there is sufficient stock available before proceeding with shipment
    const isStockAvailable = await Promise.all(
      orderDetails.map(async (detail) => {
        const productStock = await findProductStockQuery(detail.productStock_idproductStock);
        return productStock && productStock.stock >= detail.quantity;
      })
    );


    if (!isStockAvailable.every((available) => available)) {
      const unavailableProductStocks = orderDetails
        .filter((detail, index) => !isStockAvailable[index])
        .map((detail) => detail.productStock_idproductStock);
    
      // Assuming you want to use the first unavailable product stock for mutation
      const productStockIdToMutate = unavailableProductStocks[0];
    
      if (productStockIdToMutate) {
        const productStock = await findProductStockQuery(productStockIdToMutate);
        
        // Check if productStock is not null and use product_idproduct for mutation
        if (productStock) {
          await mutateStockService(productStock.product_idproduct, order.store_idstore, 15);
        } else {
          throw new Error('Invalid product stock for mutation.');
        }
      } else {
        throw new Error('Insufficient stock. Please wait until the stock arrives at the warehouse.');
      }
    }
    

    // Perform stock reversal and create stock journal entries
    await Promise.all(
      orderDetails.map(async (detail) => {
        try {
          const productStock = await findProductStockQuery(detail.productStock_idproductStock);

          // Revert stock quantity
          const newStock = productStock.stock - detail.quantity;
          await updateStockQtyQuery(
            productStock.product_idproduct,
            order.store_idstore,
            newStock
          );

          // Assuming addJournalQuery parameters (storeId, mutationQuantity, initialStock, newStock, type, productId)
          await addJournalQuery(order.store_idstore, detail.quantity, productStock.stock, newStock, 1, productStock.id);
        } catch (error) {
          console.error('Error processing order detail:', error);
          // Handle error for a specific order detail
        }
      })
    );

    // Update order status to 'payment_accepted'
    await updateOrderStatusQuery(order.id, 'payment_accepted');

    return order;

  } catch (err) {
    throw err;
  }
};

export const getAllStoreService = async () => {
  try{
    const store = await getAllStoresQuery();
    return store;
  } catch (err) {
    throw new Error('failed to get all store');
  }
} 
  
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
      const user = await getUserRoleQuery(adminStoreId);

      if (!user || user.role_idrole !== 2) {
        throw new Error('Access Denied. The user does not have the Admin Store role.');
      }
  
      const order = await findOrderQuery(orderId);
  
      if (!order) {
        throw new Error('Order not found. Please check the order ID again.');
      }
  
      if (!(order.status === 'payment_accepted' && order.paymentStatus === 'settlement')) {
        throw new Error('Failed to cancel order. Order must be in "payment_accepted" status and "settlement" payment status.');
      }
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
  
  export const cancelPaymentService = async (adminStoreId, orderId) => {
   try {
    const user = await getUserRoleQuery(adminStoreId);

    if (!user || user.role_idrole !== 2) {
      throw new Error('Access Denied. The user does not have the Admin Store role.');
    }

    const order = await findOrderQuery(orderId);

    if (!order) {
      throw new Error('Order not found. Please check the order ID again.');
    }

    if (!(order.status === 'new_order' && order.paymentStatus === 'settlement')) {
      throw new Error('Failed to cancel order. Order must be in "new_order" status and "settlement" payment status.');
    }

    await updateOrderStatusQuery(order.id, 'cancel');
    return {order};
   } catch(err) {
    throw err;
   }

  };
  
  const cancelAcceptedOrder = async (order) => {
    await updateOrderStatusQuery(order.id, 'cancel');
  
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
