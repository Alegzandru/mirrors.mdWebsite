export const coeficientFinder = (size, product, roDomain) => {
  if(roDomain){
    if(size.width < product.medium_size && size.height < product.medium_size){
      return product.smallcoeficient_ro
    }
    else if(size.width < product.big_size && size.height < product.big_size) {
      return product.mediumcoeficient_ro
    }
    else {
      return product.bigcoeficient_ro
    }
  } else {
    if(size.width < product.medium_size && size.height < product.medium_size){
      return product.smallcoeficient
    }
    else if(size.width < product.big_size && size.height < product.big_size) {
      return product.mediumcoeficient
    }
    else {
      return product.bigcoeficient
    }
  }
}

export const getSize = async (height, width) => {
  const sizeRaw = await fetch(`https://mirrors-md-admin.herokuapp.com/sizes?name_eq=${height}x${width}`)
  const size = await sizeRaw.json()
  if (size.length) return size[0]
  else {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name : `${height}x${width}`,
        height : height,
        width : width
      })
    };
    const newSizeRaw = await fetch(`https://mirrors-md-admin.herokuapp.com/sizes`, requestOptions)
    const newSize = await newSizeRaw.json()
    return newSize
  }
}