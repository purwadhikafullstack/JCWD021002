const { getSalesByDateQuery, getProductsByTransactionQuery, createSalesReportQuery, getTop5ProductsSoldQuery, } = require('../queries/reportSales.query');

const getSalesByDateService = async (startDate, endDate, storeId, categoryId, productId) => {
  try {
    const res = await getSalesByDateQuery(startDate, endDate, storeId, categoryId, productId);
    const res1 = await getTop5ProductsSoldQuery(startDate, endDate, storeId, categoryId, productId);

    return [res, res1];
  } catch (err) {
    throw new Error('Error in ReportService: ' + err.message);
  }
};

const getProductsByTransactionService = async (transactionId) => {
  try {
    const res = await getProductsByTransactionQuery(transactionId);
    return res;
  } catch (err) {
    throw new Error('Error in ReportService: ' + err.message);
  }
};

const createSalesReportService = async (startDate, endDate, page, pageSize, sortOrder, categoryId, productId, storeId) => {
  try {
    const res = await createSalesReportQuery(startDate, endDate, page, pageSize, sortOrder, categoryId, productId, storeId);
    return res;
  } catch (err) {
    throw new Error('Error in ReportService: ' + err.message);
  }
};

module.exports = {
  getSalesByDateService,
  getProductsByTransactionService,
  createSalesReportService,
};
