/* eslint-disable global-require */
const { Octokit } = require('octokit');
const simpleGit = require('simple-git');

console.log(process.env.GH_TOKEN);

const execute = async () => {
    // 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
    const ghToken = process.env.GH_TOKEN;

    if (!ghToken) {
        throw new Error('GitHub token is required');
    }

    const octokit = new Octokit({ auth: ghToken });
    const git = simpleGit();

    const { current } = await git.status();

    const parts = current.split('/');
    const channelName = parts.length === 2 ? parts[1] : parts[0];
    const containsOnlyAlpha = !/^[a-z]+$/.test(channelName);

    if (parts[0] === 'stg' && parts.length !== 2 && !containsOnlyAlpha) {
        throw new Error('Branch not matching expectations');
    }

    if (!/^[a-z]+$/.test(channelName)) {
        throw new Error('Branch not matching expectations');
    }

    const channel = `0.0.0-${channelName}`;

    const {
        all: [head, previousCommit],
    } = await git.log({ from: '@~2', to: '@' });

    const context = {
        // build up last release meta
        lastRelease: {
            version: `${channel}.${previousCommit.hash}`,
            gitHead: previousCommit.hash,
            channel,
        },

        // do the same with the next release
        nextRelease: {
            version: `${channel}.${head.hash}`,
            gitHead: head.hash,
            channel,
        },

        // use the console as a logger
        logger: console,
    };

    const steps = [require('./deploy-api'), require('./deploy-frontend')];

    // first prepare
    await steps.reduce((promise, step) => {
        return promise.then(() => step.prepare({}, context));
    }, Promise.resolve());

    // then publish
    await steps.reduce((promise, step) => {
        return promise.then(() => step.publish({}, context));
    }, Promise.resolve());

    const tagName = `v${context.nextRelease.version}`;

    // create the tag with GitHub
    await octokit.rest.git.createTag({
        owner: process.env.USERNAME,
        repo: process.env.REPO_NAME,
        tag: tagName,
        object: head.hash,
        type: 'commit',
        tagger: { name: 'kaunghtetkyaw', email: 'kaunghtetkyaw02749@gmail.com' },
        message: '',
    });

    // then create a GitHub release
    await octokit.rest.repos.createRelease({
        owner: process.env.USERNAME,
        repo: process.env.REPO_NAME,
        name: tagName,
        tag_name: tagName,
        prerelease: true,
    });
};

execute()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
