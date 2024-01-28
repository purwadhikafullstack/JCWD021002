import ExcelJS from 'exceljs';

export const exportToExcel = async (data) => {
    const exportData = data?.data || [];
  
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('StockReport');
  
    // Map the data to match the new table structure
    const formattedData = exportData.map((item) => ({
      'Store Name': item.storeName,
      'Location': `${item.city}, ${item.province}`,
      'ProductName': item.productName,
      'Total Additions': item.totalAdditions,
      'Total Subtractions': item.totalSubtractions,
      'Final Stock': item.finalStock,
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
    link.download = `StockReport(${startDate} - ${endDate}).xlsx`;
    link.click();
  };
  