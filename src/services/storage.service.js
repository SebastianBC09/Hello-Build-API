class StorageService {
  constructor() {
    this.favorites = new Map();
  }

  getFavorites(userId) {
    return this.favorites.get(userId) || [];
  }

  addFavorite(userId, repo) {
    const userFavorites = this.getFavorites(userId);
    if (!userFavorites.find(r => r.id === repo.id)) {
      userFavorites.push(repo);
      this.favorites.set(userId, userFavorites);
    }
    return userFavorites;
  }

  removeFavorite(userId, repoId) {
    const userFavorites = this.getFavorites(userId);
    const updated = userFavorites.filter(r => r.id !== repoId);
    this.favorites.set(userId, updated);
    return updated;
  }
}

module.exports = new StorageService();
