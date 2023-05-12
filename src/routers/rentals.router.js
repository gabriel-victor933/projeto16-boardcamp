import { Router } from "express";
import validateRental from "../middlewares/rentals.middleware.js"
import {getRental, postRental} from "../controllers/rentals.controlers.js"
const route = Router()

route.post("/rentals",validateRental,postRental)
route.get("/rentals",getRental)

export default route