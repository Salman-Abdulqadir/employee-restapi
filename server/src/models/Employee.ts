import mongoose from "mongoose";


export interface Employee extends mongoose.Document {
    name: string;
    age: number;
}


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

export const EmployeeModel = mongoose.model<Employee>('Employee', EmployeeSchema);
