import mongoose from 'mongoose'
const taskSchema = new mongoose.Schema({
    title:String,
    description:String,
    status:String,
    priority:String,
    category:String,
    date:String,
})
const EmployeesSchema = new mongoose.Schema({
    id:{type:Number},
    name:String,
    email:{type:String},
    password:String,
    tasks:[taskSchema],
    totalTasks:Number,
    completedTasks:Number,
    failedTasks:Number,
    newTasks:Number,
    activeTasks:Number
},{collection:'Employees'})
export const Employees = mongoose.model('Employees', EmployeesSchema)