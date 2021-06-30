import express from 'express'
import { imageRouter } from './routes/imageRouter';
import { userRouter } from './routes/userRouter';

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/image",imageRouter)

app.listen(3003, () => {
  console.log(`Servidor rodando em http://localhost:3003`);
});