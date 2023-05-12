import { Router } from "express";
import validateClient from "../middlewares/client.middleware.js";
import { getclients, postClient, getclient, putClient } from "../controllers/client.controler.js";

const route = Router()

route.post("/customers",validateClient, postClient )

route.get("/customers",getclients)

route.get("/customers/:id",getclient)

route.put("/customers/:id",validateClient,putClient)

export default route