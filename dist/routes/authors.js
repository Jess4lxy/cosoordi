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
    const authors = yield db.all('SELECT * FROM autores');
    res.json(authors);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, fecha_nacimiento } = req.body;
    const db = yield (0, database_1.openDb)();
    yield db.run('INSERT INTO autores (nombre, apellido, fecha_nacimiento) VALUES (?, ?, ?)', [nombre, apellido, fecha_nacimiento]);
    res.status(201).json({ message: 'Author created' });
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, nombre, apellido, fecha_nacimiento } = req.body;
    const db = yield (0, database_1.openDb)();
    yield db.run('UPDATE autores SET nombre = ?, apellido = ?, fecha_nacimiento = ? WHERE id = ?', [nombre, apellido, fecha_nacimiento, id]);
    res.status(201).json({ message: 'Author updated' });
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const db = yield (0, database_1.openDb)();
    yield db.run('DELETE FROM autores WHERE id = ?', [id]);
    res.status(200).json({ message: 'Author deleted' });
}));
exports.default = router;
