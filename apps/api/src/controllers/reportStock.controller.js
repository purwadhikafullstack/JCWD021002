const { createStockReportService, getStockByDateService, } = require('../services/reportStock.service');

const getStockByDateController = async (req, res) => {
  try {
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || null;
    const sortOrder = req.query.sortOrder || 'asc';
    const productId = req.query.productId || null;
    const storeId = req.query.storeId || null;



    const stockReport = await getStockByDateService(String(startDate), String(endDate), productId, storeId, sortOrder, page, pageSize);

    return res.status(200).json(stockReport);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createStockReportController = async (req, res) => {
    try {
      const startDate = req.query.startDate || null;
      const endDate = req.query.endDate || null;
      const page = req.query.page || 1;
      const pageSize = req.query.pageSize || null;
      const sortOrder = req.query.sortOrder || 'asc';
      const productId = req.query.productId || null;
      const storeId = req.query.storeId || null;
  
  
  
      const stockReport = await createStockReportService(String(startDate), String(endDate), page, pageSize, sortOrder, productId, storeId);
  
      return res.status(200).json(stockReport);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports = {
      createStockReportController,
      getStockByDateController,
  }