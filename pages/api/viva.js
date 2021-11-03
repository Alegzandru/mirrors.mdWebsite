import { base64Credentials } from '../../utils/general'

const url = require('url')

export default async function handler(req, res) {
  
  if(req.method !== 'GET') {
    res.status(400).send({ message: 'Only GET requests allowed' })
    return
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${base64Credentials()}`
    }
  }

  const {t} = url.parse(req.url,true).query;

  if(t){
    try{
      const transactionDataRaw = await fetch(`https://demo.vivapayments.com/api/transactions/${t}`, options)
      const transactionData = await transactionDataRaw.json()

      const {Success, EventId} = transactionData

      console.log(transactionData)

      res.redirect(307, `/?status=${Success ? 'success' : 'error'}&eventid=${EventId}`)
    } catch(err){
      console.log(err)
      res.redirect(307, `/`)
    }
  } else{
    res.redirect(307, `/`)
  }
}