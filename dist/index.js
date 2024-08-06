"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("./database");
const authors_1 = __importDefault(require("./routes/authors"));
const books_1 = __importDefault(require("./routes/books"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.json());
app.use(express_1.default.static('public'));
app.use('/api/authors', authors_1.default);
app.use('/api/books', books_1.default);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../public/index.html');
});
(0, database_1.initDb)().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
