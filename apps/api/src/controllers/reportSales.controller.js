const { createSalesReportService, getProductsByTransactionService, getSalesByDateService } = require('../services/reportSales.service');

const getSalesByDateController = async (req, res) => {
  try {
    const { startDate, endDate, storeId, categoryId, productId } = req.query;

    const salesByDate = await getSalesByDateService(String(startDate), String(endDate), storeId, categoryId, productId);

    return res.status(200).json(salesByDate);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProductsByTransactionController = async (req, res) => {
  try {
    const { transactionId } = req.params;
    console.log(transactionId);

    const productsByTransaction = await getProductsByTransactionService(Number(transactionId));

    return res.status(200).json(productsByTransaction);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createSalesReportController = async (req, res) => {
  try {
    const startDate = req.query.startDate || null;
    const endDate = req.query.endDate || null;
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || null;
    const sortOrder = req.query.sortOrder || 'asc';
    const categoryId = req.query.categoryId || null;
    const productId = req.query.productId || null;
    const storeId = req.query.storeId || null;



    const salesReport = await createSalesReportService(String(startDate), String(endDate), page, pageSize, sortOrder, categoryId, productId, storeId);

    return res.status(200).json(salesReport);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getSalesByDateController,
  getProductsByTransactionController,
  createSalesReportController,
};
