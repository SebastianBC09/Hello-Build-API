const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const authRoutes = require('./routes/auth');
const githubRoutes = require('./routes/github');
const PORT = process.env.PORT || 8080;
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/github', githubRoutes);
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV !== 'production'
  })
);
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
