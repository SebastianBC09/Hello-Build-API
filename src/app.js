const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { jwtCheck, checkScopes } = require('./config/auth0');
// const authRoutes = require('./routes/auth');
// const githubRoutes = require('./routes/github');
const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config();

app.use(cors());
app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/github', githubRoutes);

// This route doesn't need authentication
app.get('/api/public', function(request, response) {
  response.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

// This route needs authentication
app.get('/api/private', jwtCheck, function(request, response) {
  response.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

app.get('/api/private-scoped', jwtCheck, checkScopes, function(request, response) {
  response.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
