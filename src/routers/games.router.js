import { Router } from "express";
import validateGame from "../middlewares/games.middleware.js";
import { postGame } from "../controllers/games.controler.js";

const route = Router()

route.post("/games",validateGame, postGame)
export default route