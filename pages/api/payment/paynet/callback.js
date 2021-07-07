export default function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(400).send({ message: 'Only POST requests allowed' })
      return
    }
  
    const body = JSON.parse(req.body)

    const requestOptionsNotifications = {
        Eventid : body.Eventid,
        EventType : body.EventType,
        EventDate : body.EventDate,
        Payment : {
            ID : body.Payment.ID,
            ExternalID : body.Payment.ExternalID,
            Merchant : body.Payment.Merchant,
            Customer : body.Payment.Customer,
            Amount : body.Payment.Amount,
            StatusDate : body.Payment.StatusDate
        },
        ResultCode : "SUCCESS",
        ResultMessage : "Success Message"
    }

    res.json({
        requestOptionsNotifications
    })
    // the rest of your code
}
  