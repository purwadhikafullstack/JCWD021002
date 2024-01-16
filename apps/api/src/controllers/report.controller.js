const { createSalesReportService, getProductsByTransactionService, getSalesByDateService } = require('../services/report.service');

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
    const { startDate, endDate } = req.query;

    const salesReport = await createSalesReportService(String(startDate), String(endDate));

    return res.status(200).json(salesReport);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getSalesByDateController,
  getProductsByTransactionController,
  createSalesReportController,
};
