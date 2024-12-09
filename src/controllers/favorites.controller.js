const storageService = require('../services/storage.service');
const asyncHandler = require('../utils/asyncHandler');

exports.getFavorites = asyncHandler(async (req, res) => {
  const favorites = storageService.getFavorites(req.user.sub);
  res.json({ favorites });
});

exports.addFavorite = asyncHandler(async (req, res) => {
  const { repository } = req.body;
  const favorites = storageService.addFavorite(req.user.sub, repository);
  res.json({ favorites });
});

exports.removeFavorite = asyncHandler(async (req, res) => {
  const { repoId } = req.params;
  const favorites = storageService.removeFavorite(req.user.sub, repoId);
  res.json({ favorites });
});
