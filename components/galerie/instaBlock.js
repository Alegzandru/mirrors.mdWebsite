import { useContext, useEffect, useState } from 'react';
import Image from "next/image"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { DeviceTypeContext } from '../context';
import Link from "next/link"
import {CustomButtonGroupAsArrows3} from "../mainPage/CustomButtonGroup"

export default function InstaBlock ({lang}) {

  const {deviceType, setDeviceType} = useContext(DeviceTypeContext)

  const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1367 },
        items: 3,
        slidesToSlide: 3,
        partialVisibilityGutter: 10
      },
      tablet: {
        breakpoint: { max: 1366, min: 769 },
        items: 2,
        slidesToSlide: 2,
        partialVisibilityGutter: 40
      },
      mobile: {
        breakpoint: { max: 768, min: 0 },
        items: 1,
        slidesToSlide: 1,
        partialVisibilityGutter: 100
      }
  };

  const images = [
    "/instagram/img1.jpg",
    "/instagram/img2.jpg",
    "/instagram/img3.jpg",
    "/instagram/img4.jpg",
    "/instagram/img5.jpg",
    "/instagram/img6.jpg",
    "/instagram/img7.jpg",
    "/instagram/img8.jpg",
    "/instagram/img9.jpg",
    "/instagram/img10.jpg",
    "/instagram/img11.jpg",
    "/instagram/img12.jpg",
  ];

  return (
    <div className="w-full h-auto xl:px-container-xl lg:pt-268px pt-16 lg:pb-224px md:pb-160px pb-120px font-Ubuntu bg-ui-dark overflow-hidden">
      <div className="h-2 gradient-line w-full lg:hidden mb-72px"/>

      <div className="mx-auto text-ui-grey text-lg-p font-medium w-auto text-center mb-6">
        {
          lang == "ro" ? 
          "Urmăriți-ne pe "
          :
          "Подпишитесь на нас в "
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
          />
        </div>
        <div className="font-extrabold text-lg-32 h-12 flex flex-row justify-center items-center gradient-text">
          mirrorsmd
        </div>
      </div>

      <a className="https://www.instagram.com/mirrorsmd/">
        <div className="font-Pacifico gradient-text text-lg-insta mx-auto text-center lg:hidden">
          @mirrorsmd
        </div>
      </a>

      <div className="w-full relative mt-72px">
        <Carousel
          swipeable={true}
          partialVisibile
          deviceType={deviceType}
          itemClass="image-item"
          responsive={responsive}
          infinite
          arrows={false}
          focusOnSelect
          // centerMode={props.deviceType == "mobile" ? 0 : 1}
          centerMode={deviceType != "mobile" ? 1 : 0}
          keyBoardControl
          autoPlay
          autoPlaySpeed={3000}
          draggable
          minimumTouchDrag={80}
          additionalTransfrom={0}
          customButtonGroup={<CustomButtonGroupAsArrows3/>}
          renderButtonGroupOutside
        >
          {images.map((image) => 

              <a href="https://www.instagram.com/mirrorsmd/" target="blank">
                <div className="h-360px relative mx-4 md:mx-2 rounded overflow-hidden group">
                  <div className="w-full h-360px bg-ui-dark z-10">
                    <Image 
                      src={image}
                      layout="fill"
                      objectFit="cover"
                    />
                    {/* <img src={image} className="w-full h-full object-cover"></img> */}
                  </div>
                  <div className="group-hover:opacity-100 opacity-0 bg-instafade flex flex-col justify-center items-center h-full w-full absolute -mt-360px z-20 transition duration-300 text-ui-grey font-medium">
                    <Image
                      src="/branding/instagramWhite.svg"
                      height={36}
                      width={36}
                    />
                    <div className="mt-3">
                      {
                        lang == "ro" ? 
                        "Urmăriți-ne pe Instagram"
                        :
                        "Подпишитесь на нас в Instagram"
                      }
                    </div>
                  </div>
                </div>
              </a>

          )}
        </Carousel>
      </div>
    </div>
  )
  
}