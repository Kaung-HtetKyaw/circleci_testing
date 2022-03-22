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
    '@appvantageasia/afc-node-deploy/deploy-api.js',
    '@appvantageasia/afc-node-deploy/deploy-frontend.js',
    '@semantic-release/github',
  ],
};
