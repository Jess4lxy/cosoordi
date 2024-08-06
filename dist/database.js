"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openDb = openDb;
exports.initDb = initDb;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
function openDb() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, sqlite_1.open)({
            filename: './database.db',
            driver: sqlite3_1.default.Database
        });
    });
}
function initDb() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield openDb();
        yield db.exec(`
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
        const existingAuthors = yield db.all('SELECT * FROM autores');
        if (existingAuthors.length === 0) {
            yield db.run(`
      INSERT INTO autores (nombre, apellido, fecha_nacimiento) VALUES 
      ('Gabriel', 'García Márquez', '1927-03-06'),
      ('Isabel', 'Allende', '1942-08-02'),
      ('Mario', 'Marienete', '1942-08-02');
    `);
        }
        const existingBooks = yield db.all('SELECT * FROM libros');
        if (existingBooks.length === 0) {
            yield db.run(`
      INSERT INTO libros (titulo, fecha_publicacion, autor_id, precio) VALUES 
      ('Cien Años de Soledad', '1967-06-05', 1, 12.99),
      ('La Casa de los Espíritus', '1982-10-15', 2, 10.99);
    `);
        }
    });
}
