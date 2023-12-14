const {
    getPaginatedAndFilteredProductsService
} = require("../services/product.service")


const getPaginatedAndFilteredProductsController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize);
    const sortField = req.query.sortField || 'name';
    const sortOrder = req.query.sortOrder || 'asc';
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : null;
    const productName = req.query.productName ? String(req.query.productName) : null;

    const result = await getPaginatedAndFilteredProductsService(
      page,
      pageSize,
      sortField,
      sortOrder,
      categoryId,
      productName
    );

    console.log("controller", page, pageSize, sortField, sortOrder, categoryId, productName);

    return res.status(200).json(result);
  } catch (err) {
    console.error('Error in getPaginatedAndFilteredProductsController:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

  module.exports = {
      getPaginatedAndFilteredProductsController,
  }