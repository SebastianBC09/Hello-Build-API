const favorites = new Map();

const validateInputs = (userId, repoId) => {
  if (!userId) throw new Error('User ID is required');
  if (!repoId) throw new Error('Repository ID is required');
};

const addFavorite = (userId, repoId) => {
  try {
    validateInputs(userId, repoId);

    if (!favorites.has(userId)) {
      favorites.set(userId, new Set());
    }

    const userFavorites = favorites.get(userId);
    if (userFavorites.has(repoId)) {
      return { success: false, message: 'Repository already in favorites' };
    }

    userFavorites.add(repoId);
    return { success: true, message: 'Repository added to favorites' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const removeFavorite = (userId, repoId) => {
  try {
    validateInputs(userId, repoId);

    if (!favorites.has(userId)) {
      return { success: false, message: 'No favorites found for user' };
    }

    const userFavorites = favorites.get(userId);
    if (!userFavorites.has(repoId)) {
      return { success: false, message: 'Repository not in favorites' };
    }

    userFavorites.delete(repoId);
    return { success: true, message: 'Repository removed from favorites' };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const getUserFavorites = (userId) => {
  try {
    if (!userId) throw new Error('User ID is required');

    return {
      success: true,
      favorites: Array.from(favorites.get(userId) || new Set()),
      message: 'Favorites retrieved successfully'
    };
  } catch (error) {
    return { success: false, message: error.message, favorites: [] };
  }
};

module.exports = {
  addFavorite,
  removeFavorite,
  getUserFavorites
};
