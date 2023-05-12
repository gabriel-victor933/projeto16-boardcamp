import {db} from "../dbs/connectDb.js"

export async function postClient(req,res){

    try{
        const data = await db.query("SELECT * FROM customers WHERE cpf=$1",[req.body.cpf])

        if(data.rowCount > 0) return res.status(400).send("the customer is already registered")

        await db.query(`INSERT INTO customers (name,phone,cpf,birthday) 
        VALUES ($1,$2,$3,$4)`,[req.body.name,req.body.phone,req.body.cpf,req.body.birthday])
        
        res.sendStatus(201)

    } catch(err){
        res.status(500).send(err)
    }

}

export async function getclients(req,res){

    try{
        const clients = await db.query("SELECT * FROM customers;")

        res.send(clients.rows)
    } catch(err){

        res.status(500).send(err)
    }
}

export async function getclient(req,res){


    try{
        const clients = await db.query("SELECT * FROM customers WHERE id=$1;",[req.params.id])

        if(clients.rowCount == 0 ) return res.sendStatus(404)
        
        res.send(clients.rows)
    } catch(err){

        res.status(500).send(err)
    }
}