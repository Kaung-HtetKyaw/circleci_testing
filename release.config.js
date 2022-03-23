module.exports = {
  branches: ['main', 'stable', 'next'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@circleci_testing/repo-node-deploy/deploy-api.js',
    '@circleci_testing/repo-node-deploy/deploy-frontend.js',
    '@circleci_testing/repo-node-deploy/notify.js',
    '@semantic-release/github',
  ],
};
