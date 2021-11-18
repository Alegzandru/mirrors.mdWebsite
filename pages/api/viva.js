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

  const {t, eventIdStr} = url.parse(req.url,true).query;
  const eventId = parseInt(eventIdStr)
  
  console.log('t : ', t)
  console.log('eventId : ', eventId)

  const fetchUrl = process.env.NODE_ENV === 'production' ? `https://www.vivapayments.com/api/transactions/${t}` : `https://demo.vivapayments.com/api/transactions/${t}`

  if(t){
    try{
      const transactionDataRaw = await fetch(fetchUrl, options)
      const transactionData = await transactionDataRaw.json()
      console.log(transactionData)

      const {Success} = transactionData

      if(eventId !== 0){
        res.redirect(307, `/?status=${Success ? 'success' : 'error'}&eventid=${eventId}`)
      } else{
        res.redirect(307, `/?status=success&eventid=${eventId}`)
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