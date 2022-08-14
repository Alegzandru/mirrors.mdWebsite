import ReactPDF from "@react-pdf/renderer";
import { BlancComanda } from "../../components/email/blanc-comanda";
import { BlancProducere } from "../../components/email/blanc-producere";
import { FoaieOglinda } from "../../components/email/foaie-oglinda";
import { stream2buffer } from "../../utils/general";

export default async (req, res) => {
  try {
    const {data, orders} = req.body
    const nodemailer = require("nodemailer");

    let transporter = nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: "apikey",
        pass: process.env.NEXT_PUBLIC_EMAIL_API_KEY
      }, 
    })

    const comandaRaw = await ReactPDF.renderToStream(<BlancComanda data={data} orders={orders}/>)
    const comanda = await stream2buffer(comandaRaw)

    const foiProducere = await Promise.all(orders.map(async(order, index) => {
      const fileRaw = await ReactPDF.renderToStream(<FoaieOglinda data={data} order={order}/>)
      const file = await stream2buffer(fileRaw)
      const name = `foaie-producere(${index+1}).pdf`
  
      return ({
        content: file,
        filename: name,
        type: "application/pdf",
        disposition: "attachment"
      })
    }))

    const blancuriProducere = await Promise.all(orders.map(async(order, index) => {
      const fileRaw = await ReactPDF.renderToStream(<BlancProducere data={data} order={order}/>)
      const file = await stream2buffer(fileRaw)
      const name = `blanc-producere(${index+1}_.pdf`
  
      return ({
      content: file,
      filename: name,
      type: "application/pdf",
      disposition: "attachment"
    })}))

    const attachments = [{
        content: comanda,
        filename: "blanc-comanda.pdf",
        type: "application/pdf",
        disposition: "attachment"
      }, ...foiProducere, ...blancuriProducere,]

    transporter.sendMail({
      from: "manager.mirrors.md@gmail.com",
      to: "alexandru.codreanu.04@gmail.com",
      subject: "Test message subject",
      text: "Hello world!",
      html: "<b>Hello world!</b>",
      attachments
    }, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.json({ foiProducere })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}