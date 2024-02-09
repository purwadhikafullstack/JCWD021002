const { Op, Sequelize } = require('sequelize');
import Order from "../models/order.model";
import OrderDetail from "../models/orderDetail.model";
import User from "../models/user.model";
import Store from "../models/store.model";
import ProductStock from "../models/productStock.model";
import Product from "../models/product.model";
import ProductCategory from "../models/productCategory.model";
import ProductCategory_has_Product from "../models/productCategory_has_Product.model";

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
          [Sequelize.col('ProductStock->Product.id'), 'productId'], // Adding Store Name to the select
          [Sequelize.col('ProductStock->Product.name'), 'productName'], // Adding Store Name to the select
          // [Sequelize.col('ProductStock->Product->ProductCategory_Has_Product.ProductCategory.id'), 'categoryId'], // Adding Store Name to the select

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
                // { store_idstore: storeId ? storeId : { [Op.ne]: null } },
                storeId ? { store_idstore: storeId } : {},
                { status: { [Op.not]: "new_order" } },
              ],
            },
          },
          {
            
                model: ProductStock,
                include: [
                  {
                    model: Product,
                    where: { id: productId ? productId : { [Op.ne]: null } },
                    attributes: [], // Exclude Product columns from the main query
                  },
                ],
                attributes: [], // Exclude ProductStock columns from the main query
          },
        ],
        group: [
          Sequelize.fn('DATE_FORMAT', Sequelize.col('Order.orderDate'), '%Y-%m-%d'),
          Sequelize.col('Order->Store.id'), // Include Store ID in the group by
          Sequelize.col('Order->Store.name'), // Include Store Name in the group by
          Sequelize.col('ProductStock->Product.id'), // Adding Store Name to the select
          Sequelize.col('ProductStock->Product.name'), // Adding Store Name to the select
          // Sequelize.col('ProductStock->Product->ProductCategory_Has_Product.ProductCategory.id'), // Adding Store Name to the select
          // [Sequelize.col('ProductStock->Product->ProductCategory.id'), 'categoryId'], // Adding Store Name to the select

          // Add other Store columns as needed
        ],
        raw: true,
        dialect: 'mysql', // Set the dialect explicitly
      });

      const resProduct = await Product.findAndCountAll();
      const resProductActive = await Product.findAndCountAll({where: {status: 1}});
      const resProductDeactive = await Product.findAndCountAll({where: {status: 0}});
      const resAdminStore = await User.findAndCountAll({where: {role_idrole: 2, status: 1}});
      const resUser = await User.findAndCountAll({where: {role_idrole: 3, status: 1}});
      const resStore = await Store.findAndCountAll();
      const resStoreActive = await Store.findAndCountAll({where: {status: 'active'}});
      const resStoreDeactive = await Store.findAndCountAll({where: {status: 'deactive'}});
      const resStock = await ProductStock.findAndCountAll({where: {store_idstore: storeId}});
      const resTotalStock = await ProductStock.findOne({
        attributes: [
          [Sequelize.fn('sum', Sequelize.col('stock')), 'totalStock'],
        ],
      });

      const aggregatedData = {
        totalSales: 0,
        totalQuantity: 0,
        totalTransactions: 0,
        saleDate: null,
        storeId: null,
        storeName: null,
        productId: null,
        productName: null,
        allProduct: resProduct?.count,
        allProductActive: resProductActive?.count,
        allProductDeactive: resProductDeactive?.count,
        allAdminStore: resAdminStore?.count,
        allUser: resUser?.count,
        allStore: resStore?.count,
        allStoreActive: resStoreActive?.count,
        allStoreDeactive: resStoreDeactive?.count,
        allStock: resStock?.count,
        allTotalStock: resTotalStock,
      };
  
      salesData.forEach((item) => {
        aggregatedData.totalSales += parseFloat(item.totalSales);
        aggregatedData.totalQuantity += parseInt(item.totalQuantity);
        aggregatedData.totalTransactions += parseInt(item.totalTransactions);
        aggregatedData.saleDate = item.date;
        aggregatedData.storeId = storeId ? item.storeId : null;
        aggregatedData.storeName =  storeId ? item.storeName : null;
        aggregatedData.productId = productId ? item.productId : null;
        aggregatedData.productName = productId ? item.productName : null;
      });
  
      // masih error di categoryId
      // return [aggregatedData];
      return aggregatedData;
  
    } catch (err) {
      throw err;
    }
  };
  
  const getTop5ProductsSoldQuery = async (startDate, endDate, storeId, categoryId, productId) => {
    try {
      const topProducts = await OrderDetail.findAll({
        attributes: [
          [Sequelize.col('ProductStock->Product.id'), 'productId'],
          [Sequelize.col('ProductStock->Product.name'), 'productName'],
          [Sequelize.fn('sum', Sequelize.col('quantity')), 'totalQuantity'],
        ],
        include: [
          {
            model: Order,
            attributes: [],
            include: [
              {
                model: Store,
                attributes: [],
              },
            ],
            where: {
              [Op.and]: [
                { orderDate: { [Op.gte]: new Date(`${startDate}T00:00:00.000Z`) } },
                { orderDate: { [Op.lte]: new Date(`${endDate}T23:59:59.999Z`) } },
                storeId ? { store_idstore: storeId } : {},
              ],
            },
          },
          {
            model: ProductStock,
            include: [
              {
                model: Product,
                where: { id: productId ? productId : { [Op.ne]: null } },
                attributes: [],
              },
            ],
            attributes: [],
          },
        ],
        group: [
          Sequelize.col('ProductStock->Product.id'),
          Sequelize.col('ProductStock->Product.name'),
        ],
        order: [[Sequelize.fn('sum', Sequelize.col('quantity')), 'DESC']],
        limit: 5, // Adjust this number based on the desired number of top products
        raw: true,
        dialect: 'mysql',
      });
  
      return topProducts;
    } catch (err) {
      throw err;
    }
  };
  


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

const createSalesReportQuery = async (
  startDate,
  endDate,
  page,
  pageSize,
  sortOrder,
  categoryId,
  productId,
  storeId
) => {
  try {
    const offset = (page - 1) * (pageSize || 0);

    const productStockQuery = await ProductStock.findAll({
      attributes: ['id'],
          include: [
            {
              model: Product,
              attributes: ['id', 'name'],
              include: [
                {
                  model: ProductCategory,
                  attributes: [],
                  where: categoryId ? { id: categoryId } : {},
                },
              ],
              where: productId ? { id: productId } : {},
            },
          ],
          where: storeId ? { store_idstore: storeId } : {},
    })

    const productStockIds = productStockQuery.map((product) => product.id);

    const res = await OrderDetail.findAndCountAll({
      required: true,
      where: {
        productStock_idproductStock: { [Op.in]: productStockIds },
      },
        include: [
          {
            model: Order,
            required: true,
            include: [
              {
                model: User,
                attributes: ['username'],
              },
              {
                model: Store,
                attributes: ['name'],
              },
            ],
            where: {
              orderDate: {
                [Op.gte]: new Date(`${startDate}T00:00:00.000Z`),
                [Op.lte]: new Date(`${endDate}T23:59:59.999Z`),
              },
              status: { [Op.not]: "new_order" },
            },
          },
          {
            model: ProductStock,
            attributes:['id'],
            include: [
              {
                model: Product,
                attributes: ['id', 'name']
              }
            ]
          }
        ],
        order: [['id', sortOrder]],
        offset: offset,
        limit: pageSize ? parseInt(pageSize) : undefined,
    });

    const totalPages = Math.ceil(res.count / (pageSize || res.count));

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
  getTop5ProductsSoldQuery,
};
