const request = require('supertest');
const app = require('./server');

describe('POST /calculate', () => {
  test('adds two numbers', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({ left: 3, operator: '+', right: 5 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 8 });
  });

  test('subtracts two numbers', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({ left: 5, operator: '-', right: 3 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 2 });
  });

  test('multiplies two numbers', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({ left: 4, operator: '*', right: 3 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 12 });
  });

  test('divides two numbers', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({ left: 10, operator: '/', right: 2 });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ result: 5 });
  });

  test('handles decimal numbers', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({ left: 3.5, operator: '+', right: 2.1 });

    expect(res.status).toBe(200);
    expect(res.body.result).toBeCloseTo(5.6);
  });

  test('rejects division by zero', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({ left: 10, operator: '/', right: 0 });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Division by zero' });
  });

  test('rejects non-numeric input', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({ left: 'abc', operator: '+', right: 5 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test('rejects invalid operator', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({ left: 3, operator: '^', right: 5 });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid operator' });
  });

  test('rejects missing fields', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});
