import { Snap } from 'midtrans-client';
import Product from '../models/product.model';
const { CoreApi } = require('midtrans-client');

const snap = new Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export const generateMidtransToken = async (
  orderId,
  totalPrice,
  product,
  shippingCost,
  userId,
  userUsername,
  userEmail,
) => {
  try {
    const transaction_details = {
      order_id: orderId,
      gross_amount: totalPrice + shippingCost,
    };


    const productDetailsPromises = product.map(async (product) => {
      const productInfo = await Product.findOne({
        where: { id: product.productId },
      });
      return {
        id: product.productId,
        name: productInfo ? productInfo.name : 'Unknown Product',
        price: product.price,
        quantity: product.quantity,
        shipping_cost: shippingCost,
      };
    });


    const productDetails = await Promise.all(productDetailsPromises);

    const shippingItem = {
      id: 'shipping',
      name: 'Shipping Cost',
      price: shippingCost,
      quantity: 1,
    };

    const customer_details = {
      id: userId,
      first_name: userUsername,
      email: userEmail,
    };

    const transactionOptions = {
      transaction_details,
      item_details: [...productDetails, shippingItem],
      customer_details,
    };

    const token = await snap.createTransactionToken(transactionOptions);
    return token;
  } catch (error) {
    throw error;
  }
};

export const getMidtransTransactionStatus = async (orderId) => {
  try {
    // Initialize Midtrans CoreApi with your credentials
    const coreApi = new CoreApi({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    // Get transaction status
    const transactionStatus = await coreApi.transaction.status(orderId);

    return transactionStatus;
  } catch (error) {
    throw error;
  }
};
