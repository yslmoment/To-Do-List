const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;

// MySQL 연결 설정
const sequelize = new Sequelize('todoapp', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql'
});

// 모델 정의
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Task = sequelize.define('Task', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    memo: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

// 데이터베이스 동기화
sequelize.sync();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 회원가입 라우트
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.create({ username, password });
        res.send('Signup successful');
    } catch (error) {
        res.status(400).send('Signup failed');
    }
});

// 로그인 라우트
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username, password } });
    if (user) {
        res.send('Login successful');
    } else {
        res.status(401).send('Invalid username or password');
    }
});

// 할 일 목록 가져오기
app.get('/tasks', async (req, res) => {
    const { username } = req.query;
    const tasks = await Task.findAll({ where: { username } });
    res.json(tasks);
});

// 새로운 할 일 추가하기
app.post('/tasks', async (req, res) => {
    const { username, title, memo } = req.body;
    const task = await Task.create({ username, title, memo });
    res.json(task);
});

// 할 일 완료 상태 변경하기
app.patch('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const task = await Task.findByPk(id);
    if (task) {
        task.completed = completed;
        await task.save();
        res.json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
