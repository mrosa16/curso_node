import express from 'express';
import { routerLoader } from './routerLoader';
const app = express();
app.use(express.json());
// app.use(userRouter);
// app.use(productRouter);
routerLoader(app);
app.listen(8080, (): void => {
  console.log('Servidor Rodando');
});
