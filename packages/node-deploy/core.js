const { spawn } = require('child_process');
const path = require('path');

const registry = '027416941821.dkr.ecr.ap-southeast-1.amazonaws.com';

const makeExecCommand =
    logger =>
    (cmd, args, options = {}) =>
        new Promise((resolve, reject) => {
            const child = spawn(cmd, args, {
                ...options,
                env: { ...process.env, ...options.env },
            });

            // pipe data
            child.stdout.on('data', data => logger.log(data.toString()));
            child.stderr.on('data', data => logger.log(data.toString()));

            child.on('exit', code => {
                if (code) {
                    reject();
                } else {
                    resolve();
                }
            });
        });

const getImageName = (tag, image) => `${registry}/${image}:${tag}`;

const buildAndPush = ({ directoryName, projectName, imageName, envVersionKey = 'APP_VERSION' }) => {
    // compute paths
    const cwd = path.resolve(__dirname, '..', directoryName);

    const prepare = async (pluginConfig, context) => {
        const { lastRelease, nextRelease, logger } = context;
        const { version, channel } = nextRelease;
        const { version: lastVersion } = lastRelease;

        const execCommand = makeExecCommand(logger);

        // build the application
        logger.log('Webpack %s@%s:', projectName, version);
        await execCommand('yarn', ['build'], {
            cwd,
            env: {
                NODE_ENV: 'production',
                [envVersionKey]: version,
            },
        });

        // get the new image name and its tag
        const versionTag = getImageName(version, imageName);

        try {
            // try to pull previous image
            const previousTag = getImageName(lastVersion, imageName);
            logger.log('Pull previous images from %s', previousTag);
            await execCommand('docker', ['pull', previousTag]);
        } catch (error) {
            // skip it
            logger.log('Could not pull previous image');
        }

        // then build the docker image
        logger.log('Docker building for %s', versionTag);
        await execCommand('docker', ['build', '-t', versionTag, '-f', './Dockerfile', '.'], { cwd });
    };

    const publish = async (pluginConfig, context) => {
        const { nextRelease, logger } = context;
        const { channel } = nextRelease;

        const execCommand = makeExecCommand(logger);

        // push the image on the channel
        const channelTag = getImageName(channel, imageName);
        logger.log('Docker pushing for %s', channelTag);
        await execCommand('docker', ['push', channelTag]);
    };

    return { prepare, publish };
};

module.exports = { buildAndPush };
