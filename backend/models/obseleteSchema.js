import mongoose from "mongoose";
import { type } from "os";
const obseleteSchema = new mongoose.Schema({
    name:String,
    email:String,
},{collection:'obselete'})
export const obselete = mongoose.model('obselete', obseleteSchema)