import express from 'express';
import { openDb } from '../database';

const router = express.Router();

router.get('/', async (req, res) => {
  const db = await openDb();
  const books = await db.all('SELECT * FROM libros');
  res.json(books);
});

router.post('/', async (req, res) => {
  const { titulo, fecha_publicacion, autor_id, precio } = req.body;
  const db = await openDb();
  await db.run('INSERT INTO libros (titulo, fecha_publicacion, autor_id, precio) VALUES (?, ?, ?, ?)', [titulo, fecha_publicacion, autor_id, precio]);
  res.status(201).json({ message: 'Book created' });
});

router.put('/:id', async (req, res) => {
  const { idBook, nombre, apellido, fecha_nacimiento } = req.body;
  const db = await openDb();
  await db.run('UPDATE INTO libros (titulo, fecha_publicacion, autor_id, precio) VALUES (?, ?, ?, ?) WHERE id = ?', [nombre, apellido, fecha_nacimiento], [idBook]);
  res.status(201).json({ message: 'Book updated' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const db = await openDb();
  await db.run('DELETE FROM libros WHERE id = ?', [id]);
  res.status(200).json({ message: 'Book deleted' });
});

export default router;
