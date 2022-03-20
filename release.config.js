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
    '@appvantageasia/afc-node-deploy/deploy-service-pdf.js',
    '@appvantageasia/afc-node-deploy/deploy-web-api.js',
    '@appvantageasia/afc-node-deploy/deploy-web-ci.js',
    '@appvantageasia/afc-node-deploy/deploy-web-admin.js',
    '@appvantageasia/afc-node-deploy/deploy-mock-hlf.js',
    '@appvantageasia/afc-node-deploy/notify.js',
    '@semantic-release/github',
  ],
};
