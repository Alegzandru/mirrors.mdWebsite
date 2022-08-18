import { base64Credentials } from "../../utils/general"

export default async function handler(req, res) {

  const {amount, fullName, email, phone, roDomain} = req.body

  const tokenUrl = 'https://accounts.vivapayments.com/connect/token'

  const tokenOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${base64Credentials()}`
    },
    body: new URLSearchParams({
      'grant_type': 'client_credentials'
    })
  }

  const tokenRaw = await fetch(tokenUrl, tokenOptions)
  
  const token = await tokenRaw.json()
  const {access_token} = token

  const orderUrl = 'https://api.vivapayments.com/checkout/v2/orders'
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
      'grant_type' : 'client_credentials'
    },
    body: JSON.stringify({
      amount: amount,
      customerTrns: roDomain ? "Mobilă de pe site-ul onemillory.ro" : "Mobilă de pe site-ul www.onemillory.md",
      fullName: fullName,
      customer: {
        email,
        fullName,
        phone
      },
      requestLang: "ro-RO",
      sourceCode: "5801"
    })
  }
  
  const responseRaw = await fetch(orderUrl, options)
  const response = await responseRaw.json()
  
  const { orderCode } = response
    
  const checkoutUrl = `https://www.vivapayments.com/web/checkout?ref=${orderCode}&color=${'515CAE'}`

  if (!orderCode) {
    return res.status(500).json({
      success: false,
      link: '',
      errorMessage: 'Missing orderCode'
    })
  }

  res.status(200).json({ 
    success: true,
    link: checkoutUrl,
    errorMessage: ''
  })
}