const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv'); // dotenv 패키지 로드

dotenv.config(); // 환경 변수 로드

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: process.env.DB_HOST,      // 환경 변수로부터 값 로드
    user: process.env.DB_USER,      // 환경 변수로부터 값 로드
    password: process.env.DB_PASSWORD, // 환경 변수로부터 값 로드
    database: process.env.DB_NAME   // 환경 변수로부터 값 로드
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');

    db.query(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) UNIQUE,
            password VARCHAR(255)
        )
    `, (err) => {
        if (err) throw err;
        console.log("Table 'users' created or already exists.");
    });
});

app.use(bodyParser.json());
app.use(express.static('public'));

// 회원가입 엔드포인트
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [email, hashedPassword], (err) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(500).json({ message: 'User already exists' });
            }
            return res.status(500).json({ message: 'Database error' });
        }
        res.json({ message: 'Signup successful' });
    });
});

// 로그인 엔드포인트
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = results[0];
        if (bcrypt.compareSync(password, user.password)) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(400).json({ message: 'Incorrect password' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

