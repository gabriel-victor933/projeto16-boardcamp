import  Express  from "express";
import cors from "cors"
import dotenv from "dotenv"
import {db} from "./dbs/connectDb.js"
import gameRouter from "./routers/games.router.js"
import clientRouter from "./routers/client.router.js"

dotenv.config()
const app = Express()

app.use(Express.json())
app.use(cors())
app.use(gameRouter)
app.use(clientRouter)



app.listen(process.env.PORT,()=>console.log("running server"))