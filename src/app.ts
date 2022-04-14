import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import errorHandler from 'errorhandler';
import pageRouter from './routes/pageRoutes';

dotenv.config({ path: 'variable.env' });


const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/pages', pageRouter);

app.get('/', function (req: express.Request, res: express.Response) {
  return res.send({
    message: 'Ping Dot test server',
    status: 200,
  });
});

if (app.get('env') === 'development') {
  app.use(errorHandler());
  app.locals.pretty = true;
}

export default app;
