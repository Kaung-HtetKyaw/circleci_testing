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
        { from: process.env.NOTIFY_SMTP_IDENTITY }
    );

    await transport.sendMail({
        to: 'speed02749@gmail.com',
        subject: name,
        html,
    });
};

module.exports = { publish };
