import express from 'express';
import { router } from './routes';
import cors from 'cors';
import { errorHandler } from './middlewares/error.handler';

const app = express();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(port);
