// index.js
const express = require('express');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.send('To-Do List API');
});

// 모든 사용자 가져오기
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM user');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 사용자 추가하기
app.post('/users', async (req, res) => {
  const { user_name, user_id, user_pw } = req.body;
  if (!user_name || !user_id || !user_pw) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await pool.query('INSERT INTO user (user_name, user_id, user_pw) VALUES (?, ?, ?)', [user_name, user_id, user_pw]);
    res.json({ message: 'User added successfully', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
