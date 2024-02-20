import {
  getStoreListService,
  getStoreService,
  addStoreService,
  changeStoreService,
  deleteStoreService,
  getStoreListsProductService,
} from '../services/store.service';

export const getStoreListController = async (req, res) => {
  try {
    const { name } = req.query
    const result = await getStoreListService(name);

    return res.status(200).json({
      message: 'get store success',
      data: result,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getStoreController = async (req, res) => {
  try {
    // const page = req.query.page || 1;
    // const pageSize = parseInt(req.query.pageSize) || null;
    // const sortField = req.query.sortField || 'name';
    // const sortOrder = req.query.sortOrder || 'asc';
    // const categoryId = req.query.categoryId || null;
    // const productName = req.query.productName || null;
    // const cityId = req.query.cityId || null;
    // const statusProduct = req.query.statusProduct || null;
    // const statusStock = req.query.statusStock || null;
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const { name } = req.query;
    const result = await getStoreService(
      latitude,
      longitude,
      name
    );
    res.status(200).json({
      message: 'get store success',
      data: result,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const addStoreController = async (req, res) => {
  try {
    const { storeName, latitude, longitude, storeAddress } = req.body;
    const { cityId } = req.query;
    const result = await addStoreService(
      storeName,
      latitude,
      longitude,
      storeAddress,
      cityId,
    );
    res.status(200).json({
      message: 'get store success',
      data: result,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export const changeStoreController = async (req, res) => {
  try {
    const { name, latitude, longitude, storeAddress } = req.body;
    const { storeId, cityId } = req.query;
    const result = await changeStoreService(storeId, name, cityId, latitude, longitude, storeAddress);

    res.status(200).json({
      message: 'get store success',
      data: result,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export const deleteStoreController = async (req, res) => {
  try {
    const { storeId } = req.query;
    const result = await deleteStoreService(storeId);

    res.status(200).json({
      message: 'get store success',
      data: result,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};


export const getStoreListsProductController = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const pageSize = parseInt(req.query.pageSize) || null;
    const sortField = req.query.sortField || 'name';
    const sortOrder = req.query.sortOrder || 'asc';
    const categoryId = req.query.categoryId || null;
    const productName = req.query.productName || null;
    const cityId = req.query.cityId || null;
    const statusProduct = req.query.statusProduct || null;
    const statusStock = req.query.statusStock || null;
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const { name } = req.query;
    const result = await getStoreListsProductService(
      page,
      pageSize,
      sortField,
      sortOrder,
      categoryId,
      productName,
      cityId,
      statusProduct,
      statusStock,
      latitude,
      longitude,
      name
    );
    res.status(200).json({
      message: 'get store success',
      data: result,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
