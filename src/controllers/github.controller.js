const githubService = require('../services/github.service');
const asyncHandler = require('../utils/asyncHandler');

exports.getRepositories = asyncHandler(async (req, res) => {
  const githubToken = req.user.github_access_token;
  githubService.initialize(githubToken);

  const repositories = await githubService.getUserRepositories();
  res.json({ repositories });
});

exports.searchRepositories = asyncHandler(async (req, res) => {
  const { query } = req.query;
  const githubToken = req.user.github_access_token;

  githubService.initialize(githubToken);
  const repositories = await githubService.searchRepositories(query);

  res.json({ repositories });
});
