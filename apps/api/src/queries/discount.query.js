const { Op } = require('sequelize');
import Discount from '../models/discount.model';
import DiscountType from '../models/discountType.model';
import Product from '../models/product.model';
import ProductStock from '../models/productStock.model';
import UsageRestriction from '../models/usageRestriction.model'


    
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
    ) => {
        try {
            const updatedValue = {
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
                referralCode,
                banner,
                discountNom,
                distributionId,
              };
        
              // Remove properties with null values
              Object.keys(updatedValue).forEach((key) => {
                if (updatedValue[key] == null || updatedValue[key] == undefined || addedValue[key] == undefined) {
                  delete updatedValue[key];
                }
              });

            const result = Discount.update(updatedValue)

            return result;
        } catch (err) {
            throw err;
        }
    }

    module.exports = {
        addDiscountQuery,
        getPaginatedAndFilteredDiscountQuery,
        updateDiscountQuery,
    }