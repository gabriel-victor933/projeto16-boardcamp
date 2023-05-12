import rentalSchemas from "../schemas/rentals.schema.js"

export default function validateRental(req,res,next){

    const {error} = rentalSchemas.validate(req.body,{abortEarly: false})

    if(error){
        const message = error.details.map((d)=> d.message)
        res.status(400).send(message)
    } else {
        next()
    }

    
}