import { Request, Response } from 'express';
//import connection from '../db/connection';
import jwt from 'jsonwebtoken';
import redisClient from '../redisConfig';


export const addTarjeta = async (req: Request, res: Response) => {
    try{
       
    const { email, card_number, cvv, expiration_year, expiration_month } = req.body;
    
    var sendJson = true;

    //validar número de tarjeta
    if (!luhnCheck(card_number)) {
        res.status(400).json({ error: 'El número de tarjeta no es válido.' });
    }

    //validar cvv
    if(cvv !== '123' && cvv !== '4532'){
        res.status(400).json({ error: 'El cvv de tarjeta no es válido.' });
    }

    // Validar mes de expiración
    if (parseInt(expiration_month, 10) < 1 || parseInt(expiration_month, 10) > 12) {
        return res.status(400).json({ error: 'El mes de expiración es incorrecto.' });
    }

    // Validar año de expiración
    const fecha = new Date();
    const anioActual = fecha.getFullYear();
    fecha.setFullYear(anioActual + 5);
    const anio_exp = fecha.getFullYear();

    //validamos si el año es menor al actual
    if (parseInt(expiration_year, 10) < anioActual) {
        return res.status(400).json({ error: 'El año ha expirado.' + anio_exp });
    }

    //validamos si el año es mayor al límite
    if (parseInt(expiration_year, 10) > anio_exp) {
        return res.status(400).json({ error: 'El año de expiración está fuera del límite.' });
    }

    // Validar correo electrónico
    if (!validarCorreoElectronico(email)) {
        return res.status(400).json({ error: 'El correo no contiene los dominios permitidos.' });
    }
    

    const datotarjeta = '{ "email":'+email+', "card_number":'+card_number+', "cvv":'+cvv+', "expiration_year":'+expiration_year+', "expiration_month":'+expiration_month+' }';
    const tarjeta = {
        email, card_number, cvv, expiration_year, expiration_month
    }
    await redisClient.set('tarjeta', datotarjeta);
    jwt.sign({tarjeta}, 'secretkey', {expiresIn: '6000s'}, (err, token) => {
        res.json({
            token
        })
    });

    } catch (error){
        console.error('Error al interactuar con Redis:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
    //redisClient.quit();
    
     
}

export function luhnCheck(cardNumber: string): boolean {
    // Convertir el número de la tarjeta a un array de dígitos
    const digits = cardNumber.split('').map(Number);
  
    // empieza desde el extremo derecho
    let sum = 0;
    let alternate = false;
  
    for (let i = digits.length - 1; i >= 0; i--) {
      let currentDigit = digits[i];
  
      // Duplicamos los dígitos en posiciones impares
      if (alternate) {
        currentDigit *= 2;
  
        // Sumar los dígitos si la duplicación resulta en un número de dos dígitos
        if (currentDigit > 9) {
          currentDigit -= 9;
        }
      }
  
      // Alternar hasta la próxima iteración
      alternate = !alternate;
  
      // Sumar el dígito actual al total
      sum += currentDigit;
    }
  
    // Verificar si la suma total es un múltiplo de 10
    return sum % 10 === 0;
  }

 export function validarCorreoElectronico(correo: string): boolean {
    // Expresión regular para validar un formato de correo electrónico
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Lista de dominios permitidos
    const dominiosPermitidos = ['gmail.com', 'hotmail.com', 'yahoo.es'];
  
    // Verificar el formato del correo y el dominio permitido
    if (regexCorreo.test(correo)) {
      const dominio = correo.split('@')[1];
      return dominiosPermitidos.includes(dominio);
    }
  
    return false;
  }