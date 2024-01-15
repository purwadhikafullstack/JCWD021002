const { Op, Sequelize } = require('sequelize');
// const { Order, OrderDetail, User, Store, ProductStock } = require('./models');
import Order from "../models/order.model";
import OrderDetail from "../models/orderDetail.model";
import User from "../models/user.model";
import Store from "../models/store.model";
import ProductStock from "../models/productStock.model";
import Product from "../models/product.model";
import ProductCategory from "../models/productCategory.model";

// const getSalesByDateQuery = async (startDate, endDate, storeId) => {
//     try {
//       const salesData = await OrderDetail.findAll({
//         attributes: [
//           [Sequelize.fn('DATE_FORMAT', Sequelize.col('Order.orderDate'), '%Y-%m-%d'), 'date'],
//           [Sequelize.fn('sum', Sequelize.col('subtotal')), 'totalSales'],
//           [Sequelize.fn('sum', Sequelize.col('quantity')), 'totalQuantity'],
//           [Sequelize.fn('count', Sequelize.col('Order.id')), 'totalTransactions'],
//           [Sequelize.col('Order->Store.id'), 'storeId'], // Adding Store ID to the select
//           [Sequelize.col('Order->Store.name'), 'storeName'], // Adding Store Name to the select
//           // Add other Store columns as needed
//         ],
//         include: [
//           {
//             model: Order,
//             attributes: [],
//             include: [
//               {
//                 // required: true,
//                 model: Store,
//                 attributes: [], // Exclude Store columns from the main query
//                 where: storeId ? { id: storeId } : {},
//               },
//             ],
//             where: {
//               orderDate: {
//                 [Op.gte]: new Date(`${startDate}T00:00:00.000Z`),
//                 [Op.lte]: new Date(`${endDate}T23:59:59.999Z`),
//               },
//             },
//           },
//         ],
//         group: [
//           Sequelize.fn('DATE_FORMAT', Sequelize.col('Order.orderDate'), '%Y-%m-%d'),
//           Sequelize.col('Order->Store.id'), // Include Store ID in the group by
//           Sequelize.col('Order->Store.name'), // Include Store Name in the group by
//           // Add other Store columns as needed
//         ],
//         raw: true,
//         dialect: 'mysql', // Set the dialect explicitly
//       });
  
//       return salesData.map((item) => ({
//         totalSales: parseFloat(item.totalSales),
//         totalQuantity: parseInt(item.totalQuantity),
//         totalTransactions: parseInt(item.totalTransactions),
//         saleDate: item.date,
//         storeId: item.storeId, // Include Store ID in the result
//         storeName: item.storeName, // Include Store Name in the result
//         // Add other Store columns as needed
//       }));
  
//     } catch (err) {
//       throw err;
//     }
//   };

const getSalesByDateQuery = async (startDate, endDate, storeId, categoryId, productId) => {
    try {
      const salesData = await OrderDetail.findAll({
        attributes: [
          [Sequelize.fn('DATE_FORMAT', Sequelize.col('Order.orderDate'), '%Y-%m-%d'), 'date'],
          [Sequelize.fn('sum', Sequelize.col('subtotal')), 'totalSales'],
          [Sequelize.fn('sum', Sequelize.col('quantity')), 'totalQuantity'],
          [Sequelize.fn('count', Sequelize.col('Order.id')), 'totalTransactions'],
          [Sequelize.col('Order->Store.id'), 'storeId'], // Adding Store ID to the select
          [Sequelize.col('Order->Store.name'), 'storeName'], // Adding Store Name to the select
          // Add other Store columns as needed
        ],
        include: [
          {
            model: Order,
            attributes: [],
            include: [
              {
                model: Store,
                attributes: [], // Exclude Store columns from the main query
              },
            ],
            where: {
              [Op.and]: [
                { orderDate: { [Op.gte]: new Date(`${startDate}T00:00:00.000Z`) } },
                { orderDate: { [Op.lte]: new Date(`${endDate}T23:59:59.999Z`) } },
                { store_idstore: storeId ? storeId : { [Op.ne]: null } },
              ],
            },
          },
          {
            model: OrderDetail,
            include: [
              {
                model: ProductStock,
                include: [
                  {
                    model: Product,
                    include: [
                      {
                        where: { id: categoryId ? categoryId : { [Op.ne]: null } },
                        attributes: [], // Exclude ProductCategory columns from the main query
                      },
                    ],
                    where: { id: productId ? productId : { [Op.ne]: null } },
                    attributes: [], // Exclude Product columns from the main query
                  },
                ],
                attributes: [], // Exclude ProductStock columns from the main query
              },
            ],
          },
        ],
        group: [
          Sequelize.fn('DATE_FORMAT', Sequelize.col('Order.orderDate'), '%Y-%m-%d'),
          Sequelize.col('Order->Store.id'), // Include Store ID in the group by
          Sequelize.col('Order->Store.name'), // Include Store Name in the group by
          // Add other Store columns as needed
        ],
        raw: true,
        dialect: 'mysql', // Set the dialect explicitly
      });
  
      return salesData.map((item) => ({
        totalSales: parseFloat(item.totalSales),
        totalQuantity: parseInt(item.totalQuantity),
        totalTransactions: parseInt(item.totalTransactions),
        saleDate: item.date,
        storeId: item.storeId, // Include Store ID in the result
        storeName: item.storeName, // Include Store Name in the result
        // Add other Store columns as needed
      }));
  
    } catch (err) {
      throw err;
    }
  };
  

  

