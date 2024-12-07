const favoritesService = require('../services/favoriteService');
const { GraphQLClient } = require('graphql-request');
const { GITHUB_API_URL } = require('../config/github');
const { GET_USER_REPOSITORIES, SEARCH_REPOSITORIES } = require('../graphql/repositories')

const listRepositories = async (request, response, next) => {
  let repositories = [];
  try {
    const token = request.auth.token;
    const client = new GraphQLClient(GITHUB_API_URL, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    //TODO: Query implementation needed
    const data = await client.request(GET_USER_REPOSITORIES);
    repositories = data.viewer.repositories.nodes;
    response.status(200).json({ repositories });
  } catch (error) {
    next(error);
  }
};
const searchRepositories = async (request, response, next) => {
  let repositories = [];
  try {
    const { query } = request.query;
    const token = request.auth.token;
    if (!query) {
      return response.status(400).json({ message: 'Search query is required' });
    }
    //TODO: Implement search query
    const client = new GraphQLClient(GITHUB_API_URL, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    const data = await client.request(SEARCH_REPOSITORIES);
    repositories = data.search.edges.map(edge => edge.node);
    response.status(200).json({ repositories });
  } catch (error) {
    next(error);
  }
};

const getUserFavorites = (request, response, next) => {
  try {
    const userId = request.auth.sub;
    const result = favoritesService.getUserFavorites(userId);

    if (!result.success) {
      return response.status(400).json({
        message: result.message
      });
    }

    response.status(200).json({
      favorites: result.favorites,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};
const addToFavorites = (request, response, next) => {
  try {
    const userId = request.auth.sub;
    const { repoId } = request.params;
    const result = favoritesService.addFavorite(userId, repoId);

    if (!result.success) {
      return response.status(400).json({
        message: result.message
      });
    }

    response.status(200).json({
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};
const removeFromFavorites = (request, response, next) => {
  try {
    const userId = request.auth.sub;
    const { repoId } = request.params;
    const result = favoritesService.removeFavorite(userId, repoId);

    if (!result.success) {
      return response.status(400).json({
        message: result.message
      });
    }

    response.status(200).json({
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserFavorites,
  addToFavorites,
  removeFromFavorites,
  listRepositories,
  searchRepositories
};
