import ExcelJS from 'exceljs';

export const exportToExcel = async (data, startDate, endDate) => {
  const exportData = data?.data || [];
  console.log(data);
  // Group order details by order ID
  const groupedData = {};
  exportData.forEach((orderDetail) => {
    const orderId = orderDetail.order_idorder;
    if (!groupedData[orderId]) {
      groupedData[orderId] = [];
    }
    groupedData[orderId].push(orderDetail);
  });

  // Create a workbook
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('SalesReport');

  // Add columns to the worksheet
  const columns = ['Order Id', 'Status', 'Total Amount', 'Total Discount', 'Total Shipping', 'Total Shipping Discount', 'Code Transaction', 'Payment Method', 'Payment Status', 'Username Buyer', 'Store Name', 'Order Detail Id', 'Quantity', 'Subtotal', 'Product Name', 'Order Date'];
  worksheet.columns = columns.map((col) => ({ header: col, key: col, width: 15 }));

  // Add data to the worksheet
  Object.keys(groupedData).forEach((orderId) => {
    const orderDetails = groupedData[orderId];
    orderDetails.forEach((orderDetail, index) => {
      const order = orderDetail.Order;
      const productStock = orderDetail.ProductStock;
      const rowData = {
        'Order Id': index === 0 ? order.id : '',
        'Status': index === 0 ? order.status : '', 
        'Total Amount': index === 0 ? order.totalAmount : '', 
        'Total Discount': index === 0 ? order.totalDiscount : '', 
        'Total Shipping': index === 0 ? order.totalShipping : '', 
        'Total Shipping Discount': index === 0 ? order.totalShippingDiscount : '', 
        'Payment Code': index === 0 ? order.paymentCode : '', 
        'Payment Method': index === 0 ? order.paymentMethod : '', 
        'Payment Status': index === 0 ? order?.paymentStatus : '', 
        'Username Buyer': index === 0 ? order?.User?.username : '', 
        'Store Name': index === 0 ? order?.Store?.name : '', 
        'Order Detail Id': orderDetail.id,
        'Quantity': orderDetail.quantity,
        'Subtotal': orderDetail.subtotal,
        'Product Name': productStock?.Product?.name,
        'Order Date': new Date(order.orderDate).toLocaleString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZone: 'Asia/Jakarta',
        }),
      };
      
      worksheet.addRow(rowData);
    });
  });

  // Apply styles to cells
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      cell.border = { top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' } };

      // Add thicker borders to column titles (row 1)
      if (rowNumber === 1) {
        cell.font = { bold: true };
        cell.border = { top: { style: 'thick' }, bottom: { style: 'thick' }, left: { style: 'thick' }, right: { style: 'thick' } };
      }
    });
  });

  // Save the workbook to a buffer
  const buffer = await workbook.xlsx.writeBuffer();

  // Save the file
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = `SalesReport(${startDate} - ${endDate}).xlsx`;
  link.click();
};
