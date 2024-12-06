const favorites = new Map();

const addFavorite = (userId, repoId) => {
  if (!favorites.has(userId)) {
    favorites.set(userId, new Set());
  }
  favorites.get(userId).add(repoId);
  return true;
};
const removeFavorite = (userId, repoId) => {
  if (!favorites.has(userId)) return false;
  return favorites.get(userId).delete(repoId);
};
const getUserFavorites = (userId) => {
  return Array.from(favorites.get(userId) || new Set());
};

module.exports = {
  addFavorite,
  removeFavorite,
  getUserFavorites
}
