import express from 'express'

const app = express();

app.use(express.json());


app.listen(3003, () => {

    console.log(`Servidor rodando em http://localhost:3003`);
  });