import { Router } from "express";
import validateRental from "../middlewares/rentals.middleware.js"
import {postRental} from "../controllers/rentals.controlers.js"
const route = Router()

route.post("/rentals",validateRental,postRental)

export default route