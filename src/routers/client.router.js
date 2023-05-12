import { Router } from "express";
import validateClient from "../middlewares/client.middleware.js";
import { getclients, postClient, getclient } from "../controllers/client.controler.js";

const route = Router()

route.post("/customers",validateClient, postClient )

route.get("/customers",getclients)

route.get("/customers/:id",getclient)


export default route