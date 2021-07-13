export default async (req, res) => {
    if (req.method !== 'POST') {
      res.status(400).send({ message: 'Only POST requests allowed' })
      return
    }
  
    const body = req.body
    console.log(body)

    try {
        res.status(200).json({
          Eventid : body.Eventid,
          EventType : body.EventType,
          EventDate : body.EventDate,
          Payment : {
              Id : body.Payment.Id,
              ExternalId : body.Payment.ExternalId,
              Merchant : body.Payment.Merchant,
              Customer : body.Payment.Customer,
              StatusDate : body.Payment.StatusDate,
              Amount : body.Payment.Amount
          }
        })
    } catch (error) {
      res.status(500).json({ error: error })
    }
}