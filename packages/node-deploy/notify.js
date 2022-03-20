const { createTransport } = require('nodemailer');
const showdown = require('showdown');

const publish = async (pluginConfig, context) => {
    const { nextRelease } = context;
    const { name, notes } = nextRelease;

    const converter = new showdown.Converter();
    const html = converter.makeHtml(notes);

    const transport = createTransport(
        {
            host: 'email-smtp.ap-southeast-1.amazonaws.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.NOTIFY_SMTP_USERNAME,
                pass: process.env.NOTIFY_SMTP_PASSWORD,
            },
        },
        { from: 'no-reply@services.appvantage.co' }
    );

    await transport.sendMail({
        to: 'Releases - AFC <314a544b.appvantage.co@apac.teams.ms>',
        subject: name,
        html,
    });
};

module.exports = { publish };
