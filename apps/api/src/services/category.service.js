const {
    getPaginatedAndFilteredCategoryQuery,
    addCategoryQuery,
    editCategoryQuery,
    deleteCategoryQuery,
    getCategoryQuery,
    deleteCategoryForProductQuery,
    getCAtegoryForProductQuery,
} = require("../queries/category.query")

const getPaginatedAndFilteredCategoryService = async (page, pageSize, sortField, sortOrder, categoryName) => {
    try {
      const result = await getPaginatedAndFilteredCategoryQuery(page, pageSize, sortField, sortOrder, categoryName);
  
      console.log("service result:", result);
  
      return result;
    } catch (err) {
      console.error('Error in getPaginatedAndFilteredProductsService:', err);
      throw new Error('Error in ProductService: ' + err.message);
    }
  };

  
  const addCategoryService = async (category) => {
    try {
        const check = await getCategoryQuery(category);
        if (check.length > 0) {
            return ('Category name already added')
        }
      const res = await addCategoryQuery(category)
      return res;
    } catch (err) {
      throw err;
    }
  }

  const editCategoryService = async (category_id, categoryNew) => {
    try {
      const check = await getCategoryQuery(categoryNew);
        if (check.length > 0) {
            return ('Category name already added')
        }
      const res = await editCategoryQuery(category_id, categoryNew)
      return res;
    } catch (err) {
      throw err;
    }
  }

  const deleteCategoryService = async (category_id) => {
    try {
      const res1 = await getCAtegoryForProductQuery(category_id)
      if(res1.length > 1) {
        return "The Category Used in Another Product"
      }
        const res = await deleteCategoryQuery(category_id)
  
        return res;
    } catch (err) {
      throw err;
    }
  }

  const deleteCategoryForProductService = async (categoryId, productId) => {
    try {
      await deleteCategoryForProductQuery(categoryId, productId);
    } catch (err) {
      throw err;
    }
  }


  module.exports = {
      getPaginatedAndFilteredCategoryService,
      addCategoryService,
      editCategoryService,
      deleteCategoryService,
      deleteCategoryForProductService,
  }
  