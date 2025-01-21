import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    id: Number
}, { collection: 'Admin' });

export const Admin = mongoose.model('Admin', adminSchema);