import DropdownProduct from "./DropdownProduct"
import { useForm } from "react-hook-form";
import Image from "next/image"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {useState} from "react"

export default function ProductComponent ({options, optionVariants, deviceType, name, price, images}) {

    console.log(name)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [openImage, setOpenImage] = useState(0)

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1367 },
          items: 4,
          slidesToSlide: 4,
          partialVisibilityGutter: 40
        },
        tablet: {
          breakpoint: { max: 1366, min: 769 },
          items: 4,
          slidesToSlide: 4,
          partialVisibilityGutter: 40
        },
        mobile: {
          breakpoint: { max: 768, min: 0 },
          items: 2,
          slidesToSlide: 2,
          partialVisibilityGutter: 100
        }
    };

    return (
        <div className="w-full h-auto px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pt-128px md:pt-136px lg:pt-234px pb-120px font-Ubuntu bg-ui-darkGrey">
            <div className="flex flex-row justify-start items-center text-lg-14 font-normal text-type-manatee w-auto mb-6">
                <span className="mr-1">
                    Pagina principală
                </span>

                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>

                <span className="mr-1">
                    Category
                </span>

                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>

                <span>
                    {name}
                </span>
            </div>

            <div className="w-full bg-ui-grey flex flex-col lg:flex-row justify-between items-start">
                <div className="w-full lg:w-photos">
                    <div className="relative h-288px md:h-720px lg:h-608px w-full">
                        <Image
                            src={images[openImage].src}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="w-full relative h-128px mt-6 mb-4 z-10">
                        <Carousel
                            swipeable={true}
                            ssr
                            partialVisibile
                            deviceType={deviceType}
                            responsive={responsive}
                            infinite
                            arrows={true}
                            focusOnSelect
                            itemClass="image-item"
                        >
                            {images.map((image, index) =>
                                <div key={index} className="w-full px-1">
                                    <div 
                                        className="w-full h-128px relative cursor-pointer"
                                        onClick={() => setOpenImage(index)}
                                    >
                                        <Image
                                            src={image.src}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                </div> 
                            )}
                        </Carousel>
                    </div>
                </div>

                <div className="w-full lg:w-640px pt-6 lg:pt-72px pb-16 px-2 md:px-6 lg:px-40px bg-ui-white relative h-full">
                    <h2 className="text-sm-h2 md:text-md-h2 lg:text-lg-h2 text-type-dark font-bold mb-5">
                        {name}
                    </h2>

                    <div className="text-lg-card-price text-accent-accent mb-12">
                        {price} Lei
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="">
                        {options.map((option, index) =>
                            <DropdownProduct
                                name={option}
                                options={optionVariants}
                                register={register}
                                key={index}
                            />
                        )}

                        <div className="w-full flex flex-col md:flex-row justify-between items-center mt-14">

                            <input value="La pagina de Check-Out" type="submit" className="w-full bg-transparent border-2 rounded-lg border-accent-accent h-12 flex flex-row justify-center items-center text-accent-accent md:mr-4 font-medium mb-6 md:mb-0"/>
                            <input value="Adaugă în coș" type="submit" className="w-full bg-accent-accent rounded-lg h-12 flex flex-row justify-center items-center text-ui-white font-medium"/>

                        </div>
                        
                    </form>

                </div>
            </div>
        </div>
    )
}