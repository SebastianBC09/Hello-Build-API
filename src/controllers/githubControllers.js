const favoritesService = require('../services/favoritesService');
const { GraphQLClient } = require('graphql-request');
const { GITHUB_API_URL } = require('../config/github');

const listRepositories = async (request, response, next) => {
  try {
    const token = request.auth.token;
    //TODO: Implement GraphQL query for repositories
    const client = new GraphQLClient(GITHUB_API_URL, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    //TODO: Query implementation needed
    response.status(200).json({ repositories: [] });
  } catch (error) {
    next(error);
  }
};
const searchRepositories = async (request, response, next) => {
  try {
    const { query } = request.query;
    const token = request.auth.token;
    if (!query) {
      return response.status(400).json({ message: 'Search query is required' });
    }
    //TODO: Implement search query
    response.status(200).json({ repositories: [] });
  } catch (error) {
    next(error);
  }
};

const getUserFavorites = (request, response, next) => {
  try {
    const userId = request.auth.sub;
    const favorites = favoritesService.getUserFavorites(userId);
    response.status(200).json({ favorites });
  } catch (error) {
    next(error);
  }
};
const addToFavorites = (request, response, next) => {
  try {
    const userId = request.auth.sub;
    const { repoId } = request.params;
    favoritesService.addFavorite(userId, repoId);
    response.status(200).json({ message: 'Repository added to favorites' });
  } catch (error) {
    next(error);
  }
};
const removeFromFavorites = (request, response, next) => {
  try {
    const userId = request.auth.sub;
    const { repoId } = request.params;
    favoritesService.removeFavorite(userId, repoId);
    response.status(200).json({ message: 'Repository removed from favorites' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserFavorites,
  addToFavorites,
  removeFromFavorites
};
