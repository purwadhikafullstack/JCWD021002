const {
    getPaginatedAndFilteredProductsService,
    getDetailProductService,
    addProductService,
    softDeleteProductService,
    updateProductService,
} = require("../services/product.service")


const getPaginatedAndFilteredProductsController = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = parseInt(req.query.pageSize) || null;
    const sortField = req.query.sortField || 'name';
    const sortOrder = req.query.sortOrder || 'asc';
    const categoryId = req.query.categoryId || null;
    const productName = req.query.productName || null;
    const cityId = req.query.cityId || null;

    const result = await getPaginatedAndFilteredProductsService(
      page,
      pageSize,
      sortField,
      sortOrder,
      categoryId,
      productName,
      cityId
    );

    console.log("controller", page, pageSize, sortField, sortOrder, categoryId, productName, cityId);

    console.log("controller result:", result);
    return res.status(200).json(result);
  } catch (err) {
    console.error('Error in getPaginatedAndFilteredProductsController:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getDetailProductController = async (req, res) => {
  try {
    const id = req.params;

    const result = await getDetailProductService(id)

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}  

  const addProductController = async (req, res) => {
    try {
        const {name, price, description, createdBy, category, massProduct, massId, packagingId} = req.body;
        const fileNames = req.files.map(file => file.filename);
    console.log("ini di controller", name, price, description, createdBy);

        const serviceResponse = await addProductService(name, price, description, createdBy, category, fileNames, massProduct, massId, packagingId)

        res.status(201).json({ message: 'Product added successfully', data: serviceResponse });
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "internal server error"})
    }
  }

  const updateProductController = async (req, res) => {
    try {
        const {id, name, description, price, status, category, massProduct, massId, packagingId} = req.body;
        const fileNames = req.files.map(file => file.filename);
        await updateProductService(id, name, description, price, status, category, fileNames, massProduct, massId, packagingId)
        res.status(201).json({message: 'Product updated successfully'})
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "internal server error"})
    }
}

  const softDeleteProductController = async (req, res) => {
    try {
      const id = req.params;

       await softDeleteProductService(id);

      res.status(201).json({message: 'Product deactivated successfully'})
    } catch (err) {
      res.status(500).json({error: "internal server error"})
    }
  } 

  module.exports = {
      getPaginatedAndFilteredProductsController,
      getDetailProductController,
      addProductController,
      softDeleteProductController,
      updateProductController,
  }