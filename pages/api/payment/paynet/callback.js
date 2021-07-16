export default async (req, res) => {
    if (req.method !== 'POST') {
      res.status(400).send({ message: 'Only POST requests allowed' })
      return
    }
  
    const body = req.body
    console.log(body)
    console.log("body.EventType == 'Paid' ",body.EventType == 'PAID')

    if(body.EventType == 'PAID'){
      fetch(`https://mirrors-md-admin.herokuapp.com/clients/${body.Payment.id}`, 
        {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status_plata : "platit"
          })
        }
      )
      .then(response => response.json())
      .then(data => console.log(data))
      
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
        console.log('Error inside PAID EventType')
        res.status(500).json({ error: error })
      }
    }
    else{
      console.log('Error outside PAID EventType')
      res.status(400).json({error: "Wrong request"})
    }
}