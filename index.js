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


server.get('/api/zoos/:id', async (req, res) => {
  try {
    const animal = await db('zoos')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json(error);
  }
});


//POST

server.post('/api/zoos', async (req, res) => {
  try {
    const [id] = await db('zoos').insert(req.body);
    const animal = await db('zoos')
      .where({ id })
      .first();
    res.status(201).json(animal);
  } catch (error) {
    res.status(500).json(error);
  }
});


//PUT
server.put('/api/zoos/:id', async (req, res) => {
  try {
    const count = await db('zoos')
      .where({ id: req.params.id })
      .update(req.body);
    if (count) {
      const animal = await db('zoos')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(animal);
    } else {
      res.status(404).json({ error: "The animal with the specified ID does not exist"})
    }
  } catch (error) {
    res.status(500).json({ error: "We could not complete the request at this time."})
  }
});



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
