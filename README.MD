# GitHub Favorites Backend Test 🚀

Express backend service for managing GitHub repositories with Auth0 authentication.

## ✨ Features
- 🔐 Auth0 + GitHub OAuth Integration
- 🔒 Protected API Routes
- 📚 Repository Management API
- ⭐ Favorites System
- 🔄 GitHub GraphQL API Integration
- 🛡️ Security Best Practices

## 🛠️ Tech Stack

### Core
- Node.js v18
- Express.js v4.21
- GraphQL v16.9

### Authentication & Security
- jsonwebtoken v9.0
- jwks-rsa v3.0
- Auth0 Integration

### API & Data Handling
- axios v1.7
- graphql-request v4.3
- graphql-http v1.22

### Utils
- cors v2.8
- dotenv v16.4

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- GitHub account
- Auth0 account

### Environment Variables
```bash
# Server Configuration
PORT=8080
NODE_ENV='development'

# URLs Configuration
BASE_URL='http://localhost:8080'
CLIENT_URL='http://localhost:3000'
CORS_ORIGIN='http://localhost:3000'

# Auth0 Configuration
AUTH0_DOMAIN='your-auth0-domain.region.auth0.com'
AUTH0_CLIENT_ID='your-auth0-client-id'
AUTH0_CLIENT_SECRET='your-auth0-client-secret'
AUTH0_AUDIENCE='your-auth0-api-identifier'

# Session Security
SECRET='your-session-secret-key'

# GitHub Configuration
GITHUB_API_VERSION='2022-11-28'
GITHUB_TOKEN='your-github-personal-access-token'
```
### Installation

```bash
# Clone repository
git clone <repository-url>

# Install dependencies
cd hello-build-api
npm install

# Run development server
npm run dev
```
## 🔌 API Endpoints

### Auth Routes
- **GET** `/api/auth/login` - Initiate login flow
- **GET** `/api/auth/callback` - OAuth callback handler
- **GET** `/api/auth/profile` - Get user profile
- **GET** `/api/auth/logout` - Logout user

### GitHub Routes
- **GET** `/api/github/repositories` - List repositories
- **GET** `/api/github/search` - Search repositories
### Favorites Routes
- **GET** `/api/favorites` - Get user's favorites
- **POST** `/api/favorites/:repoId` - Add repository to favorites
- **DELETE** `/api/favorites/:repoId` - Remove from favorites

## 🏗️ Project Structure
```
src/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── routes/          # API routes
├── services/        # Business logic
└── utils/           # Helper functions
```

## 🔒 Security Features
- Auth0 authentication
- CORS configuration
- JWT verification via jwks-rsa

## 👨‍💻 Author
Sébastien Ballen Castaneda

## 📜 License
MIT License - see LICENSE file for details
