import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export async function openDb(): Promise<Database> {
  return open({
    filename: './database.db',
    driver: sqlite3.Database
  });
}

export async function initDb() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS autores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      apellido TEXT,
      fecha_nacimiento TEXT
    );
    CREATE TABLE IF NOT EXISTS libros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT,
      fecha_publicacion TEXT,
      autor_id INTEGER,
      precio REAL,
      FOREIGN KEY (autor_id) REFERENCES autores(id)
    );
  `);

  const existingAuthors = await db.all('SELECT * FROM autores');
  if (existingAuthors.length === 0) {
    await db.run(`
      INSERT INTO autores (nombre, apellido, fecha_nacimiento) VALUES 
      ('Gabriel', 'García Márquez', '1927-03-06'),
      ('Isabel', 'Allende', '1942-08-02'),
      ('Mario', 'Marienete', '1942-08-02');
    `);
  }

  const existingBooks = await db.all('SELECT * FROM libros');
  if (existingBooks.length === 0) {
    await db.run(`
      INSERT INTO libros (titulo, fecha_publicacion, autor_id, precio) VALUES 
      ('Cien Años de Soledad', '1967-06-05', 1, 12.99),
      ('La Casa de los Espíritus', '1982-10-15', 2, 10.99);
    `);
  }
}
