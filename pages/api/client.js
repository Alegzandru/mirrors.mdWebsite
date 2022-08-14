import ReactPDF from '@react-pdf/renderer';
import sgMail from '@sendgrid/mail'
import { BlancComanda } from '../../components/email/blanc-comanda';
import { CertificatGarantie } from '../../components/email/certificat-garantie';
import { capitalizeFirstLetter, getCurrency } from '../../utils/general';

sgMail.setApiKey(process.env.NEXT_PUBLIC_EMAIL_API_KEY);

const stream2buffer = async(stream) => {
  return new Promise((resolve, reject) => {
    const buf = Array()
    stream.on('data', (chunk) => buf.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(buf)))
    stream.on('error', (err) => reject(new Error(`error converting stream - ${err}`)))
  })
}

export default async (req, res) => {
  const { data, orders, country} = req.body
  const { name, phone, address, email, pret, comentariu, mod_de_plata, mod_de_livrare} = data

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
  const nextmm = paddedString(estDate.getMonth() + 2)
  const yyyy = estDate.getFullYear()
  const date = dd + ' ' + mm + ' ' + yyyy
  const executionDate = dd + ' ' + nextmm + ' ' + yyyy

  const id = mm+dd+email

  const sec = paddedString(estDate.getSeconds())
  const min = paddedString(estDate.getMinutes())
  const hours = paddedString(estDate.getHours())
  const time = hours + ':' + min + ':' + sec

  try {
    console.log('gets to comanda')
    let comandaRaw = await ReactPDF.renderToStream(<BlancComanda data={{...data, date, executionDate, id}} orders={orders}/>)
    const comanda = await stream2buffer(comandaRaw)

    console.log('gets after is made into buffer')

    const certificate = await Promise.all(orders.map(async(order, index) => {
      let garantieRaw = await ReactPDF.renderToStream(<CertificatGarantie data={{...data, date, executionDate, id}} order={order}/>)
      const garantie = await stream2buffer(garantieRaw)
      return ({
        content: garantie.toString('base64'),
        filename: `garantie(${index+1}).pdf`,
        type: "application/pdf",
        disposition: "attachment"
      })
    }))

    const attachments = [{
      content: comanda.toString('base64'),
      filename: "blanc-comanda.pdf",
      type: "application/pdf",
      disposition: "attachment"
    }, ...certificate]

    const msg = {
      from: 'manager.mirrors.md@gmail.com',
      to: "alexandru.codreanu.04@gmail.com",
      subject: "Test message subject",
      text: "Hello world!",
      html: "<b>Hello world!</b>",
      attachments,
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
    await sgMail.send(msg);
    res.json({ message: `Email has been sent` })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}