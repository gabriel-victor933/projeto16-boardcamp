import { Router } from "express";
import validateRental from "../middlewares/rentals.middleware.js"
import {getRental, postRental, returnRental,deleteRental} from "../controllers/rentals.controlers.js"
const route = Router()

route.post("/rentals",validateRental,postRental)
route.post("/rentals/:id/return",returnRental)
route.get("/rentals",getRental)
route.delete("/rentals/:id",deleteRental)

export default route