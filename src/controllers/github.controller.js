const GitHubService = require('../services/github.service');
const asyncHandler = require('../utils/asyncHandler');

exports.getRepositories = asyncHandler(async (req, res) => {
  try {
    const githubService = new GitHubService(req.user.githubToken);
    const repositories = await githubService.getUserRepositories();
    res.json(repositories);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

exports.searchRepositories = asyncHandler(async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const githubService = new GitHubService(req.user.githubToken);
    const repositories = await githubService.searchUserRepositories(query);
    res.json(repositories);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

exports.getRepository = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const githubService = new GitHubService(req.user.githubToken);
    const repository = await githubService.getRepository(id);
    res.json(repository);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
