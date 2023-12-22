const { Op } = require('sequelize');
import ProductCategory from '../models/productCategory.model';
import ProductCategory_has_Product from '../models/productCategory_has_Product.model'

const getPaginatedAndFilteredCategoryQuery = async (
  page,
  pageSize,
  sortField,
  sortOrder,
  categoryName,
) => {
  try {

    const offset = (page - 1) * (pageSize || 0);

    const whereCondition = {};

    if (categoryName) {
      whereCondition['$ProductCategory.category$'] = {
        [Op.like]: `%${categoryName}%`,
      };
    }

    const categories = await ProductCategory.findAll({
      offset,
      limit: pageSize || undefined,
    //   order: [
    //       sortField,
    //       sortOrder,
    //   ],
      where: whereCondition,
    });
    

    const totalCategories = await ProductCategory.count({
      where: whereCondition,
    });

    const totalPages = Math.ceil(totalCategories / (pageSize || totalCategories));

    return {
      categories,
      totalPages,
    };
  } catch (err) {
    console.error('Error in getPaginatedAndFilteredProductsQuery:', err);
    throw err;
  }
};

const getCategoryQuery = async (categoryName) => {
    try {
        const result = await ProductCategory.findAll({
            where: {
                category: categoryName,
            }
        })

        return result;
    } catch (err) {
        throw err;
    }
}

const getCategoryForProductQuery = async (categoryId) => {
    try {
        const result = await ProductCategory_has_Product.findAll({
            where: {
                productCategory_idproductCategory: categoryId,
            }
        })

        return result;
    } catch (err) {
        throw err;
    }
}

const addCategoryQuery = async (category) => {
    try {
        const res = await ProductCategory.create({ category });
        return res;
    } catch (err) {
        throw err;
    }
};

const editCategoryQuery = async (category_id, categoryNew) => {
    try {
        const updatedCategory = await ProductCategory.update(
            { category: categoryNew },
            {
                where: {
                    id: category_id,
                },
            }
        );
        return updatedCategory;
    } catch (err) {
        throw err;
    }
};

const deleteCategoryQuery = async (category_id) => {
    try {
        const deletedCategory = await ProductCategory.destroy({
            where: {
                id: category_id,
            },
        });
        return deletedCategory;
    } catch (err) {
        throw err;
    }
};

const addCategoryForProductQuery = async (category_id, product_id) => {
    try {
        console.log("ini di query", category_id);

        const res = await ProductCategory_has_Product.create({
            productCategory_idproductCategory : category_id,
            product_idproduct : product_id
        });

        return res;
    } catch (err) {
        throw err;
    }
};

const deleteCategoryForProductQuery = async (product_id, category_id) => {
    try {
        await ProductCategory_has_Product.destroy({
            where: {
                productCategory_idproductCategory : category_id,
                product_idproduct : product_id
            },
        });
    } catch (err) {
        throw err;
    }
};

module.exports = {
  getPaginatedAndFilteredCategoryQuery,
  addCategoryQuery,
  editCategoryQuery,
  deleteCategoryQuery,
  getCategoryQuery,
  addCategoryForProductQuery,
  deleteCategoryForProductQuery,
  getCategoryForProductQuery,
};
