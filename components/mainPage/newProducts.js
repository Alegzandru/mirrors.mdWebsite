import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from "next/image"
import {CustomButtonGroupAsArrows2} from "./CustomButtonGroup"
import Link from 'next/link'


export default function NewProducts(props) {

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
          partialVisibilityGutter: 40
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
        "/mainPage/popularProducts/Copy of  Veronica.png",
        "/mainPage/popularProducts/Copy of Acacia.png",
        "/mainPage/popularProducts/Copy of Adina Alumin.png",
        "/mainPage/popularProducts/Copy of Afina.png",
        "/mainPage/popularProducts/Copy of Alexandra.png",
        "/mainPage/popularProducts/Copy of Alexandrina (1).png",
    ];

    return(
        <div className="pt-20 pb-24 md:pb-60px md:pt-24 lg:pb-200px lg:pt-200px bg-ui-darkGrey font-Ubuntu">
            <h3 className="text-sm-h3 md:text-md-h3 lg:text-lg-h3 text-type-dark text-center mx-auto font-bold pb-8 md:pb-44px">
                {
                    props.lang == "ro" ? 
                    "Produse noi"
                    :
                    "Новые товары"
                }
            </h3>

            <div className="w-full relative">
                <Carousel
                    swipeable={true}
                    ssr
                    partialVisibile
                    deviceType={props.deviceType}
                    itemClass="image-item"
                    responsive={responsive}
                    infinite
                    arrows={false}
                    focusOnSelect
                    centerMode={props.deviceType == "mobile" ? 0 : 1}
                    customButtonGroup={<CustomButtonGroupAsArrows2 />}
                    renderButtonGroupOutside
                    // style={{
                    //     height: "450px"
                    // }}
                >
                    {props.products.map((product, index) => {
                        return (
                            index < 15 &&
                            <Link href={props.lang == "ro" ? `/produse/${product.slug}` : `/ru/produse/${product.slug}`}>
                                <a>
                                    <div key={index} className="h-auto w-full px-container-sm md:px-0">
                                        <div className="h-296px md:h-425px bg-ui-white rounded-xl md:ml-4 md:mr-0 p-5 border-2 border-transparent hover:border-accent-accent transition duration-300 group">
                                            <div className="w-auto h-156px md:h-245px relative transform group-hover:scale-105 transition duration-300 rounded-lg overflow-hidden">
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
                                                    product.nameru
                                                }
                                            </div>
                                            <div className={`text-sm-p md:text-lg-p text-type-manatee font-normal mt-2 ${product.seria != null ? "block" : "hidden"}`}>
                                                {
                                                    props.lang == "ro" ?
                                                    `Seria ${product.seria}`
                                                    :
                                                    `Серия ${product.seria}`
                                                }
                                            </div>
                                            <div className="text-sm-button md:text-lg-17 text-accent-accent font-medium mt-4 md:mt-6"> 
                                                {
                                                    props.lang == "ro" ? 
                                                    "de la "
                                                    :
                                                    "от "
                                                }
                                                {Math.trunc( getPrice(product, product.defaultsize) * (1 + product.smallcoeficient) ) } 
                                                {
                                                    props.lang == "ro" ? 
                                                    " lei"
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

            <Link href={props.lang == "ro" ? "/oglinzi" : "/ru/oglinzi"}>
                <a>
                    <div className="hidden mx-auto md:mt-40px lg:mt-72px w-234px h-48px rounded-lg text-lg-button md:text-sm-button font-bold bg-accent-accent text-ui-white md:flex flex-row justify-center items-center  border-2 border-transparent hover:bg-accent-light transition duration-300">
                        {
                            props.lang == "ro" ? 
                            "Deschide Catalogul"
                            :
                            "Открыть каталог"
                        }
                    </div>
                </a>
            </Link>

            <div className="mx-container-sm">
                <Link href={props.lang == "ro" ? "/oglinzi" : "/ru/oglinzi"}>
                    <a>
                        <div className="text-sm-button mx-auto mt-12 w-full h-48px rounded-lg bg-accent-accent text-ui-white md:hidden flex flex-row justify-center items-center">
                            {
                                props.lang == "ro" ? 
                                "Află ce este în TREND"
                                :
                                "Узнайте, что в Тренде"
                            }
                        </div>
                    </a>
                </Link>
            </div>
        </div>
    )
}