const express = require("express");
const multer = require("multer");
//var request = require("request");
const path = require("path");
//const axios =  require('axios');
const fs = require("fs");
const cors = require("cors");
const bodyparser = require("body-parser");

//const db = require("./db")
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const conv = require("./conv");
const kagaz = require("./kagaz");
//const userRouter = require('./router');

var fname;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "public");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const newFileName = "v7" + Date.now();
    fname = newFileName;
    //console.log(fname)
    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });

const corsOptions = {
  origin: "*", // Replace with your app's domain
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(bodyparser.json());

app.use(express.static("public"));

app.post("/go", async (req, res) => {
  const { fname } = req.body; // Get fname from the request body
  console.log("Received fname:", fname);

  const filePath = path.join(__dirname, "public/" + fname + ".json"); // Adjust the file path as needed

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      // Now you have an array of objects containing your JSON data

      // Iterate through the array of objects
      jsonData.forEach((row, index) => {
        //console.log(`Row ${index + 1}:`);
        //console.log(`Column1: ${row.Column1}`);
        //console.log(row.Column2, row.Column3, row.Column4);
        kagaz.consent(row.Column2, row.Column3, row.Column4);
        // Convert the updated data back to JSON
        
        //console.log('------------------');
      });
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });

  res.status(200).json({ success: true, message: "Processing data" });
});

app.post("/upload-excel", upload.single("excelFile"), async (req, res) => {
  if (!req.file) {
    // Handle the case where no file was uploaded
    return res.status(400).send("No file uploaded");
  }

  //console.log(fileBuffer);

  conv.convert(fname);

  //await kagaz.kagazw("ni hua")

  return res
    .status(200)
    .json({ success: true, data: fname, message: "File Uploaded" });
});

//app.use('/users',userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
