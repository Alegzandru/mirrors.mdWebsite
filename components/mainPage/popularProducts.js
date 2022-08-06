import 'swiper/css';

import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getCurrency, getCurrencyString, getPrice, isRoDomain } from '../../utils/general';
import { DeviceTypeContext } from '../../components/context';
import { ButtonBack, ButtonNext } from './CustomButtonGroup';

export default function PopularProducts(props){
  const [currency, setCurrency] = useState(4)

  const roDomain = isRoDomain()
  const swiperRef = useRef();
  const prevSlide = () => swiperRef.current.slidePrev()
  const nextSlide = () => swiperRef.current.slideNext()

  useEffect(() => {
    const withCurrency = async () => {
    const currencyStrapi = await getCurrency()
    setCurrency(currencyStrapi)
    }
  
    withCurrency()
  }, [] )

  const {deviceType, setDeviceType} = useContext(DeviceTypeContext)
      
  return(
    <div className="h-auto bg-ui-darkGrey pt-24 md:pt-24 pb-12 lg:pt-230px lg:pb-156px flex flex-col md:flex-row justify-between items-center font-Ubuntu xl:pl-container-xl">
      <div className="text-center ml-container-sm mr-container-sm md:text-left md:ml-container-md w-full md:w-348px lg:ml-container-lg lg:w-382px">
        <h2 className="w-full font-bold text-type-dark text-sm-h2 lg:text-lg-h2 md:text-md-h2 tracking-tighter">
          {
            props.lang == "ro" ? 
            "Produse populare"
            :
            props.lang == "ru" ?
            "Популярные товары"
            :
            "Popular products"
          }
        </h2>

        <p className="mt-5 font-normal lg:text-lg-p md:text-md-p text-type-manatee w-full px-container-sm md:px-0">
          {
            props.lang == "ro" ? 
            "Site-ul nostru conține o gamă largă de oglinzi, printre care cu siguranță o veți găsi pe cea potrivită."
            :
            props.lang == "ru" ?
            "На нашем сайте представлен широкий выбор зеркал, среди которых вы обязательно найдете подходящее."
            :
            "Our website contains a wide range of mirrors, among which you will surely find the right one."
          }
        </p>

        <Link href={props.lang == "ro" ? "/oglinzi" : "/ru/oglinzi"}>
          <a>
            <div className="hidden w-238px h-12 md:flex flex-row justify-center items-center text-ui-white mt-12 rounded-lg font-medium bg-accent-accent hover:bg-accent-light transition duration-300">
              {
                props.lang == "ro" ? 
                "Află ce este în TREND"
                :
                props.lang == "ru" ?
                "Узнайте, что в ТРЕНДЕ"
                :
                "Find out what is trending"
              }
            </div>
          </a>
        </Link>

        <div className="w-24 justify-between items-center mt-14 hidden md:flex">
          <ButtonBack prevSlide={prevSlide}/>
          <ButtonNext nextSlide={nextSlide}/>
        </div>

      </div>
      
      <div className="produseWidth">
        <Swiper
          spaceBetween={16}
          slidesPerView="auto"
          loop
          centeredSlides={deviceType === 'mobile' ? true : false}
          grabCursor
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {props.products.map((product, index) => {
            return (
              index < 6 &&
                <SwiperSlide key={index} className="product-card">
                  <Link href={
                    props.lang == "ro" ? 
                    `/produse/${product.slug}` 
                    : 
                    props.lang == "ru" ?
                    `/ru/produse/${product.slug}`
                    :
                    `/en/produse/${product.slug}`
                  }>
                    <a>
                      <div className="bg-ui-white rounded-xl p-5 border-2 border-transparent hover:border-accent-accent transition duration-300 group">
                        <div className="w-auto pb-image-ratio lg:pb-lg-image-ratio relative rounded-xl transform group-hover:scale-105 transition duration-300">
                          <Image
                            draggable={false}
                            src={product.image.length === 0 ? "/product/placeholder.png" : product.image[0].formats.medium.url}
                            layout="fill"
                            objectFit="cover"
                            alt={product.name}
                          />
                        </div>
                        <div className="text-sm-card-name md:text-lg-card-name-bold text-type-dark mt-6 md:mt-8 font-medium">
                          {
                            props.lang == "ro" ?
                            product.name
                            :
                            props.lang == "ru" ?
                            product.nameru
                            :
                            product.nameen
                          }
                        </div>
                        <div className={`text-sm-p md:text-lg-p text-type-manatee font-normal mt-2 ${product.seria != null ? "" : "opacity-0"}`}>
                          {
                            props.lang == "ro" ?
                            `Seria ${product.seria}`
                            :
                            props.lang == "ru" ?
                            `Серия ${product.seria}`
                            :
                            `${product.seria} series`
                          }
                        </div>
                        <div className="text-sm-button md:text-lg-17 text-accent-accent font-medium mt-4 md:mt-6">
                          {
                            props.lang == "ro" ? 
                            "de la "
                            :
                            props.lang == "ru" ?
                            "от "
                            :
                            "from "
                          }
                          {
                            roDomain ?
                            currency === 4 ?
                            '...' :
                            Math.round( getPrice(product, product.smallestsize) * (1 + product.smallcoeficient_ro) / currency ) 
                            :
                            Math.round( getPrice(product, product.smallestsize) * (1 + product.smallcoeficient) ) 
                          }
                          {
                            getCurrencyString(props.lang, roDomain)
                          }
                        </div>
                      </div>
                    </a>
                  </Link>
                </SwiperSlide>
              );
            })
          }
        </Swiper>
      </div>
      <div className="md:hidden px-container-sm block w-full">
        <Link href={
          props.lang == "ro" ? 
          "/oglinzi" 
          : 
          props.lang == "ru" ?
          "/ru/oglinzi"
          :
          "/en/oglinzi"
        }>
          <a>
            <div className="w-full h-12 flex flex-row justify-center items-center bg-accent-accent mt-8 text-ui-white rounded-lg focus:bg-accent-light">
              {
                props.lang == "ro" ? 
                "Află ce este în TREND"
                :
                props.lang == "ru" ?
                "Узнайте, что в ТРЕНДЕ"
                :
                "Find out what is trending"
              }
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}