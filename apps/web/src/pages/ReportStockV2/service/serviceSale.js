import axios from 'axios';

export const fetchReportSales = async ( startDate, endDate, page, pageSize, productId, sortOrder, storeId, setData ) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/report/stock-report?startDate=${startDate}&endDate=${endDate}&page=${page}&pageSize=${pageSize}&productId=${productId}&sortOrder=${sortOrder}&storeId=${storeId}`,
      );

      setData(response?.data);
    } catch (err) {
      console.log(err);
    }
  };