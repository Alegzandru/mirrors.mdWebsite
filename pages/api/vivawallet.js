import { base64Credentials } from "../../utils/general"

export default async function handler(req, res) {

  const {amount, fullName, email} = req.body

  const orderUrl = 'https://demo.vivapayments.com/api/orders'
  
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
      sourceCode: "8346"
    })
  }
  
  const response = await fetch(orderUrl, options)
  
  const { OrderCode, ErrorCode, ErrorText, Success } = await response.json()
  
  const checkoutUrl = `https://demo.vivapayments.com/web/checkout?ref=${OrderCode}`

  if (!Success) {
    return res.status(ErrorCode).json(ErrorText)
  }

  res.status(200).json({ link: checkoutUrl })
}