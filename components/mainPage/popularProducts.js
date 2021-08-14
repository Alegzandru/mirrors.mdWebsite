import { useContext } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from "next/image"
import {CustomButtonGroupAsArrows} from "./CustomButtonGroup"
import Link from 'next/link'

export default function PopularProducts(props){

    function getPrice(product, size) {
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

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1367 },
          items: 3,
          slidesToSlide: 3,
        },
        tablet: {
          breakpoint: { max: 1366, min: 769 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 768, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
    
    return(
        <div className="overflow-hidden h-auto bg-ui-darkGrey pt-24 md:pt-24 pb-12 lg:pt-230px lg:pb-156px flex flex-col md:flex-row justify-between items-center font-Ubuntu xl:pl-container-xl">
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
            </div>
            <div className="produseWidth">
                <Carousel
                    ssr
                    partialVisibile
                    deviceType={props.deviceType}
                    itemClass="image-item"
                    responsive={responsive}
                    infinite
                    partialVisible
                    arrows={false}
                    focusOnSelect
                    autoPlay
                    autoPlaySpeed={3000}
                    customButtonGroup={<CustomButtonGroupAsArrows />}
                    style={{
                        height: "450px"
                    }}
                >
                    {props.products.map((product, index) => {
                            return (
                                index < 6 &&
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
                                        <div key={index} className="h-444px md:h-481px">
                                            <div className="h-auto md:h-425px bg-ui-white rounded-xl mb-4 mr-4 ml-4 md:ml-4 md:mr-0 flex-grow p-5 border-2 border-transparent hover:border-accent-accent transition duration-300 group">
                                                <div className="w-auto h-245px relative rounded-xl overflow-hidden transform group-hover:scale-105 transition duration-300">
                                                    <Image
                                                        draggable={false}
                                                        src={product.image.length === 0 ? "/product/placeholder.png" : product.image[0].formats.medium.url}
                                                        layout="fill"
                                                        objectFit="cover"
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
                                                <div className={`text-sm-p md:text-lg-p text-type-manatee font-normal mt-2 ${product.seria != null ? "block" : "hidden"}`}>
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
                                                    {Math.trunc( getPrice(product, product.defaultsize) * (1 + product.smallcoeficient) ) }
                                                    {
                                                        props.lang == "ro" || props.lang == "en"? 
                                                        " lei "
                                                        :
                                                        " лей"
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                        );
                    })}
                </Carousel>
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