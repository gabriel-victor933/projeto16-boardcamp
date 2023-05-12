import clientSchema from "../schemas/client.schema.js";
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import dayjs from 'dayjs';
dayjs.extend(customParseFormat);

export default function validateClient(req,res,next){

    const {error} = clientSchema.validate(req.body,{abortEarly: false})

    if(error){
        const message = error.details.map((d)=> d.message)
        res.status(400).send(message)
    } else{

        if(!dayjs(req.body.birthday, 'YYYY-MM-DD', true).isValid()){
            return res.status(400).send("invalid date!")
        } else {
            next()
        }

        
    }

    
}