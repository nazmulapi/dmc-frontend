import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { mkConfig, generateCsv, download } from "export-to-csv";
import * as XLSX from "xlsx";

const capitalizeFirstLetter = (text) => {
  if (typeof text !== "string" || text.length === 0) {
    return text;
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const exportToPDF = (headers, rows, fileName) => {
  // Check if employeeData is not null or undefined

  if (rows) {
    // Extracting headers from the first row of the employeeData
    // const tableHeaders = Object.keys(rows[0] || {}).map((key) =>
    //   capitalizeFirstLetter(key)
    // );
    const tableHeaders = headers.map((key) => capitalizeFirstLetter(key));

    // console.log(tableHeaders);
    // return;

    // Extracting data from employeeData
    // const tableData = rows.map((row) =>
    //   tableHeaders.map((header) => row[header])
    // );

    const tableData = rows.map((row) =>
      Object.keys(row).map((item) => row[item])
    );

    // console.log(tableHeaders, tableData);
    // return;
    // Create PDF and export
    const doc = new jsPDF();
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });
    doc.save(fileName + ".pdf");
  } else {
    console.error("Employee data is null or undefined");
  }
};

export const exportToCSV = (rows, fileName) => {
  const csvConfig = mkConfig({
    filename: fileName,
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const rowData = rows.map((row) => row);
  const csv = generateCsv(csvConfig)(rowData);
  download(csvConfig)(csv);
};

export const exportToExcel = (rows, fileName) => {
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, fileName + ".xlsx");
};
