const { Op, Sequelize } = require('sequelize');
import Product from '../models/product.model';
import ProductCategory from '../models/productCategory.model';
import ProductStock from '../models/productStock.model';
import Store from '../models/store.model';
import City from '../models/city.model';
import User from '../models/user.model';
import ProductImage from '../models/productImage.model';
import Mass from '../models/mass.model';
import Packaging from '../models/packaging.model';
import RatingsAndReviews from '../models/ratingsAndReviews.model';
import UsageRestriction from '../models/usageRestriction.model';
import Discount from '../models/discount.model';
import DiscountDistribution from '../models/discountDistribution.model';
import DiscountType from '../models/discountType.model';



const getPaginatedAndFilteredProductsQuery = async (
  page,
  pageSize,
  sortField,
  sortOrder,
  categoryId,
  productName,
  cityId,
  storeId,
  statusProduct,
  statusStock,
) => {
  try {
    console.log(
      'query',
      page,
      pageSize,
      sortField,
      sortOrder,
      categoryId,
      productName,
      cityId,
      storeId,
      statusProduct,
      statusStock,
    );

    const offset = (page - 1) * (pageSize || 0);

    const whereCondition = {};

    if (productName) {
      whereCondition.name = {
        [Op.like]: `%${productName}%`,
      };
    }

    const productStockQuery = {
      where: {
        status: statusStock ? statusStock : [0, 1],
        store_idstore: storeId ? storeId : {},
        // Add other conditions here
      },
      include: [
        {
          model: Store,
              where: cityId ? { city_idcity: cityId } : {},
        },
      ],
      // Add any other conditions for ProductStock here
    };

    const productStocks = await ProductStock.findAll(productStockQuery);

    const productStockIds = productStocks.map((stock) => stock.id)
    const productIds = productStocks.map((stock) => stock.product_idproduct);

    const products = await Product.findAll({
      attributes: {
        include: [
          [Sequelize.literal('(SELECT AVG(rating) FROM RatingAndReview WHERE RatingAndReview.product_idproduct = Product.id)'), 'averageRating'],
          [Sequelize.literal('(SELECT COUNT(rating) FROM RatingAndReview WHERE RatingAndReview.product_idproduct = Product.id)'), 'totalReviews'],
        ],
      },
      offset: offset,
      limit: pageSize ? pageSize : undefined,
      order: [[sortField, sortOrder]],
      where: {
        ...whereCondition,
        id: productIds, // Filter based on the associated ProductStocks
        ...(statusProduct ? { status: statusProduct } : {}),
      },
      required: true,
      include: [
        {
          model: ProductCategory,
          through: { attributes: [] },
          where: categoryId ? { id: categoryId } : {},
        },
        {
          model: ProductImage,
        },
        {
          separate: true,
          model: ProductStock,
          where: {
            id: productStockIds,
            // Add other conditions for ProductStock here
          },
        },
        {
          model: Mass,
        },
        {
          model: Packaging,
        },
        // {
        //   separate: true,
        //   model: RatingsAndReviews,
        //   where: { product_idproduct: productIds },
        //   attributes: [
        //     'product_idproduct',
        //     [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating'],
        //     [Sequelize.fn('COUNT', Sequelize.col('rating')), 'totalReviews'],
        //   ],
        //   group: ['product_idproduct'],
        // },
      ],
    });

    const totalProducts = await Product.count({
      where: {
        ...whereCondition,
        id: productIds, // Filter based on the associated ProductStocks
        ...(statusProduct ? { status: statusProduct } : {}),
      },
      required: true,
      include: [
        {
          model: ProductCategory,
          through: { attributes: [] },
          where: categoryId ? { id: categoryId } : {},
        },
        {
          separate: true,
          model: ProductStock,
          where: {
            id: productStockIds,
            // Add other conditions for ProductStock here
          },
        },
      ],
    });

    const totalPages = Math.ceil(totalProducts / (pageSize || totalProducts));

    return {
      products,
      totalPages,
    };
  } catch (err) {
    console.error('Error in getPaginatedAndFilteredProductsQuery:', err);
    throw err;
  }
};


const getPaginatedAndFilteredProductsRealQuery = async (
  page,
  pageSize,
  sortField,
  sortOrder,
  categoryId,
  productName,
  status
) => {
  try {
    console.log(
      'query',
      page,
      pageSize,
      sortField,
      sortOrder,
      categoryId,
      productName,
      status,
    );

    const offset = (page - 1) * (pageSize || 0);

    const whereCondition = {};

    if (productName) {
      whereCondition.name = {
        [Op.like]: `%${productName}%`,
      };
    }

    const products = await Product.findAll({
      offset: offset,
      limit: pageSize ? pageSize : undefined,
      order: [[sortField, sortOrder]],
      where: {
        ...whereCondition,
        ...(status ? { status: status } : {}),
      },
      required: true,
      include: [
        {
          model: ProductCategory,
          through: { attributes: [] },
          where: categoryId ? { id: categoryId } : {},
        },
        {
          model: ProductImage,
        },
        {
          model: ProductStock,
        },
        {
          model: Mass,
        },
        {
          model: Packaging,
        },
      ],
    });

    const totalProducts = await Product.count({
      where: {
        ...whereCondition,
        ...(status ? { status: status } : {}),
      },
      required: true,
      include: [
        {
          model: ProductCategory,
          through: { attributes: [] },
          where: categoryId ? { id: categoryId } : {},
        },
      ],
    });

    const totalPages = Math.ceil(totalProducts / (pageSize || totalProducts));

    return {
      products,
      totalPages,
    };
  } catch (err) {
    console.error('Error in getPaginatedAndFilteredProductsQuery:', err);
    throw err;
  }
};

