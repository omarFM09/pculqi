import { Request, Response } from 'express';
import redisClient from '../../redisClient';

export const getDefault = async (req: Request, res: Response) => {
    
  await redisClient.set('miClave', 'miValor');
  const valor = await redisClient.get('miClave');

  console.log(valor);
    res.json({
        msg: 'API funcionandoo',
        data: valor,
        type: 'mensaje'
    })
}