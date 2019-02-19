const express = require('express'); 
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3'
  }
}

const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

//GET

server.get('/api/zoos', async (req, res) => {
  try {
    const animals = await db('zoos');
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json(error);
  }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
