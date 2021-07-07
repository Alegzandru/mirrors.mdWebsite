import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.NEXT_PUBLIC_EMAIL_API_KEY);

export default async (req, res) => {
  const { name, phone, address, email, pret, orders, comentariu, mod_de_plata, mod_de_livrare, created_at } = req.body

  let created_at_new = created_at.slice(0, created_at.length-5).replace("T", " ")

  console.log(req.body)
  const msg = {
    from: '<manager.mirrors.md@gmail.com',
    personalizations : [
      {
        to : email,
        dynamic_template_data : {
          name : name,
          phone : phone,
          address : address,
          email : email,
          pret : pret,
          comentariu : comentariu,
          mod_de_plata : mod_de_plata,
          mod_de_livrare : mod_de_livrare,
          orders : orders,
          created_at : created_at_new,
        }
      }
    ],
    template_id : "d-be902d4134bd45749ec9e670d542735c"
  };

  try {
    await sgMail.send(msg);
    res.json({ message: `Email has been sent` })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}