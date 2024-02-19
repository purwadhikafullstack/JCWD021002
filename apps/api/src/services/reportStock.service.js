const { createStockReportQuery, getStockByDateQuery, } = require('../queries/reportStock.query');

const getStockByDateService = async (startDate, endDate, productId, storeId, sortOrder, page, pageSize) => {
  try {
    const res = await getStockByDateQuery(startDate, endDate, productId, storeId, sortOrder, page, pageSize);
    return res;
  } catch (err) {
    throw new Error('Error in ReportService: ' + err.message);
  }
};

const createStockReportService = async (startDate, endDate, page, pageSize, sortOrder, productId, storeId) => {
    try {
      const res = await createStockReportQuery(startDate, endDate, page, pageSize, sortOrder, productId, storeId);
      return res;
    } catch (err) {
      throw new Error('Error in ReportService: ' + err.message);
    }
  };

  module.exports = {
      createStockReportService,
      getStockByDateService,
  }