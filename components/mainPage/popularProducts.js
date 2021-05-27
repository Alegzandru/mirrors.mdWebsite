import { useContext } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from "next/image"
import {CustomButtonGroupAsArrows} from "./CustomButtonGroup"

export default function PopularProducts(props){

    console.log(props.deviceType)

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

      const images = [
        "/mainPage/popularProducts/Copy of  Veronica.png",
        "/mainPage/popularProducts/Copy of Acacia.png",
        "/mainPage/popularProducts/Copy of Adina Alumin.png",
        "/mainPage/popularProducts/Copy of Afina.png",
        "/mainPage/popularProducts/Copy of Alexandra.png",
        "/mainPage/popularProducts/Copy of Alexandrina (1).png",
    ];
    
    return(
        <div className="overflow-hidden h-auto bg-ui-darkGrey pt-24 md:pt-24 pb-12 lg:pt-230px lg:pb-156px flex flex-col md:flex-row justify-between items-center font-Ubuntu">
            <div className="text-center ml-container-sm mr-container-sm md:text-left md:ml-container-mdw-full md:w-348px lg:ml-container-lg lg:w-382px ">
                <h2 className="w-full font-bold text-type-dark text-sm-h2 lg:text-lg-h2 md:text-md-h2 tracking-tighter">
                    Produse populare
                </h2>

                <p className="mt-5 font-normal lg:text-lg-p md:text-md-p text-type-manatee w-full">
                    Site-ul nostru conține o gamă largă de oglinzi, printre care cu siguranță o veți găsi pe cea potrivită.
                </p>

                <div className="hidden w-238px h-12 md:flex flex-row justify-center items-center text-accent-accent border-2 border-accent-accent mt-12 rounded-lg font-medium">
                    Află ce este în TREND
                </div>
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
                    {images.map((image, index) => {
                        return (
                            <div key={index} className="h-352px md:h-481px">
                                <div className="h-296px md:h-425px bg-ui-white rounded-xl mb-4 mr-4 ml-4 md:ml-4 md:mr-0 flex-grow p-5 border-2 border-transparent hover:border-accent-accent transition duration-300">
                                    <div className="w-auto h-156px md:h-245px relative">
                                        <Image
                                            draggable={false}
                                            src={image}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="text-sm-card-name md:text-lg-card-name-bold text-type-dark mt-6 md:mt-8 font-medium">
                                        Norma
                                    </div>
                                    <div className="text-sm-p md:text-lg-p text-type-manatee font-normal mt-2">
                                        Seria Juergen LED
                                    </div>
                                    <div className="text-sm-button md:text-lg-17 text-accent-accent font-medium mt-4 md:mt-6">
                                        de la 4706 lei
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </Carousel>
            </div>
            <div className="md:hidden px-container-sm block w-full">
                <div className="w-full h-12 flex flex-row justify-center items-center bg-accent-accent mt-8 text-ui-white rounded-lg">
                    Află ce este în TREND
                </div>
            </div>
        </div>
    )
}