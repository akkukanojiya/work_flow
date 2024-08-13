import React from 'react';
import * as XLSX from 'xlsx';

const ExcelExport: React.FC = () => {
  const generateExcel = () => {
    // Sample data to be written into the Excel file
    const data = [
      { name: 'John Doe', age: 28, email: 'john.doe@example.com' },
      { name: 'Jane Smith', age: 34, email: 'jane.smith@example.com' },
      { name: 'Sam Johnson', age: 23, email: 'sam.johnson@example.com' },
    ];

    // Create a worksheet from the sample data
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Generate an Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // Create a Blob object from the Excel buffer
    const blob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    // Create a download link and click it programmatically
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'example.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={generateExcel}>Download Excel File</button>
    </div>
  );
};

export default ExcelExport;