const getDetailProductRealQuery = async (id) => {
  try {
    const result = await Product.findOne({
      include: [
          
            {
              model: ProductCategory,
              through: { attributes: [] }, // This removes unnecessary attributes from the join table
            },
            {
              model: ProductImage,
            },
            {
              model: Mass,
            },
            {
              model: Packaging,
            },
      ],
      where: {
        id: id,
      },
    });

    return result;
  } catch (err) {
    throw err;
  }
}

const getDetailProductQuery = async (id) => {
  try {
    const result = await ProductStock.findOne({
      include: [
        {
          model: Product,
          include: [
            {
              model: ProductCategory,
              through: { attributes: [] },
            },
            {
              model: ProductImage,
            },
            {
              model: Mass,
            },
            {
              model: Packaging,
            },
            {
              model: RatingsAndReviews,
              attributes: [],
            },
          ],
        },
        {
          separate: true,
          model: Discount,
          where: {
            startDate: { [Sequelize.Op.lte]: new Date() }, // Include discounts with start date less than or equal to the current date
            endDate: { [Sequelize.Op.gte]: new Date() },   // Include discounts with end date greater than or equal to the current date
            productStock_idproductStock: id, // Additional condition to match productStock_idproductStock with the main query's id
          },
          include: [
            {
              model: UsageRestriction,
            },
            {
              model: DiscountType,
            },
            {
              model: DiscountDistribution,
            },
            {
              model: Store,
            },
          ],
        },
      ],
      where: {
        id: id,
      },
    });

    // Subquery to calculate average rating and total reviews
    const subquery = await RatingsAndReviews.findOne({
      attributes: [
        [
          Sequelize.fn('AVG', Sequelize.col('rating')),
          'averageRating',
        ],
        [Sequelize.fn('COUNT', Sequelize.col('rating')), 'totalReviews'],
      ],
      where: {
        product_idproduct: result.Product.id,
      },
      raw: true,
    });

    return {result, subquery};
  } catch (err) {
    console.log('Error in query:', err);
    throw err;
  }
};


const addProductQuery = async (
  name,
  price,
  description,
  createdBy,
  massProduct,
  massId,
  packagingId,
) => {
  try {
    console.log('ini di query', name, price, description, createdBy);
    const res = await Product.create({
      name,
      price,
      description,
      createdAt: new Date(),
      createdBy_iduser: createdBy,
      status: 1,
      massProduct,
      mass_idmass: massId,
      packaging_idpackaging: packagingId,
    });

    return res;
  } catch (err) {
    // console.error('Error in addProductQuery:', err);
    throw err;
  }
};

const addImageProductQuery = async (imageUrl, product_idproduct) => {
  try {
    console.log('ini di query', imageUrl, product_idproduct);
    console.log(typeof product_productid);
    const res = await ProductImage.create({
      imageUrl,
      product_idproduct,
    });

    return res;
  } catch (err) {
    // console.error('Error in addProductQuery:', err);
    throw err;
  }
};

  const deleteProductImageQuery = async (imageUrl, productId) => {
    try {
      const res = await ProductImage.destroy({
        where: {
          imageUrl: imageUrl,
          product_idproduct: productId,
        }
      })

      return res;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

const softDeleteProductQuery = async (id) => {
  try {
    await Product.update(
      {
        status: 0,
      },
      {
        where: { id: id.id },
      },
    );
  } catch (err) {
    throw err;
  }
};

const updateProductQuery = async (
  id,
  name,
  description,
  price,
  status,
  massProduct,
  mass_idmass,
  packaging_idpackaging,
) => {
  try {
    // Create an object with non-null values
    const updatedValue = {
      name,
      description,
      price,
      status,
      massProduct,
      mass_idmass,
      packaging_idpackaging,
    };

    // Remove properties with null values
    Object.keys(updatedValue).forEach((key) => {
      if (updatedValue[key] == null || updatedValue[key] == undefined) {
        delete updatedValue[key];
      }
    });
    console.log(updatedValue);

    // Ensure that the values are valid before calling the update
    if (id) {
      await Product.update(updatedValue, {
        where: {
          id: id,
        },
      });
    } else {
      // Handle invalid input values
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// const getPaginatedAndFilteredProductsQuery = async () => {
//   const result = await ProductStock.findAll({include: [{model: Product, include: [{model: User}]}]});

//   return result;
// }

module.exports = {
  getPaginatedAndFilteredProductsQuery,
  getPaginatedAndFilteredProductsRealQuery,
  getDetailProductQuery,
  getDetailProductRealQuery,
  addProductQuery,
  addImageProductQuery,
  softDeleteProductQuery,
  updateProductQuery,
  deleteProductImageQuery,
};
