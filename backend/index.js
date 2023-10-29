const express = require('express');
const { Pool } = require('pg');

const server = express();

// psql pool
const pool = new Pool({
  user: process.env.USER,
  host: process.env.IP,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
});

server.get('/users', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    const users = result.rows;
    client.release();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao obter usuários');
  }
});

server.post('/users', async (req, res) => {
  const { email } = req.body;

  try {
    const client = await pool.connect();
    await client.query('INSERT INTO users (email) VALUES ($1)', [email]);
    client.release();
    res.send('Usuário criado com sucesso');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar usuário');
  }
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
