import { Router } from 'express';
//import { addTarjeta, loginUser } from '../controllers/savetarjeta.controller';
import { addTarjeta } from '../controllers/savetarjeta.controller';

const router = Router();

router.post('/', addTarjeta);
//router.post('/login', loginUser)

export default router;