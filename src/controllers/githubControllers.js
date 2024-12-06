const favoritesService = require('../services/favoritesService');

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
