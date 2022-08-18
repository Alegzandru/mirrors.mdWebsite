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
  },

  testClient: async (data) => {
    try {
      await fetch("/api/testClient", {
        "method": "POST",
        "headers": { "content-type": "application/json" },
        "body": JSON.stringify(data)
      })
    }
    catch (error) {
      console.log(error)
    }
  },

  testOwner: async (data) => {
    try {
      await fetch("/api/testOwner", {
        "method": "POST",
        "headers": { "content-type": "application/json" },
        "body": JSON.stringify(data)
      })
    }
    catch (error) {
      console.log(error)
    }
  },
}
