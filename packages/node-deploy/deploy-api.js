module.exports = require('./core').buildAndPush({
    directoryName: 'api',
    projectName: 'api',
    imageName: 'repo-api',
    envVersionKey: 'APP_VERSION',
});
