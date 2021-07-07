import express from 'express'
import { followRouter } from './routes/followRouter';
import { imageRouter } from './routes/imageRouter';
import { userRouter } from './routes/userRouter';

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/image",imageRouter);
app.use("/follow",followRouter);

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando em http://localhost:3003`);
});