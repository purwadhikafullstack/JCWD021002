const { Op, Sequelize } = require('sequelize');
import Discount from '../models/discount.model';
import DiscountType from '../models/discountType.model';
import Product from '../models/product.model';
import ProductStock from '../models/productStock.model';
import UsageRestriction from '../models/usageRestriction.model'
import DiscountDistribution from '../models/discountDistribution.model'
import Store from '../models/store.model'
const moment = require('moment');
    
      const getPaginatedAndFilteredDiscountQuery = async (
                page,
                pageSize,
                sortField,
                sortOrder,
                discountName,
                typeId,
                usageRestrictionId,
                productName,
                status,
                storeId,
      ) => {
        try {
          console.log(
            'query',
                page,
                pageSize,
                sortField,
                sortOrder,
                discountName,
                typeId,
                usageRestrictionId,
                productName,
                status,
                storeId,
          );

          const offset = (page - 1) * (pageSize || 0);

          const whereCondition = {};

          if (discountName) {
            whereCondition.name = {
              [Op.like]: `%${discountName}%`,
            };
          }

          if (status) {
            whereCondition.status = {
              [Op.eq]: `${status}`,
            };
          }

          const discounts = await Discount.findAll({
            offset: offset,
            limit: pageSize ? pageSize : undefined,
            order: [[sortField, sortOrder]],
            where: {
              ...whereCondition,
              ...(storeId ? { store_idstore: storeId } : {}),
            },
            include: [
              {
                required: true,
                model: DiscountType,
                where: typeId ? { id: typeId } : {},
              },
              {
                required: true,
                model: UsageRestriction,
                where: usageRestrictionId ? { id: usageRestrictionId } : {}
              },
              {
                model: ProductStock,
                include: [
                  {
                    model: Product,
                    where: productName ? { name: {
                      [Op.like]: `%${productName}%`,
                    } } : {}
                  }
                ]
              }
            ],
          });

          const totalDiscounts = await Discount.count({
            where: {
              ...whereCondition,
              ...(storeId ? { store_idstore: storeId } : {}),
            },
            include: [
              {
                required: true,
                model: DiscountType,
                where: typeId ? { id: typeId } : {},
              },
              {
                required: true,
                model: UsageRestriction,
                where: usageRestrictionId ? { id: usageRestrictionId } : {}
              },
              {
                model: ProductStock,
                include: [
                  {
                    model: Product,
                    where: productName ? { name: {
                      [Op.like]: `%${productName}%`,
                    } } : {}
                  }
                ]
              }
            ],
          });

          const totalPages = Math.ceil(totalDiscounts / (pageSize || totalDiscounts));

          return {
            discounts,
            totalPages,
          };
        } catch (err) {
          console.error('Error in getPaginatedAndFilteredDiscountQuery:', err);
          throw err;
        }
      };

      const getPaginatedAndFilteredVoucherQuery = async (
                page,
                pageSize,
                sortField,
                sortOrder,
                discountName,
                typeId,
                usageRestrictionId,
                productName,
                status,
                storeId,
                productStockId,
      ) => {
        try {
          console.log(
            'query',
                page,
                pageSize,
                sortField,
                sortOrder,
                discountName,
                typeId,
                usageRestrictionId,
                productName,
                status,
                storeId,
          );

          const offset = (page - 1) * (pageSize || 0);

          const whereCondition = {};

          if (discountName) {
            whereCondition.name = {
              [Op.like]: `%${discountName}%`,
            };
          }

          if (status) {
            whereCondition.status = {
              [Op.eq]: `${status}`,
            };
          }

          whereCondition.endDate = {
            [Op.gte]: moment().toDate(),
          };

          whereCondition.distributionId = {
              [Op.eq]: 2,
          };

          whereCondition.productStock_idproductStock = {
            [Op.or]: [null, productStockId],
          };

          whereCondition.referralCode = {
            [Op.or]: [null, 0],
          };
      
          const discounts = await Discount.findAndCountAll({
            offset: offset,
            limit: pageSize ? pageSize : undefined,
            order: [[sortField, sortOrder]],
            where: {
              ...whereCondition,
              ...(storeId ? { store_idstore: storeId } : {}),
              startDate: { [Sequelize.Op.lte]: new Date() }, // Include discounts with start date less than or equal to the current date
              endDate: { [Sequelize.Op.gte]: new Date() },
            },
            include: [
              {
                required: true,
                model: DiscountType,
                where: typeId ? { id: typeId } : {},
              },
              {
                required: true,
                model: UsageRestriction,
                where: usageRestrictionId ? { id: usageRestrictionId } : {}
              },
              {
                model: ProductStock,
                include: [
                  {
                    model: Product,
                    where: productName ? { name: {
                      [Op.like]: `%${productName}%`,
                    } } : {}
                  }
                ]
              }
            ],
          });

          
          const totalPages = Math.ceil(discounts.count / (pageSize || discounts.count));

          return {
            discounts: discounts.rows,
            totalPages: totalPages,
          };
        } catch (err) {
          console.error('Error in getPaginatedAndFilteredDiscountQuery:', err);
          throw err;
        }
      };


      const getDetailDiscountQuery = async (id) => {
        try {
          const result = await Discount.findOne({
            where: {
              id: id
            },
            include: [
              {
                model: UsageRestriction,
              },
              {
                model: DiscountType,
              },
              {
                model: ProductStock,
                include: [Product]
              },
              {
                model: UsageRestriction,
              },
              {
                model: DiscountDistribution,
              },
              {
                model: Store,
              }
            ]
          })

          return result;
        } catch (err) {
          throw err;
        }
      }



    const addDiscountQuery = async (
        type,
        discountValue,
        minimumPurchase,
        startDate,
        endDate,
        productStock_idproductStock,
        buy_quantity,
        get_quantity,
        discountAmount,
        usageRestrictionId,
        name,
        description,
        referralCode,
        banner,
        discountNom,
        distributionId,
    ) => {
        try {
            const addedValue = {
                type,
                discountValue,
                minimumPurchase,
                startDate,
                endDate,
                productStock_idproductStock,
                buy_quantity,
                get_quantity,
                status : 1,
                discountAmount,
                usageRestrictionId,
                name,
                description,
                referralCode,
                banner,
                discountNom,
                distributionId,
              };
        
              // Remove properties with null values
              Object.keys(addedValue).forEach((key) => {
                if (addedValue[key] == null || addedValue[key] == undefined || addedValue[key] == 'undefined' || addedValue[key] == 0) {
                  delete addedValue[key];
                }
              });

            const result = Discount.create(addedValue)

            return result;
        } catch (err) {
            throw err;
        }
    }

      const updateDiscountQuery = async (
        id,
        type,
        discountValue,
        minimumPurchase,
        startDate,
        endDate,
        productStock_idproductStock,
        buy_quantity,
        get_quantity,
        discountAmount,
        usageRestrictionId,
        referralCode,
        banner,
        discountNom,
        distributionId,
        name,
        description,
        status,
    ) => {
        try {
          console.log("ini di query", 
          id,
        type,
        discountValue,
        minimumPurchase,
        startDate,
        endDate,
        productStock_idproductStock,
        buy_quantity,
        get_quantity,
        discountAmount,
        usageRestrictionId,
        referralCode,
        banner,
        discountNom,
        distributionId,
        name,
        description,
        status,
          );

            const updatedValue = {
                type,
                discountValue,
                minimumPurchase,
                startDate,
                endDate,
                productStock_idproductStock,
                buy_quantity,
                get_quantity,
                discountAmount,
                usageRestrictionId,
                referralCode,
                banner,
                discountNom,
                distributionId,
                name,
                description,
                status,
              };
        
              // Remove properties with null values
              Object.keys(updatedValue).forEach((key) => {
                if (updatedValue[key] == null || updatedValue[key] == 'null' || updatedValue[key] == undefined ||  updatedValue[key] == 'undefined' || updatedValue[key] == ' ' || updatedValue[key] == '') {
                  delete updatedValue[key];
                }
              });

            const result = Discount.update(updatedValue, {
              where: {id : id},
            })

            return result;
        } catch (err) {
            throw err;
        }
    }

    module.exports = {
        addDiscountQuery,
        getPaginatedAndFilteredDiscountQuery,
        updateDiscountQuery,
        getDetailDiscountQuery,
        getPaginatedAndFilteredVoucherQuery,
    }