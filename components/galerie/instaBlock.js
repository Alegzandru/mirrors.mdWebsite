import 'swiper/css';

import Image from 'next/image';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { images } from '../../constants/instagram';
import { ButtonBack, ButtonNext } from '../mainPage/CustomButtonGroup';

export default function InstaBlock ({lang}) {

  const swiperRef = useRef();
  const prevSlide = () => swiperRef.current.slidePrev()
  const nextSlide = () => swiperRef.current.slideNext()

  return (
    <div className="w-full h-auto lg:pt-268px pt-16 lg:pb-224px md:pb-160px pb-120px font-Ubuntu bg-ui-dark overflow-hidden">
      <div className="h-2 gradient-line w-full lg:hidden mb-72px"/>

      <div className="mx-auto text-ui-grey text-lg-p font-medium w-auto text-center mb-6">
        {
          lang == "ro" ? 
          "Urmăriți-ne pe "
          :
          lang == "ru" ?
          "Подпишитесь на нас в "
          :
          "Follow us on "
        }
        <span>
          <a 
            className="font-normal underline"
            href="https://www.instagram.com/mirrorsmd/"
            target="blank"
          >
            Instagram
          </a>
        </span>
      </div>
      
      <div className="flex-row justify-center items-center hidden lg:flex">
        <div className="h-12 flex flex-row justify-center items-center mr-4">
          <Image
            height={24}
            width={24}
            src="/branding/instagram2.svg"
            alt="Instagram logo"
          />
        </div>
        <div className="font-extrabold text-lg-32 h-12 flex flex-row justify-center items-center gradient-instagram">
          mirrorsmd
        </div>
      </div>

      <a className="https://www.instagram.com/mirrorsmd/">
        <div className="font-Pacifico gradient-instagram text-lg-insta mx-auto text-center lg:hidden">
          @mirrorsmd
        </div>
      </a>

      <div className="w-full mt-72px relative">
        <Swiper
          spaceBetween={16}
          slidesPerView='auto'
          loop
          centeredSlides
          grabCursor
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="product-card">
              <a href="https://www.instagram.com/mirrorsmd/" target="blank">
                <div className="h-360px relative rounded overflow-hidden group">
                  <div className="h-360px bg-ui-dark z-10 relative">
                    <Image 
                      src={image}
                      layout="fill"
                      objectFit="cover"
                      alt="Millory instagram photo"
                    />
                  </div>
                  <div className="group-hover:opacity-100 opacity-0 bg-instafade flex flex-col justify-center items-center h-full w-full absolute -mt-360px z-20 transition duration-300 text-ui-grey font-medium">
                    <Image
                      src="/branding/instagramWhite.svg"
                      height={36}
                      width={36}
                      alt="Instagram logo"
                    />
                    <div className="mt-3">
                      {
                        lang == "ro" ? 
                        "Urmăriți-ne pe Instagram"
                        :
                        lang == "ru" ?
                        "Подпишитесь на нас в Instagram"
                        :
                        "Follow us on Instagram"
                      }
                    </div>
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="w-full flex justify-between items-center px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl mt-8">
          <ButtonBack prevSlide={prevSlide}/>
          <ButtonNext nextSlide={nextSlide}/>
        </div>
      </div>
    </div>
  )
  
}