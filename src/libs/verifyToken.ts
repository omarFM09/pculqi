import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface IVerified {
   
    tarjeta: {
        email: string;
        card_number: string;
        expiration_year: string;
        expiration_month: string;
        // Otras propiedades de tarjetadatos si las tienes
    };

}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const verified = jwt.verify(token, 'secretkey') as IVerified;
    req.tarjeta = verified.tarjeta; 
    next();
  } catch (err) {
    res.status(400).send('Token inválido o expirado!');
  }
};