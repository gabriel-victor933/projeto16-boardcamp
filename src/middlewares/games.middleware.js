import gameSchema from "../schemas/games.schema.js";


function validateGame(req,res,next){

    const {error} = gameSchema.validate(req.body,{abortEarly:false})

    if(error){
        const message = error.details.map((d) => d.message)
        res.status(400).send(message)
    } else {
        next()
    }
    

}

export default validateGame
