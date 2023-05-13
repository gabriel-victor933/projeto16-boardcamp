import { db }from "../dbs/connectDb.js"

export async function postGame(req,res){

    try{
        const data = await db.query(`SELECT * FROM games WHERE name=$1;`,[req.body.name])
        if(data.rowCount > 0) return res.status(409).send("game already exist")

        await db.query(`INSERT INTO games (name,image,"stockTotal", "pricePerDay")
                                        VALUES ($1,$2,$3,$4)`,[req.body.name,req.body.image,req.body.stockTotal,req.body.pricePerDay])
        
        res.sendStatus(201)
    } catch(err){
        res.status(500).send(err)
    }


} 

export async function getGames(req,res){

    const name = (req.query.name || "")
    const offset = (req.query.offset || null)
    const limit = (req.query.limit || null)
    const validColumns = ["id","name","image","stockTotal","pricePerDay"]
    let orderClause = "";

    if(validColumns.includes(req.query.order)){
        orderClause  = `ORDER BY "${req.query.order}" ${req.query.desc==="true"? "DESC":"ASC"}`
    }
    
    
    try{
        const games = await db.query(`SELECT * FROM games  
                                      WHERE games.name ILIKE $1
                                      ${orderClause} 
                                      OFFSET COALESCE($2,0)
                                      LIMIT $3;`,[`${name}%`,offset,limit])

        res.send(games.rows)
    } catch(err){
        res.status(500).send(err)
    }
}