import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import {Note} from "./notesModel.js"
const app = express();

app.use(express.json())
app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true,
    })
);


app.post("/note",async (req,res) => {
    const newNoteObject = req.body;

    const hashedPassword = await bcrypt.hash(newNoteObject.password, 12);
    const {title} = req.body;
    const checkNote = await Note.findOne({title});

    if(checkNote && title === checkNote.title) {
        res.status(403).json({message:"title already used"});
    }else{
        const newNote = new Note({...newNoteObject,password:hashedPassword});
        await newNote.save();
        res.json({
            message:`new note added successfully, title:${newNoteObject.title}`,
        });
    }
});




app.get("/note-status/:title",async (req,res) => {
    const title = req.params.title;

    const note = await Note.findOne({title});

    note ? res.json(true) : res.json(null);

});

app.listen(3000, async () => {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/note");
      console.log("mongodb connection successful");
    } catch (error) {
      console.log(error.message);
    }
  });