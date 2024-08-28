import express from 'express';
import { db } from './db/connect';
import config from './config';
import { userTable } from './db/schema';
import { sql } from 'drizzle-orm';
import { StatusCodes } from 'http-status-codes';
import morgan from 'morgan';

//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', async function (req, res) {
  // const userList = await db.select().from(users);
  const userList = (await db.execute(sql`SELECT * FROM ${userTable}`))[0];

  res.status(200).json({
    users: userList,
    message: 'success',
  });
});

app.post('/create-user', async function (req, res) {
  const user = await db.insert(userTable).values(req.body).$returningId();

  res.status(StatusCodes.CREATED).json({
    user,
    message: 'user created successfully',
  });
});

app.use(errorHandlerMiddleware);

app.use('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: 'Not Found' });
});

const port = config.port || 5000;

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

start();
