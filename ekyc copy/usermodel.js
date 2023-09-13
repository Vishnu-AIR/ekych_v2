const mongoose = require('mongoose');
const db = require("./db");

const { Schema } = mongoose;

const userSchema = new Schema({
    mobile:{
        type: String,
        require: true,
    },
    gender:{
        type:String,
        
        
    },
    state:{
        type:String,
        
    },
    ageBand:{
        type:String,
        
        
    },
    isIssued: {
        type: String,
        
        
    },
    caseId:{
        type:String,
        
    },
   
    
})






const userModel = db.model('users',userSchema);

module.exports = userModel;