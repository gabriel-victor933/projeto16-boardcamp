import { Router } from "express";
import validateGame from "../middlewares/games.middleware.js";
import { postGame,getGame } from "../controllers/games.controler.js";

const route = Router()

route.post("/games",validateGame, postGame)
route.get("/games", getGame)

export default route