const {
    getPaginatedAndFilteredProductsService,
    getPaginatedAndFilteredProductsRealService,
    getDetailProductService,
    addProductService,
    softDeleteProductService,
    updateProductService,
    getDetailProductRealService,
    deleteProductImageService,
} = require("../services/product.service")

const path = require("path");
const fs = require('fs').promises;



const getPaginatedAndFilteredProductsController = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = parseInt(req.query.pageSize) || null;
    const sortField = req.query.sortField || 'name';
    const sortOrder = req.query.sortOrder || 'asc';
    const categoryId = req.query.categoryId || null;
    const productName = req.query.productName || null;
    const cityId = req.query.cityId || null;
    const storeId = req.query.storeId || null;
    const statusProduct = req.query.statusProduct || null;
    const statusStock = req.query.statusStock || null;

    const result = await getPaginatedAndFilteredProductsService(
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

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPaginatedAndFilteredProductsRealController = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = parseInt(req.query.pageSize) || null;
    const sortField = req.query.sortField || 'name';
    const sortOrder = req.query.sortOrder || 'asc';
    const categoryId = req.query.categoryId || null;
    const productName = req.query.productName || null;
    const status = req.query.status || null;

    const result = await getPaginatedAndFilteredProductsRealService(
      page,
      pageSize,
      sortField,
      sortOrder,
      categoryId,
      productName,
      status,
    );


    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getDetailProductRealController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getDetailProductRealService(id)

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}  

const getDetailProductController = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await getDetailProductService(id)

    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}  

  const addProductController = async (req, res) => {
    try {
        const {name, price, description, category, massProduct, massId, packagingId} = req.body;
        const fileNames = req.files.map(file => file.filename);
        const { id } = req.user;

        const serviceResponse = await addProductService(name, price, description, id, category, fileNames, massProduct, massId, packagingId)

        res.status(201).json({ message: 'Product added successfully', data: serviceResponse });
    } catch (err) {
        res.status(500).json({error: "internal server error"})
    }
  }

  const updateProductController = async (req, res) => {
    try {
        const {id, name, description, price, status, category, massProduct, massId, packagingId} = req.body;
        const fileNames = req?.files?.map(file => file.filename);
        await updateProductService(id, name, description, price, status, category, fileNames, massProduct, massId, packagingId)
        res.status(201).json({message: 'Product updated successfully'})
    } catch (err) {
        res.status(500).json({error: "internal server error"})
    }
}

  const softDeleteProductController = async (req, res) => {
    try {
      const id = req.params;

       await softDeleteProductService(id);

      res.status(200).json({message: 'Product deactivated successfully'})
    } catch (err) {
      res.status(500).json({error: "internal server error"})
    }
  } 

  const deleteProductImageController = async (req, res) => {
    try {
      const { imageUrl, productId } = req.body;

       await deleteProductImageService(imageUrl, productId);
       const filePath = path.join(__dirname, "../public/images/products", imageUrl);
       await fs.unlink(filePath);

      res.status(200).json({message: 'Image deleted successfully'})
    } catch (err) {
      res.status(500).json({error: "internal server error"})
    }
  } 

  module.exports = {
      getPaginatedAndFilteredProductsController,
      getPaginatedAndFilteredProductsRealController,
      getDetailProductRealController,
      getDetailProductController,
      addProductController,
      softDeleteProductController,
      updateProductController,
      getDetailProductRealController,
      deleteProductImageController,
  }