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
const express_1 = __importDefault(require("express"));
const database_1 = require("../database");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, database_1.openDb)();
    const books = yield db.all('SELECT * FROM libros');
    res.json(books);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, fecha_publicacion, autor_id, precio } = req.body;
    const db = yield (0, database_1.openDb)();
    yield db.run('INSERT INTO libros (titulo, fecha_publicacion, autor_id, precio) VALUES (?, ?, ?, ?)', [titulo, fecha_publicacion, autor_id, precio]);
    res.status(201).json({ message: 'Book created' });
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idBook, nombre, apellido, fecha_nacimiento } = req.body;
    const db = yield (0, database_1.openDb)();
    yield db.run('UPDATE INTO libros (titulo, fecha_publicacion, autor_id, precio) VALUES (?, ?, ?, ?) WHERE id = ?', [nombre, apellido, fecha_nacimiento], [idBook]);
    res.status(201).json({ message: 'Book updated' });
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const db = yield (0, database_1.openDb)();
    yield db.run('DELETE FROM libros WHERE id = ?', [id]);
    res.status(200).json({ message: 'Book deleted' });
}));
exports.default = router;
