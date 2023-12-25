import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { mkConfig, generateCsv, download } from "export-to-csv";
import * as XLSX from "xlsx";
// import * as FileSaver from "file-saver";

// const handleExportPDF = () => {
//   // const columns = [];
//   const doc = new jsPDF();
//   const tableData = employeeData.map((row) => Object.values(row.original));
//   // const tableHeaders = columns.map((c) => c.header);
//   const tableHeaders = [
//     "SL",
//     "Employee ID",
//     "Employee Name",
//     "In Time",
//     "Out Time",
//     "Date",
//   ];

//   // autoTable(doc, { html: "#my-table" });

//   autoTable(doc, {
//     head: [tableHeaders],
//     body: tableData,
//   });

//   doc.save("mrt-pdf-example.pdf");
// };

export const exportToPDF = (rows) => {
  // Check if employeeData is not null or undefined
  if (rows) {
    // Extracting headers from the first row of the employeeData
    const tableHeaders = Object.keys(rows[0] || {});

    // Extracting data from employeeData
    const tableData = rows.map((row) =>
      tableHeaders.map((header) => row[header])
    );

    // Create PDF and export
    const doc = new jsPDF();
    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });
    doc.save("mrt-pdf-example.pdf");
  } else {
    console.error("Employee data is null or undefined");
  }
};

// export const exportToCSV = (apiData, fileName) => {
//   const fileType =
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//   const fileExtension = ".xlsx";

//   const exportToCSV = (apiData, fileName) => {
//     const ws = XLSX.utils.json_to_sheet(apiData);
//     const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     const data = new Blob([excelBuffer], { type: fileType });
//     FileSaver.saveAs(data, fileName + fileExtension);
//   };

//   return (
//     <button
//       className="btn btn btn-primary ms-2"
//       onClick={(e) => exportToCSV(apiData, fileName)}
//     >
//       <i className="bi bi-filetype-xls pe-1"></i>Excel
//     </button>
//   );
// };

const data = [
  { name: "John", age: 30, city: "New York" },
  { name: "Alice", age: 25, city: "San Francisco" },
  // ... other data
];

export const exportToExcel = () => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "example.xlsx");
};

export const exportToCSV = () => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "example.xlsx");
};
