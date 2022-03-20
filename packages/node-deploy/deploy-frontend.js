module.exports = require('./core').buildAndPush({
    directoryName: 'frontend',
    projectName: 'frontend',
    imageName: 'repo-frontend',
    envVersionKey: 'APP_VERSION',
});
