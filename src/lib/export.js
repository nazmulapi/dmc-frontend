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
    const pdf = new jsPDF();

    // const addMargin = (doc, margin) => {
    //   doc.setLineWidth(margin); // Set the margin width
    //   doc.line(
    //     margin,
    //     margin,
    //     doc.internal.pageSize.getWidth() - margin,
    //     margin
    //   ); // Top line
    //   doc.line(
    //     margin,
    //     margin,
    //     margin,
    //     doc.internal.pageSize.getHeight() - margin
    //   ); // Left line
    //   doc.line(
    //     doc.internal.pageSize.getWidth() - margin,
    //     margin,
    //     doc.internal.pageSize.getWidth() - margin,
    //     doc.internal.pageSize.getHeight() - margin
    //   ); // Right line
    //   doc.line(
    //     margin,
    //     doc.internal.pageSize.getHeight() - margin,
    //     doc.internal.pageSize.getWidth() - margin,
    //     doc.internal.pageSize.getHeight() - margin
    //   ); // Bottom line
    // };

    // // Add margin only on the first page
    // addMargin(pdf, 100); // Adjust the margin size as needed

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const logoWidth = 50; // Adjust according to your logo size
    const logoHeight = 49; // Adjust according to your logo size

    const logoX = (pageWidth - logoWidth) / 2;
    const logoY = (pageHeight - logoHeight - 10) / 2; // Adjust -10 to fine-tune vertical positioning

    pdf.addImage("/logo.png", "PNG", logoX, logoY, logoWidth, logoHeight);

    const text = "Dhaka Medical College Hospital";
    const textWidth =
      (pdf.getStringUnitWidth(text) * pdf.internal.getFontSize()) /
      pdf.internal.scaleFactor;
    const textX = (pageWidth - textWidth) / 2;
    const textY = logoY + logoHeight + 10; // Adjust +10 to provide spacing between logo and text

    pdf.text(text, textX, textY);

    autoTable(pdf, {
      head: [tableHeaders],
      body: tableData,
      // columnStyles: {
      //   1: {
      //     fillColor: [41, 128, 185],
      //     minCellWidth: 50,
      //   },
      // },
      margin: { top: 0, left: 13 },
    });

    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.line(10, 283, 200, 283);
      pdf.setPage(i);
      pdf.setFont("Newsreader");
      pdf.text(
        `Page ${i} of ${totalPages}`,
        185,
        pdf.internal.pageSize.getHeight() - 5
      );
    }

    pdf.save(fileName + ".pdf");
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
