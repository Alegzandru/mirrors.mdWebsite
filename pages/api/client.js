import sgMail from '@sendgrid/mail'
import { capitalizeFirstLetter, getCurrency } from '../../utils/general';

sgMail.setApiKey(process.env.NEXT_PUBLIC_EMAIL_API_KEY);

export default async (req, res) => {
  const { name, phone, address, email, pret, orders, comentariu, mod_de_plata, mod_de_livrare, country} = req.body

  const mod_de_plata_new = capitalizeFirstLetter(mod_de_plata.replace(/_/g, " "))
  const mod_de_livrare_new = capitalizeFirstLetter(mod_de_livrare.replace(/_/g, " "))

  const is_ro = country === 'Romania' ? "true" : ""
  const currencyStrapi = await getCurrency()
  const pret_ro = Math.round(pret / currencyStrapi)

  const orders_ro = orders.map((order) => ({...order, price: Math.round(order.price / currencyStrapi)}))

  const today = new Date()
  const localOffset = new Date().getTimezoneOffset()
  const localOffsetMillis = 60 * 1000 * localOffset
  const localDate = new Date(today.getTime() + localOffsetMillis)
  const offset = 180
  const estDate = new Date(localDate.getTime() + offset*60*1000)

  const paddedString = (value) => String(value).padStart(2, '0')

  const dd = paddedString(estDate.getDate())
  const mm = paddedString(estDate.getMonth() + 1)
  const yyyy = estDate.getFullYear()
  const date = dd + ' ' + mm + ' ' + yyyy

  const sec = paddedString(estDate.getSeconds())
  const min = paddedString(estDate.getMinutes())
  const hours = paddedString(estDate.getHours())
  const time = hours + ':' + min + ':' + sec

  const msg = {
    from: '<manager.mirrors.md@gmail.com',
    personalizations : [
      {
        to : email,
        dynamic_template_data : {
          subject: 'Vă mulțumim pentru comandă!',
          name : name,
          phone : phone,
          address : address,
          email : email,
          pret : pret,
          comentariu : comentariu,
          mod_de_plata : mod_de_plata_new,
          mod_de_livrare : mod_de_livrare_new,
          orders : orders,
          created_at : time,
          country: country,
          is_ro,
          pret_ro,
          orders_ro
        }
      }
    ],
    template_id : "d-02255ad052ef4a50bec28b879c2562af"
  };

  try {
    await sgMail.send(msg);
    res.json({ message: `Email has been sent` })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}