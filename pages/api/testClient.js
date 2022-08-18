import ReactPDF from "@react-pdf/renderer";
import { BlancComanda } from "../../components/email/blanc-comanda";
import { CertificatGarantie } from "../../components/email/certificat-garantie";
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

    let comandaRaw = await ReactPDF.renderToStream(<BlancComanda data={data} orders={orders}/>)
    const comanda = await stream2buffer(comandaRaw)

    const certificate = await Promise.all(orders.map(async(order, index) => {
      let garantieRaw = await ReactPDF.renderToStream(<CertificatGarantie data={data} order={order}/>)
      const garantie = await stream2buffer(garantieRaw)  
      return ({
        content: garantie,
        filename: `garantie(${index+1}).pdf`,
        type: "application/pdf",
        disposition: "attachment"
      })
    }))

    const attachments = [{
      content: comanda,
      filename: "blanc-comanda.pdf",
      type: "application/pdf",
      disposition: "attachment"
    }, ...certificate,]

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

    res.json({ message: 'Email has been sent' })
  } catch (error) {
    res.status(500).json({ error: error })
  }
}