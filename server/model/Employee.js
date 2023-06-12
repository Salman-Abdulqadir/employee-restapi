const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        required: true
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema)
