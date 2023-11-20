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
            jwt.sign({tarjeta}, 'secretkey', {expiresIn: '60s'}, (err, token) => {
                res.json({
                    token
                })
            });
        }
    })
}
/*
export const loginUser = (req: Request, res: Response) => {
    
    const { nombre, password } = req.body;

    connection.query('SELECT * FROM usuarios WHERE nombre = ' + connection.escape(nombre), (err, data) => {
        if(err) {
            console.log(err)
        } else {
            if(data.length == 0) {
                // No existe el usuario en la base de datos
                res.json({
                    msg: 'No existe el usuario en la base de datos',                    
                })
            } else {
                // Existe
                const userPassword = data[0].password;
                console.log(password)
                // Comparamos el password
                bcrypt.compare(password, userPassword).then((result) => {
                    if(result) {
                        // Login exitoso -- Generamos el token
                        const token = jwt.sign({
                            nombre: nombre,
                        }, process.env.SECRET_KEY || 'pepito123')

                        res.json({
                            token
                        })
                    } else {
                        // Password incorrecto
                        res.json({
                            msg: 'Password incorrecto',
                        })
                    }
                })

                
            }           
        }
    })


    
}*/