// const getSalesByDateQuery = async (startDate, endDate, storeId) => {
//     try {
//       const salesData = await OrderDetail.findAll({
//         attributes: [
//           [Sequelize.fn('DATE_FORMAT', Sequelize.col('Order.orderDate'), '%Y-%m-%d'), 'date'],
//           [Sequelize.fn('sum', Sequelize.col('subtotal')), 'totalSales'],
//           [Sequelize.fn('sum', Sequelize.col('quantity')), 'totalQuantity'],
//           [Sequelize.fn('count', Sequelize.col('Order.id')), 'totalTransactions'],
//           [Sequelize.col('Order->Store.id'), 'storeId'], // Adding Store ID to the select
//           [Sequelize.col('Order->Store.name'), 'storeName'], // Adding Store Name to the select
//           // Add other Store columns as needed
//         ],
//         include: [
//           {
//             model: Order,
//             attributes: [],
//             include: [
//               {
//                 model: Store,
//                 attributes: [], // Exclude Store columns from the main query
//               },
//             ],
//             where: {
//               [Op.and]: [
//                 { orderDate: { [Op.gte]: new Date(`${startDate}T00:00:00.000Z`) } },
//                 { orderDate: { [Op.lte]: new Date(`${endDate}T23:59:59.999Z`) } },
//                 // Include the storeId condition directly in the Order model where clause
//                 {store_idstore: storeId ? storeId : { [Op.ne]: null },}
//               ],
//             },
//           },
//         ],
//         group: [
//           Sequelize.fn('DATE_FORMAT', Sequelize.col('Order.orderDate'), '%Y-%m-%d'),
//           Sequelize.col('Order->Store.id'), // Include Store ID in the group by
//           Sequelize.col('Order->Store.name'), // Include Store Name in the group by
//           // Add other Store columns as needed
//         ],
//         raw: true,
//         dialect: 'mysql', // Set the dialect explicitly
//       });
  
//       return salesData.map((item) => ({
//         totalSales: parseFloat(item.totalSales),
//         totalQuantity: parseInt(item.totalQuantity),
//         totalTransactions: parseInt(item.totalTransactions),
//         saleDate: item.date,
//         storeId: item.storeId, // Include Store ID in the result
//         storeName: item.storeName, // Include Store Name in the result
//         // Add other Store columns as needed
//       }));
  
//     } catch (err) {
//       throw err;
//     }
//   };

const getProductsByTransactionQuery = async (transactionId) => {
  try {
    const res = await Order.findByPk(transactionId, {
      include: [
        {
          model: OrderDetail,
          include: [
            {
              model: ProductStock,
            },
          ],
        },
        {
          model: User,
        },
        {
          model: Store,
        },
      ],
    });
    return res;
  } catch (err) {
    throw err;
  }
};

const createSalesReportQuery = async (startDate, endDate, page = 1, pageSize = 10, sortOrder = 'asc', categoryId, productId) => {
    try {
      const offset = (page - 1) * pageSize;
  
      const res = await Order.findAndCountAll({
        where: {
          orderDate: {
            [Op.gte]: new Date(`${startDate}T00:00:00.000Z`),
            [Op.lte]: new Date(`${endDate}T23:59:59.999Z`),
          },
        },
        include: [
          {
            model: OrderDetail,
            include: [
              {
                model: ProductStock,
                include: [{
                    model: Product,
                    where: productId ? { id: productId } : {},
                    include: [
                        {
                            model: ProductCategory,
                            through: { attributes: [] },
                            where: categoryId ? { id: categoryId } : {},
                          },
                    ]
                }]
              },
            ],
          },
          {
            model: User,
          },
          {
            model: Store,
          },
        ],
        order: [['orderDate', sortOrder]],
        offset: offset,
        limit: pageSize,
      });
  
      const totalPages = Math.ceil(res.count / pageSize);
  
      return {
        total: res.count,
        data: res.rows,
        totalPages: totalPages,
      };
    } catch (err) {
      throw err;
    }
  };
  

module.exports = {
  getSalesByDateQuery,
  getProductsByTransactionQuery,
  createSalesReportQuery,
};
