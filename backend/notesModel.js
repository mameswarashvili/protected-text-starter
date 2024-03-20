import mongoose from "mongoose";

const PageSchema = new mongoose.Schema({
    title: String,
    password:String,
    text:String,
});
export const Note = mongoose.model("Note",PageSchema)