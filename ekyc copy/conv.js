const exceljs = require("exceljs");
const path = require("path");
const fs = require("fs");


exports.del = (fileName) => {
    const filePath = path.join(__dirname, 'public', fileName);

  try {
    fs.unlink(filePath, (err) => {
        if (err) {
            //console.error('Error deleting the file:', err);
        } else {
            //console.log('File deleted successfully');
        }
    });
    
  } catch (error) {
    //console.log(error);
    
  }
  return;
}


exports.convert = (fileName) => {
  const workbook = new exceljs.Workbook();
  //console.log(fileName);

  const stream = fs.createReadStream("./public/" + fileName);
  workbook.xlsx.read(stream).then((workbook) => {
    // Assuming the data is in the first sheet (you can adjust this as needed)
    const worksheet = workbook.getWorksheet(1);

    // Convert Excel data to JSON
    const jsonData = [];
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      if (rowNumber !== 1) {
        // Skip the header row
        const rowData = {};
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          if(cell.value == null) return;
          rowData[`Column${colNumber}`] = cell.value;
        });
        if(Object.keys(rowData).length == 0) {
          
          return
        };
        
        jsonData.push(rowData);
      }
    });
    //console.log("fileName done");

    // Save JSON data to a file
    const jsonFilePath = path.join(__dirname, "public", fileName+".json");
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));
    //console.log(jsonFilePath);
    this.del(fileName);
    return;
  });
  //del(fileName);

};

