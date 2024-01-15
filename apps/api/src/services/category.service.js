const {
    getPaginatedAndFilteredCategoryQuery,
    addCategoryQuery,
    editCategoryQuery,
    deleteCategoryQuery,
    getCategoryQuery,
    deleteCategoryForProductQuery,
    getCategoryForProductQuery,
} = require("../queries/category.query")

const getPaginatedAndFilteredCategoryService = async (page, pageSize, sortField, sortOrder, categoryName) => {
    try {
      const result = await getPaginatedAndFilteredCategoryQuery(page, pageSize, sortField, sortOrder, categoryName);
  
      return result;
    } catch (err) {
      console.error('Error in getPaginatedAndFilteredProductsService:', err);
      throw new Error('Error in ProductService: ' + err.message);
    }
  };

  
  const addCategoryService = async (category, imageUrl) => {
    try {

      if (!category || !category.trim()) {
        return 'Category name cannot be empty or contain only spaces';
    }

        const check = await getCategoryQuery(category);
        if (check.length > 0) {
            return ('Category name already added')
        }
      const res = await addCategoryQuery(category, imageUrl)
      return res;
    } catch (err) {
      throw err;
    }
  }

  const editCategoryService = async (category_id, categoryNew, imageUrl) => {
    try {
      const check = await getCategoryQuery(categoryNew);
        if (check[0].category == categoryNew) {
            return ('Category name already added')
        }

        console.log("ini di service", category_id, categoryNew, imageUrl);
      const res = await editCategoryQuery(category_id, categoryNew, imageUrl)
      return res;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  const deleteCategoryService = async (category_id) => {
    try {
      const res1 = await getCategoryForProductQuery(category_id)
      console.log("ini res1",res1);
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
  