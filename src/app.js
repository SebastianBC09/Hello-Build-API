const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwtCheck = require('./config/auth0');
const authRoutes = require('./routes/auth');
const githubRoutes = require('./routes/github');
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(jwtCheck)

app.use('/api/auth', authRoutes);
app.use('/api/github', githubRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
