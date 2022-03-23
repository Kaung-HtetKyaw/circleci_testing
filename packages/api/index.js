import express from 'express';

const app = express();
const port = 3001;

app.get('/', (_, res) => {
  res.status(200).send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is running at localhost:${port}`);
});
