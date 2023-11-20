import { NextFunction, Request, Response } from 'express';
import connection from '../db/connection';
import jwt from 'jsonwebtoken';

export const getProductos =  ( req: Request, res: Response) => {

    connection.query('SELECT * FROM tarjeta', (err, data) => {
        if(err) {
            console.log(err)
        } else {
            res.json({
                data
            })
        }
    })
}
/*
function verifyToken(req: Request, res: Response, next: NextFunction){
    const bearerHeader = req.headers['authorization'];
    const token = req.header('auth-token');

    if (!token) return res.status(401).json('Acceso denegado');

    const confirm = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest');
    console.log(confirm);
    next();

    if(typeof bearerHeader !== 'undefined' ){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }*/
/*
app.post("/api/posts", verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                mensaje: "Post fue creado",
                authData
            })
        }
    })

    res.json({
        mensaje: "Post fue creado"
    });
 });
   
function verifyToken(req: Request, res: Response, next: NextFunction){
    const bearerHeader = req.headers['authorization'];
    const token = req.header('auth-token');

    if (!token) return res.status(401).json('Acceso denegado');

    const confirm = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest');
    console.log(confirm);
    next();

    if(typeof bearerHeader !== 'undefined' ){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}*/