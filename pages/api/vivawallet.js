import { base64Credentials } from "../../utils/general"

export default async function handler(req, res) {

  const {amount, fullName, email} = req.body

  const orderUrl = process.env.NODE_ENV === 'production' ? 'https://vivapayments.com/api/orders' : 'https://demo.vivapayments.com/api/orders'
  
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${base64Credentials()}`
    },
    body: JSON.stringify({
      amount: amount,
      fullName: fullName,
      email: email,
      customerTrns: "Mobilă de pe site-ul mirrors.md",
      requestLang: "ro-RO",
      sourceCode: process.env.NODE_ENV === 'production' ? "2585" : "8346"
    })
  }
  
  const responseRaw = await fetch(orderUrl, options)
  const response = await responseRaw.json()

  console.log(response)
  
  const { OrderCode, ErrorCode, ErrorText, Success } = response
  
  const checkoutUrl = process.env.NODE_ENV === 'production' ? `https://vivapayments.com/web/checkout?ref=${OrderCode}` : `https://demo.vivapayments.com/web/checkout?ref=${OrderCode}`

  if (!Success) {
    return res.status(ErrorCode).json(ErrorText)
  }

  res.status(200).json({ link: checkoutUrl })
}