import 'react-awesome-lightbox/build/style.css';
import 'swiper/css';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Lightbox from 'react-awesome-lightbox';
import { useForm } from 'react-hook-form';
import Scroll from 'react-scroll';
import ReactTooltip from 'react-tooltip';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CartContext } from '../../components/context';
import { coeficientFinder, getSize } from '../../lib/products';
import { getCurrency, getCurrencyString, getPrice, getPriceAddon, isRoDomain } from '../../utils/general';
import DropdownProduct2 from './DropdownProduct2';

var Element = Scroll.Element;

export default function ProductComponent ({ name, images, options, optionVariants, productData, optionsRaw, lang, nameru, nameen, optionsRu, optionsEn}) {
  const roDomain = isRoDomain()
  const router = useRouter()
  const {inStock} = productData

  const [lightboxOpen, setLightboxOpen] = useState(0)
  const imagesLightbox = images.map((image) => {
      return image.src
  })
      
  const [checkout, setCheckout] = useState(false)
  const [openImage, setOpenImage] = useState(0)
  const [textAcrilic, setTextAcrilic] = useState('')
  const [openOptions, setOpenOptions] = useState(true)
  const [currency, setCurrency] = useState(4)

  const addOnName = useMemo(() => lang === 'en' ? 'nameen' : lang === 'nameru' ? 'ru' : 'name', [lang])
  const inStockChosen = optionsRaw.map((option) => option[addOnName])
  const [activeAddons, setActiveAddons] = useState(inStock ? inStockChosen : [])

  const {cart, setCart} = useContext(CartContext)

  const stockProduct = useMemo(() => ({
    price: roDomain ? productData[0].price_ro * currency : productData[0].price,
    height: productData[0].height,
    width: productData[0].width
  }), [productData, roDomain, currency])

  const initialPrice = useMemo(() => {
    if (inStock) {
      return stockProduct.price
    } else return Math.round(getPrice(productData[0], productData[0].defaultsize) * ( 1 + coeficientFinder(productData[0].defaultsize, productData[0], roDomain)))
  }, [inStock, productData, getPrice, coeficientFinder, roDomain, stockProduct])

  const getInitialSize = () => {
    if (inStock) return ({ height: stockProduct.height, width: stockProduct.width})
    else return productData[0].defaultsize
  }

  const [price, setPrice] = useState(initialPrice)

  useEffect(() => {
    if (inStock) setPrice(initialPrice)
  }, [initialPrice])

  const [sizeGlobal, setSizeGlobal] = useState(getInitialSize())

  const emptyTextAcrilic = (textAcrilic === ' ' || !textAcrilic ) && productData[0].category.name === 'Text Acrilic'

  let contorAddons = 1

  const { register, handleSubmit } = useForm();

  const sortBySize = (sizes) => sizes.sort((a, b) => {
    if (a.height * a.width > b.height * b.width) return 1
    if (a.height * a.width < b.height * b.width) return -1
  })

  const customSizes = useMemo(() => {
    if (inStock) return []
    const sorted = sortBySize(productData[0].linkedsizes)
    return sorted.map((size) => {
    return (
      {
        height : size.height,
        width : size.width,
        typename : size.name,
        typenameru : size.name,
        typenameen: size.name,
        price : Math.round(getPrice(productData[0], size) * ( 1 + coeficientFinder(size, productData[0], roDomain)))
      }
    )
  })}, [inStock, sortBySize, productData])

  const inStockSizes = useMemo(() => {
    if (!inStock) return []
    return [({
      height : productData[0].height,
      width : productData[0].width,
      typename : `${productData[0].height}x${productData[0].width}`,
      typenameru : `${productData[0].height}x${productData[0].width}`,
      typenameen: `${productData[0].height}x${productData[0].width}`,
      price : productData[0].price
    })]
  }, [inStock, productData])

  const onSubmit = async (data) => {
    contorAddons = 1
    const addOns = Object.entries(data).filter((addOn) => addOn[1] != null && addOn[1] != false && addOn[0] != "Dimensiuni recomandate")
    let size = productData[0].defaultsize
    size = await getSize(sizeGlobal.height, sizeGlobal.width)

    let addOnsPrice = 0

    let productCart = {
      product : {},
      addOns : [],
      size : size,
      number : 1,
      textAcrilic: textAcrilic,
      price : inStock ? price : Math.round(getPrice(productData[0], size) * ( 1 + coeficientFinder(size, productData[0], roDomain))),
      stock: inStock 
    }

    fetch(`https://mirrors-md-admin.herokuapp.com/products?name_eq=${name}`)
      .then(response => response.json())
      .then(data => {
        productCart.product = data[0]

        if(addOns.length == 0){
          if( cart.length != 0 && productCart.product.name == cart[cart.length - 1].product.name  && cart[cart.length - 1].size.name == `${size.height}x${size.width}` && productCart.textAcrilic == cart[cart.length - 1].textAcrilic && cart[cart.length - 1].price === productCart.price){
            let mutableCart = [...cart]
            mutableCart[mutableCart.length - 1].number += 1
            setCart(
              mutableCart
            )
            if(checkout){
              router.push("/cos/checkout")
            }
          }
          else {
            setCart([
              ...cart,
              productCart
            ])
            if(checkout){
              router.push("/cos/checkout")
            }
          }
        }
        addOns.forEach((addOn, index) => {
            const getAddOnRaw = () => {
              if(addOn[1] == true) {
                return optionsRaw.filter((addOnRaw) => {
                  return addOnRaw.name == addOn[0]
                })
              } else {
                return optionsRaw.filter((addOnRaw) => {
                  return addOnRaw.group == addOn[0] && addOnRaw.typename == addOn[1]
                })
              }
            }

            let addOnRaw = getAddOnRaw()

            if(cart.length == 0){
              contorAddons = 0
            }
            else if(cart[cart.length - 1].addOns.length != addOns.length){
              contorAddons = 0
            }
            else if(cart[cart.length - 1].addOns.length != 0){
              if(addOn[1] == true) {
                if(addOn[0] != cart[cart.length - 1].addOns[index].name){
                  contorAddons = 0
                }
              } else {
                if(addOn[0] != cart[cart.length - 1].addOns[index].group || addOn[1] != cart[cart.length - 1].addOns[index].typename){
                  contorAddons = 0
                }
              }
            }

            if (addOnRaw[0]) {
              productCart.addOns.push(addOnRaw[0])
              if (!inStock) {
                addOnsPrice += getPriceAddon( addOnRaw[0] , productCart.size)
              }
            }

            if (index == addOns.length-1) {
              if( contorAddons && cart[cart.length - 1].size.name == `${size.height}x${size.width}` && productCart.textAcrilic == cart[cart.length - 1].textAcrilic){
                let mutableCart = [...cart]
                mutableCart[mutableCart.length - 1].number += 1
                setCart(
                  mutableCart
                )
                if(checkout){
                  router.push("/cos/checkout")
                }
              }
              else {
                productCart.price += addOnsPrice
                setCart([
                  ...cart,
                  productCart
                ])
                if(checkout){
                  router.push("/cos/checkout")
                }
              }
            }
          }
        )
      }
    )
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    const withCurrency = async () => {
      const currencyStrapi = await getCurrency()
      setCurrency(currencyStrapi)
    }

    withCurrency()
  }, [] )

  return (
    <div className="w-full h-auto px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pt-128px md:pt-136px lg:pt-234px pb-88px md:pb-120px font-Ubuntu bg-ui-darkGrey">
      <div className="flex flex-row justify-start items-center text-lg-14 font-normal text-type-manatee w-auto mb-6">
        <Link href={
          lang == "ro" ? 
          "/" 
          : 
          lang == "ru" ?
          "/ru"
          :
          "/en"
        }>
          <a>
            <span className="mr-1 hover:underline transition duration-300">
              {
                lang == "ro" ?
                "Pagina principală"
                :
                lang == "ru" ?
                "Главная страница"
                :
                "Homepage"
              }
            </span>
          </a>
        </Link>


        {
          !inStock &&
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href={
              lang == "ro" ? 
              `/${productData[0].category.slug}` 
              : 
              lang == "ru" ?
              `/ru/${productData[0].category.slug}`
              :
              `/en/${productData[0].category.slug}`
            }>
              <a>
                <span className="mr-1">
                  {
                    lang=="ro" ?
                    productData[0].category.name
                    :
                    lang == "ru" ?
                    productData[0].category.nameru
                    :
                    productData[0].category.nameen
                  }
                </span>
              </a>
            </Link>
          </>
        }

        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>

        <span>
          {
            lang == "ro" ?
            name
            :
            lang == "ru" ?
            nameru
            :
            nameen
          }
        </span>
      </div>

      <div className="w-full bg-ui-grey flex flex-col lg:flex-row justify-between items-stretch">
        <div className="w-full lg:w-600px xl:w-720px">
          <div className="pb-image-ratio md:pb-0 relative md:h-1050px lg:h-825px w-full cursor-pointer">
            <Image
              src={images[openImage].src}
              layout="fill"
              objectFit="cover"
              alt={name}
              onClick={() => setLightboxOpen(1)}
            />
          </div>
          <div className="w-full relative h-128px md:h-165px mt-6 mb-4 z-10">
            <Swiper
              spaceBetween={16}
              slidesPerView="auto"
              grabCursor
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} className="product-image">
                  <div className="w-128px md:w-165px h-128px md:h-165px px-1">
                    <div 
                      className="w-full h-full relative cursor-pointer"
                      onClick={() => setOpenImage(index)}
                    >
                      <Image
                        src={image.src}
                        layout="fill"
                        objectFit="cover"
                        alt={name}
                      />
                    </div>
                  </div> 
                </SwiperSlide>
              )
              )}
            </Swiper>
          </div>
        </div>

        <div className="w-full lg:w-340px bg-ui-white py-56px px-2 md:px-4">
          {
            inStock ?
            <DropdownProduct2
              name={"Dimensiune:"}
              nameru={"Размеры"}
              nameen={"Sizes"}
              options={inStockSizes}
              register={register}
              setPrice={setPrice}
              price={price}
              sizeGlobal={sizeGlobal}
              setSizeGlobal={setSizeGlobal}
              initialPrice={initialPrice}
              coeficientFinder={coeficientFinder}
              productData={productData[0]}
              lang={lang}
              textAcrilic={textAcrilic}
              setTextAcrilic={setTextAcrilic}
              inStock={inStock}
              optionsRaw={optionsRaw}
            />
          :
            <DropdownProduct2
              name={"Dimensiuni recomandate"}
              nameru={"Рекомендуемые размеры"}
              nameen={"Recommended sizes"}
              options={customSizes}
              register={register}
              setPrice={setPrice}
              price={price}
              sizeGlobal={sizeGlobal}
              setSizeGlobal={setSizeGlobal}
              initialPrice={Math.round(getPrice(productData[0], productData[0].defaultsize) * (1 + coeficientFinder(productData[0].defaultsize, productData[0], roDomain)))}
              minHeight={productData[0].smallestsize.height}
              maxHeight={productData[0].biggestsize.height}
              minWidth={productData[0].smallestsize.width}
              maxWidth={productData[0].biggestsize.width}
              coeficientFinder={coeficientFinder}
              productData={productData[0]}
              lang={lang}
              optionsRaw={optionsRaw}
              textAcrilic={textAcrilic}
              setTextAcrilic={setTextAcrilic}
            />
          }
        </div>

        <div className="w-full lg:w-options-lg xl:w-options-xl pt-6 lg:pt-72px pb-16 px-2 md:px-6 lg:px-8 bg-ui-white lg:bg-ui-grey relative h-full">
          <h2 className="text-sm-h2 md:text-md-h2 lg:text-lg-h2 text-type-dark font-bold mb-5">
            {
              lang == "ro" ?
              name
              :
              lang == "ru" ?
              nameru
              :
              nameen
            }
          </h2>

          <div className="text-lg-32 text-accent-accent mb-12">
            {
              roDomain
              ? currency === 4 
                ? '...'
                : Math.round(price / currency) 
              : price
            } 
            {
              getCurrencyString(lang, roDomain)
            }
          </div>

          {activeAddons.length 
            ? (<div className="text-md-p text-type-grey mb-4">
                <span className="font-bold text-accent-accent">
                  {
                    lang == "ro" ?
                    "Opțiuni alese : "
                    :
                    lang == "ru" ?
                    "Дополнительные опции : "
                    :
                    "Chosen add-ons : "
                  }
                </span>
                {activeAddons.join(', ')}
              </div>)
            : null
          }
          
          <form onSubmit={handleSubmit(onSubmit)} className="">

            {
              <>
                <div 
                  className="w-full cursor-pointer"
                  onClick={() => setOpenOptions(!openOptions)}
                >
                  <div className="w-full flex flex-row justify-between items-center mb-2">
                    <div className="text-sm-h3 font-medium text-type-manatee">
                      {
                        lang == "ro" ?
                        "Opțiuni suplimentare"
                        :
                        lang == "ru" ?
                        "Дополнительные опции"
                        :
                        "Possible add-ons"
                      }
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${openOptions ? "hidden" : "block"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${openOptions ? "block" : "hidden"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </div>

                  <div className={`w-full h-0.5 bg-ui-blueishGrey ${openOptions ? "hidden" : "block"}`}/>
                </div>

                <Element name="test7" className="element" id="containerElement" style={{
                  position: 'relative',
                  height: '508px',
                  overflow: 'scroll',
                  borderRadius: "0px 0px 8px 8px",
                  border : "2px solid #C2D1D9",
                  boxShadow : "0px 2px 6px rgba(0, 0, 0, 0.08)",
                  display : openOptions ? "block" : "none"
                }}>  
                  {options.map((option, index) =>
                    <DropdownProduct2
                      name={option}
                      nameru={optionsRu[index]}
                      nameen={optionsEn[index]}
                      options={optionVariants.filter((optionObj) => optionObj.group == option || optionObj.name == option)}
                      register={register}
                      key={index}
                      setPrice={setPrice}
                      price={price}
                      productData={productData[0]}
                      lang={lang}
                      optionsRaw={optionsRaw}
                      sizeGlobal={sizeGlobal}
                      activeAddons={activeAddons}
                      setActiveAddons={setActiveAddons}
                      inStock={inStock}
                    />
                  )}
                </Element>
              </>
            }

            {
              emptyTextAcrilic ? 
              <div className={`w-full flex flex-col justify-center items-center ${openOptions ? "mt-6" : "mt-56px"}`}>
              
                <div
                className="w-full bg-transparent border-2 rounded-lg border-accent-error p-3 flex flex-row justify-center items-center text-accent-error font-medium mb-6 lg:mb-4"
                >
                {lang == "ro" ? 
                  "Scrieți textul Dvs. în câmpul de mai sus" 
                  : 
                  lang == "ru" ?
                  "Вставьте свой текст в поле выше"
                  :
                  "Insert your text in the field above"   
                }       
                </div>

              </div>
              :
              <div className={`w-full flex flex-col md:flex-row lg:flex-col mdButtons:flex-row justify-between items-center ${openOptions ? "mt-6" : "mt-56px"}`}>
              
                <input 
                  value={
                  lang == "ro" ? 
                  "La pagina de Check-Out" 
                  : 
                  lang == "ru" ?
                  "Оформить заказ"
                  :
                  "To checkout"
                  } 
                  type="submit" 
                  className="w-full bg-transparent border-2 rounded-lg border-accent-accent h-12 flex flex-row justify-center items-center text-accent-accent font-medium mb-6 md:mb-0 hover:bg-accent-transparent transition duration-300 md:mr-4 lg:mr-0 mdButtons:mr-4 cursor-pointer lg:mb-4 mdButtons:mb-0"
                  onClick={() => setCheckout(true)}
                />

                <input 
                  value={
                  lang == "ro" ? 
                  "Adaugă în coș" 
                  : 
                  lang == "ru" ?
                  "Добавить в корзину"
                  :
                  "Add to cart"
                  }
                  type="submit" 
                  className="w-full bg-accent-accent rounded-lg h-12 flex flex-row justify-center items-center text-ui-white font-medium hover:bg-accent-light transition duration-300 cursor-pointer"
                  onClick={() => setCheckout(false)}
                  data-tip={lang == "ro" ? "Produs adăugat la coș" : "Товар добавлен в корзину"}
                  data-event={"click"}
                />

                <ReactTooltip textColor="#FFFFFF" backgroundColor="#111215" clickable/>
              </div>
            }
            
          </form>

          {lightboxOpen 
            ? <Lightbox doubleClickZoom={1.2} images={imagesLightbox} onClose={() => setLightboxOpen(0)} startIndex={openImage} />
            : "" 
          }

        </div>
      </div>
    </div>
  )
}