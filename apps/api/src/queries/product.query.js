const { Op } = require('sequelize');
// const db = require('../models');
// const product = db.product;
// const productCategory = db.productCategory;
// const productStock = db.productStock;
// const store = db.store;
import product from '../models/product.model';
import productCategory from '../models/productCategory.model';
import productStock from '../models/productStock.model';
import store from '../models/store.model';
import city from '../models/city.model';
import user from '../models/user.model';



// const getPaginatedAndFilteredProductsQuery = async (
//   page,
//   pageSize,
//   sortField,
//   sortOrder,
//   categoryId,
//   productName,
//   cityId 
// ) => {
//   try {
//     console.log("query", page, pageSize, sortField, sortOrder, categoryId, productName, cityId);

//     const offset = (page - 1) * (pageSize || 0); // If pageSize is null, offset is set to 0

//     const whereCondition = {};

//     if (productName) {
//       whereCondition.name = {
//         [Op.like]: `%${productName}%`, // Case-insensitive search for product name
//       };
//     }

//     if (categoryId) {
//       whereCondition['$productCategory.idproductCategory$'] = categoryId;
//     }

//     if (cityId) {
//       whereCondition['$productStock.store.city.idcity$'] = cityId;
//     }

//     const products = await product.findAll(
//       {
//       offset,
//       limit: pageSize || undefined, // If pageSize is null, all records will be fetched
//       order: [[sortField, sortOrder]],
//       where: whereCondition,
//       // include: [
//       //   {
//       //     model: product,
//       //     as: 'product',
//       //   },
//       // ],
//         // {
//         //   model: product, // Assuming you have a model named ProductStock
//         //   as: 'product',
//         //   include: [
//         //     {
//         //       model: store,
//         //       include: [
//         //         {
//         //           model: city,
//         //         },
//         //       ],
//         //     },
//         //     // {
//         //     //   model: db.OrderDetail,
//         //     // },
//         //     // Add other associations if needed
//         //   ],
//         // },
//       // ],
//     }
//     );

//     const totalProducts = await productStock.count({
//       where: whereCondition,
//       include: [
//         {
//           model: productCategory,
//           as: 'productCategory',
//         },
//       ],
//     });

//     const totalPages = Math.ceil(totalProducts / (pageSize || totalProducts)); // If pageSize is null, totalPages is set to 1

//     return {
//       products,
//       // totalPages,
//     };
//   } catch (err) {
//     console.error('Error in getPaginatedAndFilteredProductsQuery:', err);
//     throw err;
//   }
// };

const getPaginatedAndFilteredProductsQuery = async () => {
  const result = await product.findAll({ include:[productStock],});

  return result;
}


module.exports = {
    getPaginatedAndFilteredProductsQuery
}