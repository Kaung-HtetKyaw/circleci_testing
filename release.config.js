module.exports = {
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    {
      name: 'stable',
      channel: false,
    },
    {
      name: 'main',
      channel: 'next',
      prerelease: 'next',
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@circleci_testing/repo-node-deploy/deploy-api.js',
    '@circleci_testing/repo-node-deploy/deploy-frontend.js',
    ['@semantic-release/github', { success: false, fail: false }],
  ],
  repositoryUrl: 'https://github.com/Kaung-HtetKyaw/circleci_testing',
};
