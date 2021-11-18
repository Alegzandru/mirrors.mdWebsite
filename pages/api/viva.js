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

  const {t, eventId} = url.parse(req.url,true).query;
  console.log('t : ', t)
  console.log('eventId : ', eventId)

  const fetchUrl = process.env.NODE_ENV === 'production' ? `https://www.vivapayments.com/api/transactions/${t}` : `https://demo.vivapayments.com/api/transactions/${t}`

  if(t){
    try{
      const transactionDataRaw = await fetch(fetchUrl, options)
      const transactionData = await transactionDataRaw.json()
      console.log(transactionDataRaw)
      console.log(transactionData)

      const {Success, EventId} = transactionData

      console.log(transactionData)

      if(eventId){
        res.redirect(307, `/?status=${Success ? 'success' : 'error'}&eventid=${EventId}`)
      } else{
        res.redirect(307, `/?status=success&eventid=${EventId}`)
      }
      
    } catch(err){
      console.log(err)
      res.redirect(307, `/`)
    }
  } else{
    if(eventId){
      res.redirect(307, `/?status=error&eventid=${eventId}`)
    } else{
      res.redirect(307, `/`)
    }
  }
}