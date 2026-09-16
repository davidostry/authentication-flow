import express from 'express';
import dotenv from "dotenv"
import cors from "cors";
import router from './routes/autoRouter.js'
import {logger} from './middleware/authMiddleware.js'
dotenv.config();

const PORT = Number(process.env.PORT) || 3000
const app = express()

app.use(logger)

app.use(cors())
app.use(express.json())

app.use("/auth", router)

app.listen(PORT, ()=>{
    console.log(`server running on http://localhost:${PORT}` );
    
})