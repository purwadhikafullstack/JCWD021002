const {
    getPaginatedAndFilteredCategoryService,
    addCategoryService,
    editCategoryService,
    deleteCategoryService,
    deleteCategoryForProductService,
} = require("../services/category.service")


const getPaginatedAndFilteredCategoryController = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || null;
    const sortField = req.query.sortField || 'category';
    const sortOrder = req.query.sortOrder || 'asc';
    const categoryName = req.query.categoryName || null;

    const result = await getPaginatedAndFilteredCategoryService(
      page,
      pageSize,
      sortField,
      sortOrder,
      categoryName,
    );


    return res.status(200).json(result);
  } catch (err) {
    console.error('Error in getPaginatedAndFilteredProductsController:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const addCategoryController = async (req, res) => {
    try {
      const { category } = req.body;
  
      const result = await addCategoryService(category, req.file?.filename,);
  
      res.status(201).json({result})
    } catch (err) {
      res.status(500).json({error: "internal server error"})
    }
  }
  
  const editCategoryController = async (req, res) => {
    try {
      const { category_id, category } = req.body;
  
      console.log("ini di controller", category_id, category, req.file?.filename);

      const result = await editCategoryService(category_id, category, req.file?.filename,);

  
      res.status(201).json({result})
    } catch (err) {
      console.log(err);

      res.status(500).json({error: "internal server error"})
    }
  }

  const deleteCategoryController = async (req, res) => {
    try {
      const {category_id} = req.params;
  
      const serviceResponse = await deleteCategoryService(category_id)
  
      res.status(201).json({message: 'Category deleted successfully'})
    } catch (err) {
      res.status(500).json({error: "internal server error"})
    }
  }

  const deleteCategoryForProductController = async (req, res) => {
    try {
      const { categoryId, productId } = req.body;

      await deleteCategoryForProductService(categoryId, productId);
      res.status(201).json({message: 'Category deleted successfully'})
    } catch (err) {
      res.status(500).json({error: "internal server error"})
    }
  }

  module.exports = {
      getPaginatedAndFilteredCategoryController,
      addCategoryController,
      editCategoryController,
      deleteCategoryController,
      deleteCategoryForProductController,
  }