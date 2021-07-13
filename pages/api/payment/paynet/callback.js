export default async (req, res) => {
    if (req.method !== 'POST') {
      res.status(400).send({ message: 'Only POST requests allowed' })
      return
    }
  
    const body = req.body
    console.log(body)
    // const body = JSON.parse(req.body)

    // const requestOptionsNotifications = {
    //     Eventid : body[0].Eventid,
    //     EventType : body[0].EventType,
    //     EventDate : body[0].EventDate,
    //     Payment : {
    //         ID : body[0].Payment.ID,
    //         ExternalID : body[0].Payment.ExternalID,
    //         Merchant : body[0].Payment.Merchant,
    //         Customer : body[0].Payment.Customer,
    //         Amount : body[0].Payment.Amount,
    //         StatusDate : body[0].Payment.StatusDate
    //     },
    //     ResultCode : "SUCCESS",
    //     ResultMessage : "Success Message"
    // }

    try {
        res.status(200).json({
          Eventid : body.Eventid,
          EventType : body.EventType,
          EventDate : body.EventDate,
          Payment : {
              ID : body.Payment.ID,
              ExternalID : body.Payment.ExternalID,
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
  