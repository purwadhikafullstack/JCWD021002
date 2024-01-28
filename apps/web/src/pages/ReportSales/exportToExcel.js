import ExcelJS from 'exceljs';

export const exportToExcel = async (data, startDate, endDate) => {
  const exportData = data?.data || [];

  // Create a workbook
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('SalesReport');

  // Map the data to match the table structure
  const formattedData = exportData.map((orderDetail) => ({
    'Code Transaction': orderDetail.Order?.codeTransaction,
    'Quantity': orderDetail.quantity,
    'Subtotal': orderDetail.subtotal,
    'Product Name': orderDetail.ProductStock?.Product?.name,
    'Order Date': new Date(orderDetail.Order?.orderDate).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'Asia/Jakarta',
    }),
    'Status': orderDetail.Order?.status,
  }));

  // Add columns to the worksheet
  const columns = Object.keys(formattedData[0]);
  worksheet.columns = columns.map((col) => ({ header: col, key: col, width: 15 }));

  // Add data to the worksheet
  formattedData.forEach((row) => {
    worksheet.addRow(row);
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
