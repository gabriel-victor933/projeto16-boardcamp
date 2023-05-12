import Joi from "joi"


const gameSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().pattern(/^http:\/\//).required(),
    stockTotal: Joi.number().integer().min(1).required(),
    pricePerDay: Joi.number().greater(0).required()

})

export default gameSchema