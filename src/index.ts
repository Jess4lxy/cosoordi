import express from 'express';
import bodyParser from 'body-parser';
import { initDb } from './database';
import authorRoutes from './routes/authors';
import bookRoutes from './routes/books';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/../public/index.html');
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
