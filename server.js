const express = require('express');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const { limiter } = require('./middleware/rateLimit');

const app = express();


connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);


app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to User Post Management API',
    endpoints: {
      auth: {
        signup: 'POST /api/v1/auth/signup',
        login: 'POST /api/v1/auth/login'
      },
      users: {
        getUsers: 'GET /api/v1/users',
        getUser: 'GET /api/v1/users/:id',
        updateUser: 'PATCH /api/v1/users/:id',
        deleteUser: 'DELETE /api/v1/users/:id'
      },
      posts: {
        getPosts: 'GET /api/v1/posts',
        createPost: 'POST /api/v1/posts',
        getPost: 'GET /api/v1/posts/:id',
        updatePost: 'PATCH /api/v1/posts/:id',
        deletePost: 'DELETE /api/v1/posts/:id'
      }
    }
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});


app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Open http://localhost:${PORT} in your browser`);
});