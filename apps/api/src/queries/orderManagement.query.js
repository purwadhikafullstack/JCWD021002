import ProductStock from '../models/productStock.model';
import Order from '../models/order.model';
import OrderDetail from '../models/orderDetail.model';
import Product from '../models/product.model';
import ProductImage from '../models/productImage.model';
import Store from '../models/store.model';
import Journal from '../models/journal.model';
import User from '../models/user.model';
const { Op } = require('sequelize');

export const getOrderbyAdminQuery = async (adminStoreId, status, paymentStatus) => {
  const whereCondition = {};

  if (status) {
    whereCondition.status = {
      [Op.like]: `%${status}%`, 
    };
  }
  if (paymentStatus) {
    whereCondition.paymentStatus = {
      [Op.like]: `%${paymentStatus}%`, 
    };
  }

  return Order.findAll({
    // where: whereCondition,
    where: [
    adminStoreId ? { store_idstore: adminStoreId } : {},
    status ? { status: status } : {},
    paymentStatus ? { paymentStatus: paymentStatus } : {},
    ],
    include: [
      {
        model: User,
        // include: [
        //   {
        //     model: ProductStock,
        //     include: [
        //       { model: Product, include: [ProductImage] },
        //       { model: Store },
        //     ],
        //   },
        // ],
      },
      {
        model: Store,
      },
      {
        model: OrderDetail,
        include: [
          {
            model: ProductStock,
            include: [
              { model: Product, include: [ProductImage] },
              // { model: Store },
            ],
          },
        ],
      },
    ],
  });
};

export const getOrderDetailsQuery = async (orderId) => {
  try {
    const orderDetails = await OrderDetail.findAll({
      where: {
        order_idorder: orderId,
      },
      include: [
        {
          model: ProductStock, // Assuming ProductStock is your associated model
        },
      ],
    });

    return orderDetails;
  } catch (err) {
    throw err;
  }
};


export const getAllStoresQuery = async () => {
  try {
    const allStores = await Store.findAll();
    return allStores;
  } catch (err) {
    throw err;
  }
};

export const getProductAndBranchStoreQuery = async (productId, storeId) => {
  try {
    const result = await ProductStock.findOne({
      where: {
        product_idproduct: productId,
        store_idstore: storeId,
      },
    });

    return result;
  } catch (err) {
    throw err;
  }
};

export const updateStockQtyQuery = async (
  productId,
  storeId,
  newStock,
) => {
  const t = await ProductStock.sequelize.transaction();
  try {
    await ProductStock.update(
      {
        stock: newStock,
      },
      {
        where: {
          product_idproduct: productId,
          store_idstore: storeId,
        },
        transaction: t,
      },
    );

    await t.commit();
  } catch (err) {
    await t.rollback();
    console.error(err.message);
    throw err;
  }
};

export const createStockJournalQuery = async (
  //  orderId,
  productStock,
  quantity,
  adminStoreId,
) => {
  try {
    const result = await Journal.create({
      store_idstore: productStock.store_idstore,
      add: true,
      quantity: quantity,
      beforeStock: productStock.stock - quantity,
      afterStock: productStock.stock,
      transactionDate: new Date(),
      admin_iduser: adminStoreId,
      productStock_idproductStock: productStock.id,
    });

    return result;
  } catch (err) {
    throw err;
  }
};

export const getDeliveredOrdersQuery = async () => {
  try {
    const deliveredOrders = await Order.findAll({
      where: {
        status: 'delivery',
        paymentStatus: 'settlement',
      },
    });

    return deliveredOrders;
  } catch (error) {
    console.error('Error fetching delivered orders:', error);
    throw error;
  }
};


