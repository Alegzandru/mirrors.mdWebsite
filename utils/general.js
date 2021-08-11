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

  return Math.trunc(price)
}
