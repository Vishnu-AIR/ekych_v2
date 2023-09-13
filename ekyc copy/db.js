const mongoose = require('mongoose');

const dbUrl = process.env.MONGO_URL || "mongodb://localhost:27017/aver";
const dbName = process.env.DB_NAME || "aver";


const connection = mongoose.createConnection(dbUrl+"/"+dbName)
.on('open',()=>{
    console.log("connected to db")
})
.on('error',(error)=>{
    console.log(error);
});

module.exports = connection;