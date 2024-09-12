const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3302; 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'cimatec', 
    database: 'areaAluno' 
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL com sucesso!');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/submit', (req, res) => {
    const {nome, email, senha } = req.body;
    const query = 'INSERT INTO usuario (nome, email, senha ) VALUES (?, ?, ?)';
    db.query(query, [nome, email, senha ], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar usuário:', err);
            res.status(500).json({ message: 'Erro ao cadastrar usuário' });
            return;
        }
        res.json({ message: 'Usuário cadastrado com sucesso!' });
    });
});
const nome = document.getElementById().value;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

