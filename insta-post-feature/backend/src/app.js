import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors'
import express from 'express'
import multer from 'multer'
import uploadFile from './services/storage.service.js';
import postModel from './models/post.model.js';
const upload = multer({storage: multer.memoryStorage()})
const app = express();
app.use(cors())
app.use(express.json());

app.post('/create-post', upload.single("image"), async (req,res) => {
    console.log(req.body);
    console.log(req.file);

    const result = await uploadFile(req.file.buffer)
    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })
    
})

app.get('/posts', async(req,res)=> {
    const posts = await postModel.find()

    res.status(200).json({
        messsage: "All Posts",
        posts
    })
})

























export default app