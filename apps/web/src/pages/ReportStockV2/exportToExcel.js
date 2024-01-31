import ExcelJS from 'exceljs';

export   const exportToExcel = async (data, startDate, endDate) => {
    const exportData = data?.data || [];

    // Create a workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('StockReport');

    // Map the data to match the table structure
    const formattedData = exportData.map((item) => ({
      'Store Name': item.Store?.name,
      'Location': `${item.Store?.City?.city}, ${item.Store?.City?.Province?.province}`,
      'Transaction Date': new Date(item.transactionDate).toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Asia/Jakarta',
      }),
      'ProductName': item.ProductStock.Product.name,
      'Transaction': item.add ? 'Additions' : 'Subtractions',
      'Quantity': item.quantity,
      'Before Stock': item.beforeStock,
      'After Stock': item.afterStock,
      'Admin': item.User?.username,
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