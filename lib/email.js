export const email = {
  owner : async (data) => {
    try {
      await fetch("/api/owner", {
        "method": "POST",
        "headers": { "content-type": "application/json" },
        "body": JSON.stringify(data)
      })
    } 
    catch (error) {
      console.log(error)
    }
  },

  client : async (data) => {
    try {
      await fetch("/api/client", {
        "method": "POST",
        "headers": { "content-type": "application/json" },
        "body": JSON.stringify(data)
      })
    } 
    catch (error) {
      console.log(error)
    }
  },

  contact : async (data) => {
    try {
      await fetch("/api/contact", {
        "method": "POST",
        "headers": { "content-type": "application/json" },
        "body": JSON.stringify(data)
      })
    }
    catch (error) {
      console.log(error)
    }
  }
}