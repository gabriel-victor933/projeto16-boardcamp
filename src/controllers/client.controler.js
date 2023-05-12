import {db} from "../dbs/connectDb.js"

export async function postClient(req,res){

    try{
        const data = await db.query("SELECT * FROM customers WHERE cpf=$1",[req.body.cpf])

        if(data.rowCount > 0) return res.status(409).send("the customer is already registered")

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

        res.send(clients.rows[0])
    } catch(err){

        res.status(500).send(err)
    }
}

export async function putClient(req,res){

    try{
        const data = await db.query("SELECT * FROM customers WHERE cpf=$1 AND id<>$2",[req.body.cpf,req.params.id])

        if(data.rowCount != 0) return res.status(409).send("invalid CPF")

        const resposta = await db.query(`UPDATE customers SET name=$1,phone=$2,cpf=$3, birthday=$4 
        WHERE id=$5`,[req.body.name,req.body.phone,req.body.cpf,req.body.birthday,req.params.id])
        res.sendStatus(200)

    } catch(err){
        res.status(500).send(err)
    }

}