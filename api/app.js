const express = require('express');
const mysql = require('mysql2');

const app = express();

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1111',
  database: 'test'
});


app.use(express.json());

  // 데이터베이스에서 게시판 조회
app.get('/posts', (req, res) => {

connection.query('SELECT * FROM posts', (err, results) => {
  if (err) {
    console.error('Failed to fetch data from MySQL:', err);
    res.status(500).send('Failed to fetch data from MySQL');
    return;
  }
  res.json(results);
});
});


// 데이터베이스에서 게시판 생성
app.post('/posts', async (req, res) => {
  try {
    const { title = '', content = '' } = req.body;


    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const sqlQuery = 'INSERT INTO posts (title, content) VALUES (?, ?);';
    connection.query(sqlQuery, [title, content], (err, result) => {
      if (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Error saving data' });
      }

      // Only send the response when the query has completed successfully
      res.status(200).json({ message: 'Data saved successfully' });
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});




  // 데이터베이스에서 게시판 삭제
app.delete('/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json({ error: 'Post ID is required' });
    }

    const [result] = await connection.execute(
      'DELETE FROM posts WHERE id = ?',
      [postId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error deleting post' });
  }
});

  // 데이터베이스에서 게시판 업데이트
  app.put('/posts/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      const { title, content } = req.body;
  
      if (!postId) {
        return res.status(400).json({ error: 'Post ID is required' });
      }
  
      if (!title && !content) {
        return res.status(400).json({ error: 'At least one field to update is required' });
      }
  
      const updateData = {};
      if (title) {
        updateData.title = title;
      }
      if (content) {
        updateData.content = content;
      }
  
      const sqlQuery = 'UPDATE posts SET ? WHERE id = ?'; // 수정된 SQL 쿼리
  
      connection.query(sqlQuery, [updateData, postId], (err, result) => {
        if (err) {
          console.error('Error:', err);
          return res.status(500).json({ error: 'Error updating post' });
        }
  
        res.status(200).json({ message: 'Post updated successfully' });
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error updating post' });
    }
  });


  // 데이터베이스에서 게시판 조회
  app.get('/posts/comments', (req, res) => {

    connection.query('SELECT * FROM comments', (err, results) => {
      if (err) {
        console.error('Failed to fetch data from MySQL:', err);
        res.status(500).send('Failed to fetch data from MySQL');
        return;
      }
      res.json(results);
    });
    });

  // 데이터베이스에서 댓글 생성
  app.post('/posts/comments', async (req, res) => {
    try {
      console.log('req.body:', req.body);
      const { title = '', content = '' } = req.body;
      console.log('title:', title);
      console.log('content:', content);
  
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }
  
      const [result] = await connection.execute(
        'INSERT INTO comments (title, content) VALUES (?, ?)',
        [title, content]
      );
  
      console.log('Inserted ID:', result.insertId);
  
      res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error saving data' });
    }
  })
  
// 서버 시작
app.listen(3000, () => {
  console.log('3000포트 실행 중 입니다.');
});