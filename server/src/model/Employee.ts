import mongoose from "mongoose";


interface IEmployee extends mongoose.Document {
    name: string;
    age: number;
}

interface EmployeeModel extends mongoose.Model<IEmployee>{}

const EmployeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    age:{
        type:Number,
        required: true
    }
});

export const Employee = mongoose.model<IEmployee,EmployeeModel>('Employee', EmployeeSchema);