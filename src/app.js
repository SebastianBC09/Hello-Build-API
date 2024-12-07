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

app.use(cors());
app.use(express.json());

app.use(
  '/graphql',
  createHandler({
    schema,
'https://api.hello-build.com',    graphiql: process.env.NODE_ENV !== 'production'
  })
);
app.use('/api/auth', authRoutes);
app.use('/api/github', githubRoutes);

app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(error.status || 500).json({
    message: error.message || 'Internal Server Error'
  });
});
app.use((request, response) => {
  response.status(404).json({ message: 'Route not found' });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
