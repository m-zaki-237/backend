import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import connectDB from './src/db/db.js';
import authRouter from './src/routes/user.routes.js'
import musicRouter from './src/routes/music.routes.js'
const app = express();
app.use(express.json());
app.use(cookieParser())

const port = process.env.PORT || 8000

app.use("/api/auth", authRouter)
app.use("/api/music", musicRouter)


connectDB();
app.listen(port,()=>{
    console.log(`Server listening to port: ${port}`);
    
})