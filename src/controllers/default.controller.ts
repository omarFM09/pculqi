import { Request, Response } from 'express';

export const getDefault = async (req: Request, res: Response) => {

   
    try{
  
    res.json({
        msg: 'API FUNCIONANDO'
    })
    } catch (error){
        res.status(500).json({ error: 'Error interno del servidor' });
    }
   
}