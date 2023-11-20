import * as jwt from 'jsonwebtoken';
import { addTarjeta, luhnCheck, validarCorreoElectronico } from '../controllers/savetarjeta.controller';
import { Request, Response } from 'express';

import request from 'supertest';
import redisClient from '../redisConfig';
import * as global from '../controllers/savetarjeta.controller';


describe('luhnCheck', () => {
  it('debería retornar true para un número de tarjeta válido', () => {
    const cardNumber = '4111111111111111';
    const result = luhnCheck(cardNumber);
    expect(result).toBe(true);
  });

  it('debería retornar false para un número de tarjeta inválido', () => {
    const cardNumber = '1234567890123456';
    const result = luhnCheck(cardNumber);
    expect(result).toBe(false);
  });

});

describe('validarCorreoElectronico', () => {
  it('debería retornar true para un correo válido', () => {
    const email = 'omarfajardomora11@gmail.com';
    const result = validarCorreoElectronico(email);
    expect(result).toBe(true);
  });

  it('debería retornar false para un correo inválido', () => {
    const email = 'omarfajardomora11@test.es';
    const result = validarCorreoElectronico(email);
    expect(result).toBe(false);
  });

});
