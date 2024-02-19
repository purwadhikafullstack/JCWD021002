const { Op, Sequelize } = require('sequelize');
import Store from "../models/store.model";
import ProductStock from "../models/productStock.model";
import Product from "../models/product.model";
import Journal from '../models/journal.model';
import Province from '../models/province.model';
import City from '../models/city.model';
import User from "../models/user.model";

const getStockByDateQuery = async (startDate, endDate, productId, storeId, sortOrder, page, pageSize) => {
  try {
    const offset = (page - 1) * (pageSize || 0);

    const productStockQuery = await ProductStock.findAll({
      attributes: ['id'],
      include: [
        {
          model: Product,
          attributes: ['id', 'name'],
          where: productId ? { id: productId } : {},
        },
      ],
      where: storeId ? { store_idstore: storeId } : {},
    });

    const productStockIds = productStockQuery.map((product) => product.id);

    const whereConditions = {
      transactionDate: {
        [Op.gte]: new Date(`${startDate}T00:00:00.000Z`),
        [Op.lte]: new Date(`${endDate}T23:59:59.999Z`),
      },
      add: { [Op.in]: [1, 0] },
    };

    if (storeId) {
      whereConditions.store_idstore = storeId;
    }

    if(productId && productStockIds.length == 0) {
      return {
        data: [],
        totalPages: 0,
      };
    } else if (productStockIds.length > 0) {
      whereConditions.productStock_idproductStock = { [Op.in]: productStockIds };
    }

    const stockData = await Journal.findAndCountAll({
      attributes: [
        [Sequelize.fn('sum', Sequelize.literal('CASE WHEN `add` = 1 THEN `quantity` ELSE 0 END')), 'totalAdditions'],
        [Sequelize.fn('sum', Sequelize.literal('CASE WHEN `add` = 0 THEN `quantity` ELSE 0 END')), 'totalSubtractions'],
        [Sequelize.col('ProductStock.stock'), 'finalStock'],
        [Sequelize.col('productStock_idproductStock'), 'productStockId'],
        [Sequelize.col('ProductStock->Product.id'), 'productId'],
        [Sequelize.col('ProductStock->Product.name'), 'productName'],
        [Sequelize.col('Store.id'), 'storeId'],
        [Sequelize.col('Store.name'), 'storeName'],
        [Sequelize.col('Store->City->Province.province'), 'province'],
        [Sequelize.col('Store->City.city'), 'city'],
        [Sequelize.col('User.id'), 'userId'],
        [Sequelize.col('User.username'), 'username'],
      ],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: ProductStock,
          attributes: [],
          include: [
            {
              model: Product,
              attributes: ['id', 'name'],
            },
          ],
        },
        {
          model:Store,
          attributes: ['id', 'name'],
          include: [
            {
              model: City,
              attributes: ['id', 'city'],
              include: [
                {
                  model: Province,
                  attributes: ['id', 'province']
                }
              ]
            }
          ]
        }
      ],
      where: whereConditions,
      group: ['productStock_idproductStock', 'ProductStock->Product.id', 'Store.id', 'User.id'],
      raw: true,
      order: [[{model: Store}, 'name', sortOrder]],
      offset: offset,
      limit: pageSize ? parseInt(pageSize) : undefined,
    });
    
    const totalPages = Math.ceil(stockData.count.length / (pageSize || stockData.count.length));

      return {
        totalPages,
        data: stockData.rows.map((entry) => ({
          totalAdditions: entry.totalAdditions,
          totalSubtractions: entry.totalSubtractions,
          finalStock: entry.finalStock,
          productStockId: entry.productStockId,
          productId: entry['ProductStock.Product.id'],
          productName: entry['ProductStock.Product.name'],
          username: entry['User.username'],
          storeId: entry['Store.id'],
          storeName: entry['Store.name'],
          province: entry['Store.City.Province.province'],
          city: entry['Store.City.city'],
        })),
      };

  } catch (err) {
    throw err;
  }
};

const createStockReportQuery = async (
    startDate,
    endDate,
    page,
    pageSize,
    sortOrder,
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
                where: productId ? { id: productId } : {},
              },
            ],
            where: storeId ? { store_idstore: storeId } : {},
      })
  
      const productStockIds = productStockQuery.map((product) => product.id);

      const whereConditions = {
        transactionDate: {
          [Op.gte]: new Date(`${startDate}T00:00:00.000Z`),
          [Op.lte]: new Date(`${endDate}T23:59:59.999Z`),
        },
      };

      if (storeId) {
        whereConditions.store_idstore = storeId;
      }
  
      if(productId && productStockIds.length == 0) {
        return {
          total: 0,
          data: [],
          totalPages: 0,
        };
      } else if (productStockIds.length > 0) {
        whereConditions.productStock_idproductStock = { [Op.in]: productStockIds };
      }
  
  
      const res = await Journal.findAndCountAll({
        required: true,
          include: [
            {
              model: ProductStock,
              attributes:['id'],
              include: [
                {
                  model: Product,
                  attributes: ['name']
                }
              ],
            },
            {
                model: Store,
                attributes: ['name'],
                include: [
                  {
                    model: City,
                    attributes: ['city'],
                    include: [
                      {
                        model: Province,
                        attributes: ['province']
                      }
                    ]
                  }
                ]
            },
            {
              model: User,
              attributes: ['username']
            }
          ],
          where: whereConditions,
          order: [['transactionDate', sortOrder]],
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
      createStockReportQuery,
      getStockByDateQuery,
  }