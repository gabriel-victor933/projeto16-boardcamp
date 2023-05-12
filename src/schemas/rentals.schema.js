import Joi from "joi";

const rentalSchemas = Joi.object({
    customerId: Joi.number().integer().min(1).required(),
    gameId: Joi.number().integer().min(1).required(),
    daysRented: Joi.number().integer().min(1).required()
})


export default rentalSchemas