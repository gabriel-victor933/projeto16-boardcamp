import {db} from "../dbs/connectDb.js"
import dayjs from "dayjs"

export async function postRental(req,res){

    try{   
        
        const game = await db.query(`SELECT * FROM games WHERE id=$1;`,[req.body.gameId])
        if(game.rowCount === 0 ) return res.status("400").send("game doesnt exist")
      
        const client = await db.query(`SELECT * FROM customers WHERE id=$1;`,[req.body.customerId])
        if(client.rowCount === 0 ) return res.status("400").send("client doesnt exist")

         

        const rentDate = dayjs().format("YYYY-MM-DD")
        const originalPrice = req.body.daysRented*game.rows[0].pricePerDay

        const gameRentals = await db.query(`SELECT * FROM rentals 
                                            WHERE "gameId"=$1 AND "returnDate" IS NULL;`,[req.body.gameId])

        
        if(gameRentals.rowCount >= game.rows[0].stockTotal) return res.status(400).send("game unavailable") 

        await db.query(`INSERT INTO rentals ("customerId", "gameId","rentDate", "daysRented", "originalPrice")
        VALUES ($1,$2,$3,$4,$5)`,[req.body.customerId, req.body.gameId, rentDate,req.body.daysRented,originalPrice])  

        res.sendStatus(201)

    } catch(err){
        return res.status(500).send(err)
    }
}