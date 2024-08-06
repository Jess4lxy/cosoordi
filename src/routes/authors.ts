import express from 'express';
import { openDb } from '../database';

const router = express.Router();

router.get('/', async (req, res) => {
  const db = await openDb();
  const authors = await db.all('SELECT * FROM autores');
  res.json(authors);
});

router.post('/', async (req, res) => {
  const { nombre, apellido, fecha_nacimiento } = req.body;
  const db = await openDb();
  await db.run('INSERT INTO autores (nombre, apellido, fecha_nacimiento) VALUES (?, ?, ?)', [nombre, apellido, fecha_nacimiento]);
  res.status(201).json({ message: 'Author created' });
});

router.put('/:id', async (req, res) => {
  const { id, nombre, apellido, fecha_nacimiento } = req.body;
  const db = await openDb();
  await db.run('UPDATE autores SET nombre = ?, apellido = ?, fecha_nacimiento = ? WHERE id = ?', [nombre, apellido, fecha_nacimiento, id]);
  res.status(201).json({ message: 'Author updated' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const db = await openDb();
  await db.run('DELETE FROM autores WHERE id = ?', [id]);
  res.status(200).json({ message: 'Author deleted' });
});

export default router;
