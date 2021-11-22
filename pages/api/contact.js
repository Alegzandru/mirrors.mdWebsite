import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.NEXT_PUBLIC_EMAIL_API_KEY);

export default async (req, res) => {
  const { phone, message, nume } = req.body
  
  const msg = {
    from: '<manager.mirrors.md@gmail.com',
    personalizations : [
      {
        to : '<manager.mirrors.md@gmail.com',
        dynamic_template_data : {
          subject : `Mesaj nou de la ${nume} (${phone})`,
          text: message,
          name : nume,
          phone : phone
        }
      }
    ],
    template_id : "d-3f03f76d31f3463aa6bfbb4b425a5d7f"
  };

  try {
    await sgMail.send(msg);
    res.json({ message: `Email has been sent` })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}
