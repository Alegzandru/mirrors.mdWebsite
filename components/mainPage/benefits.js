import { categories } from "../../constants/benefits";
import Image from "next/image"
import Link from "next/link"

const getColSpanTablet = (index) => {
  switch (index) {
    case 0 :
    case 1 :
      return 3
    default : return 2
  }
}

const getColSpanMobile = (index) => {
  switch (index) {
    case 4 :
      return 6
    default : return 3
  }
}

export default function Benefits({lang}){
  const renderCategory = ({nameRo, nameRu, nameEn, img, slug}, index) => (
    <div className={`w-full col-span-${getColSpanMobile(index)} md:col-span-${getColSpanTablet(index)} lg:col-auto`} key={index}>
      <Link
        href={
          lang == "ro" 
          ?`/${slug}` 
          : lang == "ru" 
          ? `/ru/${slug}`
          : `/en/${slug}`
        }
      >
        <a className={!slug ? 'pointer-events-none' : ''}>
          <div 
            className={`relative rounded-lg eerie-shadow overflow-hidden h-258px md:h-348px lg:h-418px group transform lg:hover:-translate-y-6 transition-all duration-500`}
            key={index}
          >
            <Image 
              src={`/mainPage/benefits/${img}`}
              layout="fill"
              objectFit="cover"
              alt={name}
            />
            <div className="absolute bottom-0 w-full md:font-bold pb-10px px-4 md:p-7 text-lg-card-name md:text-lg-28 text-secondary-dust text-center md:text-left transform lg:group-hover:-translate-y-6 group-hover:text-ui-white transition-all duration-500">
              {lang === "ro" 
                ? nameRo
                : lang === "ru" 
                ? nameRu 
                : nameEn
              }
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
  return(
    <div className="w-full px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl font-Ubuntu pt-20 pb-14 md:pt-20 md:pb-24 lg:pt-120px lg:pb-140px bg-ui-darkGreen overflow-hidden">
      <h3 className="text-lg-h3 font-bold text-center w-full mx-auto text-ui-white mb-7 md:mb-10 lg:mb-52px">
        {lang == "ro" 
          ? "Cea mai largă gamă de produse"
          : lang == "ru" 
          ? "Самый широкий ассортимент продукции"
          : "Widest range of products"
        }
      </h3>
      <div className="grid grid-cols-6 lg:grid-cols-5 gap-2 md:gap-6 lg:gap-5 w-full">
        {categories.map(renderCategory)}
      </div>
    </div>
  )
}
