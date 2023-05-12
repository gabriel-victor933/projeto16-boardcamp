import { Router } from "express";
import validateGame from "../middlewares/games.middleware.js";
import { postGame,getGames } from "../controllers/games.controler.js";

const route = Router()

route.post("/games",validateGame, postGame)
route.get("/games", getGames)

export default route