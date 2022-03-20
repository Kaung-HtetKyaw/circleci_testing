import express from 'express';

const app = express();

app.get('/', (_, res) => {
  res.status(200).send('Hello World');
});

app.listen(3001, () => {
  console.log('Server is running at 3001');
});
