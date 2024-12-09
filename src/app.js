const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});
const cors = require('cors');
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require('./graphql/schema');
const authRoutes = require('./routes/auth');
const githubRoutes = require('./routes/github');
const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/github', githubRoutes);
app.use('/graphql', createHandler({
  schema,
  graphiql: process.env.NODE_ENV !== 'production',
  context: (req) => ({
    user: req.auth
  })
}));

app.use((error, request, response, next) => {
  console.error('Error:', {
    message: error.message,
    stack: error.stack,
    status: error.status
  });

  response.status(error.status || 500).json({
    message: error.message || 'Internal Server Error',
    status: error.status || 500
  });
});

app.use((request, response) => {
  response.status(404).json({
    message: 'Route not found',
    status: 404
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
