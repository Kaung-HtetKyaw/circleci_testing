module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@circleci_testing/repo-node-deploy/deploy-api.js',
    '@circleci_testing/repo-node-deploy/deploy-frontend.js',
    ['@semantic-release/github', { success: false, fail: false }],
  ],
};
