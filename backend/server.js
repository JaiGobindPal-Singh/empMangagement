import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Admin } from './models/AdminSchema.js';
import { Employees } from './models/EmployeesSchema.js';
import { Id } from './models/Id.js';
import { obselete } from './models/obseleteSchema.js';
import path from 'path';

//connect to the database
const connectDB = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/employeeManagement');
}
connectDB();
const app = express();
const port = 9000;
const _dirname = path.resolve();

app.use(cors());
app.use(express.json()); // Add this line to parse JSON bodies

//return the id to be alloted to new employee
app.get('/Id', async (req, res) => {
    let id = await Id.find();
    if (id.length === 0) {
        await Id.insertMany([{ id: 0 }]);
    }
    id = await Id.find();
    await Id.updateOne({ id: id[0].id }, { $set: { id: id[0].id + 1 } });
    res.send(JSON.stringify(id[0].id + 1));
});

//return the admin and employees data
app.post('/login', async (req, res) => {
    const adminData = await Admin.find();
    const employeesData = await Employees.find();
    res.send({ adminData, employeesData });
});

//modify the employees data(addition or deletion and adding new tasks) 
app.post('/modifyEmployees', async (req, res) => {
    const employees = req.body;
    try {
        await Employees.deleteMany();
        await Employees.insertMany(employees);
        res.send(JSON.stringify('done'));
    } catch (error) {
        if(error.code == 11000) {
            res.send(JSON.stringify('duplicate email'));
        }
        else {
            res.send(JSON.stringify('unknown error'));
        }
    }
});

//make the employee obsolete
app.post('/makeObsolete', async (req, res) => {
    const data = req.body;
    await obselete.insertMany([data]);
    res.send(JSON.stringify('done'));
});

//return the obsolete employees
app.post('/showObsolete', async (req, res) => {
    const data = await obselete.find();
    res.send(JSON.stringify(data));
});

//make the frontend public so that available to all
app.use(express.static(path.join(_dirname, '/frontend/dist'))) 
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,'frontend','dist','index.html'))
})
//start the server
app.listen(port, () => {
    console.log('server started');
});
