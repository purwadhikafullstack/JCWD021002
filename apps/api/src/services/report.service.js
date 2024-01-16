const { getSalesByDateQuery, getProductsByTransactionQuery, createSalesReportQuery } = require('../queries/report.query');

const getSalesByDateService = async (startDate, endDate, storeId, categoryId, productId) => {
  try {
    const res = await getSalesByDateQuery(startDate, endDate, storeId, categoryId, productId);
    return res;
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

const createSalesReportService = async (startDate, endDate) => {
  try {
    const res = await createSalesReportQuery(startDate, endDate);
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
