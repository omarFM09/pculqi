import { Request, Response } from 'express';
import connection from '../db/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export const addTarjeta = async (req: Request, res: Response) => {

    const { email, card_number, cvv, expiration_year, expiration_month } = req.body;

    //const hashedPassword = await bcrypt.hash(password, 10);


    connection.query('INSERT INTO tarjeta set ?', {  email: email, card_number:card_number, cvv: cvv, expiration_year: expiration_year, expiration_month: expiration_month }, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            const tarjeta = {
                email, card_number, cvv, expiration_year, expiration_month
            }
            //const token = jwt.sign(tarjeta, 'secret', {expiresIn : '24h'}, process.env.SECRET_KEY);
           jwt.sign({tarjeta}, 'secretkey', {expiresIn: '6000s'}, (err, token) => {
                res.json({
                    token
                })
            });
        }
    })
}