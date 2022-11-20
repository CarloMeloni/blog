const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.contactForm = (req, res) => {
    const data = req.body;

    const emailData = {
        to: process.env.EMAIL_TO,
        from: req.body.email,
        subject: `Form di contatto - ${process.env.APP_NAME}`,
        text: `Email ricevuto dal form di contatto \n Inviata da ${req.body.name} - ${req.body.email} \n ${req.body.message}`,
        html: `
            <h4>Email ricevuta dal form di contatto: </h4>
            <p>Inviata da ${req.body.name}</p>
            <p>Email: ${req.body.email}</p>
            <p>Messaggio: ${req.body.message}</p>
            <hr/>
            <p>Questa email può contenere informazioni sensibili</p>
            <pLOCALHOST:3000></p>
        `,
    };

    sgMail.send(emailData).then((sent) => {
        return res.json({
            success: true
        })
    })
} 