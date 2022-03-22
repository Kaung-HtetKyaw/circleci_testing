module.exports = {
  branches: [
    {
      name: 'stable',
      channel: false,
    },
    {
      name: 'master',
      channel: 'next',
      prerelease: 'next',
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@appvantageasia/afc-node-deploy/deploy-api.js',
    '@appvantageasia/afc-node-deploy/deploy-frontend.js',
    '@semantic-release/github',
  ],
};
