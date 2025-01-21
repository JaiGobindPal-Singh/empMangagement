import mongoose from "mongoose";
const idSchema = new mongoose.Schema({
  id: Number,
}, { collection: 'Id' });
export const Id = mongoose.model('Id', idSchema);