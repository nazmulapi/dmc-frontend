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

export const exportToPDF = (headers, rows, reportTitle, fileName) => {
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

    const imagePath = "./logo.png";
    const imageType = "PNG";
    const text = "Dhaka Medical College Hospital";
    const imageWidth = 20;
    const imageHeight = 20;

    const docWidth = doc.internal.pageSize.getWidth();

    const imageXPos = (docWidth - imageWidth) / 2;
    const imageYPos = 10;

    // Add logo centered at the top
    doc.addImage(
      imagePath,
      imageType,
      imageXPos,
      imageYPos,
      imageWidth,
      imageHeight
    );

    doc.setTextColor(107, 107, 107);

    const fontSizeText = 14;
    doc.setFontSize(fontSizeText);

    const textWidth =
      (doc.getStringUnitWidth(text) * fontSizeText) / doc.internal.scaleFactor;
    const textXPos = (docWidth - textWidth) / 2;

    const fontSizeTitle = 12;
    const reportTitleWidth =
      (doc.getStringUnitWidth(reportTitle) * fontSizeTitle) /
      doc.internal.scaleFactor;
    const reportTitleXPos = (docWidth - reportTitleWidth) / 2;

    doc.text(text, textXPos, imageYPos + imageHeight + 8);

    doc.setFontSize(fontSizeTitle);
    doc.text(reportTitle, reportTitleXPos, imageYPos + imageHeight + 15);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      startY: imageYPos + imageHeight + 22,
      willDrawCell: (data) => {
        const cellValue = data.cell.raw; // Get the raw value of the cell

        if (
          typeof cellValue === "string" &&
          cellValue.startsWith("is_text_danger_")
        ) {
          doc.setTextColor(210, 43, 43);
          data.cell.text = cellValue.substring("is_text_danger_".length);
        }
      },
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
