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

export async function getRental(req,res){

    const customerId = (parseInt(req.query.customerId) || null)
    const gameId = (parseInt(req.query.gameId) || null)

    try{

        const data = await db.query(`SELECT rentals.*,customers.name AS "customerName", games.name AS "gameName" FROM rentals 
                                        JOIN customers ON rentals."customerId"=customers.id
                                        JOIN games ON rentals."gameId"=games.id
                                        WHERE customers.id = COALESCE($1,customers.id)
                                        AND games.id = COALESCE($2,games.id);`,[customerId,gameId])

        const rentals = data.rows.map((r)=>{
            const customer = {id: r.customerId, name: r.customerName}
            const game = {id: r.gameId, name: r.gameName}

            const rental = {...r, customer, game}

            delete rental.customerName
            delete rental.gameName

            return rental
        })

        res.status(200).send(rentals)

    } catch(err){

        return res.status(500).send(err)
    }
}

export async function returnRental(req,res){

    try{

        const rentals = await db.query(`SELECT * FROM rentals WHERE id=$1`,[req.params.id])
        if(rentals.rowCount === 0 ) return res.status(404).send("rental doesnt exist")

        const rental = rentals.rows[0]
        if(rental.returnDate) return res.status(400).send("rent has already ended")

        const returnDate = dayjs().format("YYYY-MM-DD")
        const dayPast = dayjs().diff(rental.rentDate.toString(),"day")
        

        let delayFee = 0

        if(dayPast > rental.daysRented ){
            delayFee = (dayPast-rental.daysRented)*rental.originalPrice/rental.daysRented
        }


        await db.query(`UPDATE rentals SET "returnDate"=$1, "delayFee"=$2
                                            WHERE id=$3;`,[returnDate,delayFee,req.params.id])
        res.sendStatus(200)
    } catch(err){
        return res.status(500).send(err)
    }
}

export async function deleteRental(req,res){

    try{
        const rental = await db.query("SELECT * FROM rentals WHERE id=$1",[req.params.id])

        if(rental.rowCount === 0 ) return res.status(404).send("rental not found")

        if(!rental.rows[0].returnDate) return res.status(400).send("rental is not ended")

        await db.query(`DELETE FROM rentals WHERE id=$1`,[req.params.id])

        res.sendStatus(200)

    } catch(err){
        
        return res.status(500).send(err)
    }
}