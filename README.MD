# Hello Build Technical Test 🚀

A full-stack application that allows users to authenticate with GitHub and manage their repositories through a simple interface.

## Project Overview

This technical test includes:
- User authentication via Auth0 and GitHub OAuth
- Repository listing and search functionality
- Favorite repositories management
- Single Page Application architecture

### Tech Stack

**Backend:**
- Node.js v18
- Express.js
- Auth0 Authentication
- GitHub GraphQL API

**Frontend:**
- React (to be implemented)
- React Router
- GitHub OAuth integration

## Features

- [x] Login/Sign Up through Auth0
- [x] GitHub OAuth Integration
- [x] Protected API Routes
- [x] Repository Management
- [x] Favorites System
- [ ] Frontend Implementation

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
cd hello-build-api
npm install
```
3. Configure environment variables:
```
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

4. Run the development server:
```bash
npm run dev
```

## API Endpoints
### Auth Routes
- **GET** `/api/auth/login` - Initiates login flow
- **GET** `/api/auth/callback` - OAuth callback handler
- **GET** `/api/auth/profile` - Get user profile
- **GET** `/api/auth/logout` - Logout user
### GitHub Routes
- **GET** `/api/github/repositories` - List user repositories
- **GET** `/api/github/search` - Search repositories
- **GET** `/api/github/favorites` - Get favorite repositories
- **POST** `/api/github/favorites/:repoId` - Add repository to favorites
- **DELETE** `/api/github/favorites/:repoId` - Remove repository from favorites

## Technical Decisions
1. **Auth0 Integration:** Chosen for robust authentication and easy GitHub OAuth integration
2. **Express.js:** Lightweight and flexible backend framework
3. **In-Memory Storage:** Simple favorites management for demonstration purposes

## Author
Sébastien Ballen Castaneda
## License
MIT License

Copyright (c) 2024 Sébastien Ballen Castaneda

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
