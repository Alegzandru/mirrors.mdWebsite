export function getPrice(product, size) {
  let price = 0
  product.materials.forEach((material, index) => {
      if(material.type == "ml"){
          price += material.price * (size.height + size.width) * 2 / 1000
      }
      else if(material.type == "m2"){
          price += material.price * size.height * size.width / 1000000
      }
      else{
          price += material.price
      }
  });
  return price
}

export function getPriceAddon(addon, size) {
  let price = 0
  if(addon.type == "ml"){
      price = addon.price * (size.height + size.width) * 2 / 1000
  }
  else if(addon.type == "m2"){
      price = addon.price * size.height * size.width / 1000000
  }
  else{
      price = addon.price
  }

  return Math.round(price)
}

export async function getCurrency(){
  const currencyRes = await fetch('https://mirrors-md-admin.herokuapp.com/currencies?name_eq=ron')
  const currencyRaw = await currencyRes.json()
  const currency = currencyRaw[0].price
  return currency
}

export function getCurrencyString(lang, roDomain){
  return roDomain ? 
    lang == "ro" ?
    " RON"
    :
    lang == "ru" ?
    " рон"
    :
    " RON"
  :
    lang == "ro" ?
    " LEI"
    :
    lang == "ru" ?
    " лей"
    :
    " LEI"
}

export async function getIP(){
  const locationRes = await fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=a519e1244dd94e088f5ba46d11ccedce")
  const location = await locationRes.json()
  const country = location.country.name
	const now = new Date()
  console.log(country, " ", now.getTime())
  return country
}

export function setWithExpiry(key, value, ttl) {
	const now = new Date()

	const item = {
		value: value,
		expiry: now.getTime() + ttl*3600,
	}
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(item))
  }
}

export function getWithExpiry(key) {
  if (typeof window !== 'undefined') {
    const itemStr = localStorage.getItem(key)
    if (!itemStr) {
      return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    return item.value
  }
}

export function isRoDomain(){
  return getWithExpiry('country') === 'Romania'
}