import { sum } from './myutility';

test('Suma dos números correctamente', () => {
  expect(sum(2, 3)).toBe(5);
});

test('Suma números negativos', () => {
  expect(sum(-1, -2)).toBe(-3);
});