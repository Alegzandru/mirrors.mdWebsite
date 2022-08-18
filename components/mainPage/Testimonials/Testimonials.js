import 'swiper/css';

import Image from 'next/image';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ReviewButtonBack, ReviewButtonNext } from '../CustomButtonGroup';

const nrPhotos = [1, 2, 3, 4, 5, 6]

const Testimonials = () => {

  const swiperRef = useRef();
  const prevSlide = () => swiperRef.current.slidePrev()
  const nextSlide = () => swiperRef.current.slideNext()

  return (
    <div className="w-full font-Ubuntu py-20 md:py-32 lg:py-180px bg-ui-dark relative">
      <Swiper
        spaceBetween={20}
        slidesPerView='auto'
        loop
        centeredSlides
        grabCursor
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="for-active-slide"
      >
        {nrPhotos.map((nr) => <SwiperSlide className="testimonial-photo">
          <div className="w-full h-full instagram-border rounded-2xl relative">
            <div className="w-full h-full relative overflow-hidden rounded-2xl">
              <Image
                src={`/testimonials/${nr}.JPG`}
                layout="fill"
                objectFit="cover"
                alt={'Recenzie'}
              />          
            </div>
            <div className="absolute justify-between top-190px md:top-315px lg:top-382px w-258px md:w-386px lg:w-460px testimonial-buttons -left-5">
              <ReviewButtonBack prevSlide={prevSlide}/>
              <ReviewButtonNext nextSlide={nextSlide}/>
            </div>
          </div>
        </SwiperSlide>)}
      </Swiper>
    </div>
  )
}

export default Testimonials