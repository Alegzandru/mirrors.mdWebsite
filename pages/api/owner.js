import ReactPDF from '@react-pdf/renderer';
import sgMail from '@sendgrid/mail'
import { BlancComanda } from '../../components/email/blanc-comanda';
import { BlancProducere } from '../../components/email/blanc-producere';
import { FoaieOglinda } from '../../components/email/foaie-oglinda';
import { capitalizeFirstLetter, getCurrency, stream2buffer } from '../../utils/general';

sgMail.setApiKey(process.env.NEXT_PUBLIC_EMAIL_API_KEY);

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

  const comandaRaw = await ReactPDF.renderToStream(<BlancComanda data={{...data, date, executionDate, id}} orders={orders}/>)
  const comanda = await stream2buffer(comandaRaw)

  const foiProducere = await Promise.all(orders.map(async(order, index) => {
    const fileRaw = await ReactPDF.renderToStream(<FoaieOglinda data={{...data, id}} order={order}/>)
    const file = await stream2buffer(fileRaw)
    const name = `foaie-producere(${index+1}).pdf`

    return ({
      content: file.toString('base64'),
      filename: name,
      type: "application/pdf",
      disposition: "attachment"
    })
  }))

  const blancuriProducere = await Promise.all(orders.map(async(order, index) => {
    const fileRaw = await ReactPDF.renderToStream(<BlancProducere data={{...data, date, executionDate, id}} order={order}/>)
    const file = await stream2buffer(fileRaw)
    const name = `blanc-producere(${index+1}).pdf`

    return ({
    content: file.toString('base64'),
    filename: name,
    type: "application/pdf",
    disposition: "attachment"
  })}))

  const attachments = [{
      content: comanda.toString('base64'),
      filename: "blanc-comanda.pdf",
      type: "application/pdf",
      disposition: "attachment"
    }, ...foiProducere, ...blancuriProducere,]

  const msg = {
    from: 'manager.mirrors.md@gmail.com',
    attachments,
    personalizations : [
      {
        to : 'manager.mirrors.md@gmail.com',
        dynamic_template_data : {
          subject: `Comandă nouă (Nume: ${name}, telefon: ${phone}, email: ${email})`,
          name : name,
          phone : phone,
          address : address,
          email : email,
          pret : pret,
          comentariu : comentariu,
          mod_de_plata : mod_de_plata_new,
          mod_de_livrare : mod_de_livrare_new,
          orders : orders,
          created_at : date+" "+time,
          country: country,
          is_ro,
          pret_ro,
          orders_ro
        }
      },
      {
        to : 'millory.ro@gmail.com',
        dynamic_template_data : {
          subject: `Comandă nouă (Nume: ${name}, telefon: ${phone}, email: ${email})`,
          name : name,
          phone : phone,
          address : address,
          email : email,
          pret : pret,
          comentariu : comentariu,
          mod_de_plata : mod_de_plata_new,
          mod_de_livrare : mod_de_livrare_new,
          orders : orders,
          created_at : date+" "+time,
          country: country,
          is_ro,
          pret_ro,
          orders_ro
        }
      }
    ],
    template_id : "d-6ee1285df8ea4662a3264399a492a7ea"
  };

  try {
    await sgMail.send(msg);
    res.json({ message: `Email has been sent` })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}