import { NextFunction, Request, Response } from 'express';


export const getProductos =  ( req: Request, res: Response) => {
 
    const value = req.tarjeta;
  
    res.json({
       email: value.email,
       card_number: value.card_number,
       expiration_year: value.expiration_year,
       expiration_month: value.expiration_month
    })
}
