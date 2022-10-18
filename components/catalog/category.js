import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link as LinkScroll } from 'react-scroll';

import { getCurrency, getCurrencyString, getPrice, isRoDomain, uniq } from '../../utils/general';
import Dropdown from './Dropdown';
import Dropdown2 from './Dropdown2';
import FilterPopup from './FilterPopup';

import {sortingOptionsRaw} from '../../constants/sorting'

export default function Category({category, name, products, lang, nameru, nameen}) {

  const roDomain = isRoDomain()

  const inStock = name === "În Stoc"

  const [currency, setCurrency] = useState(4)

  const getInStockPrice = (finished) => {
    const prices = finished.map((product) => roDomain ? Math.round(product.price_ro / currency) : product.price)
    return Math.min(...prices)
  }

  const getProductPrice = (product) => {
    if (inStock) return getInStockPrice(product.finished_products)
    else if (roDomain) {
      if (currency === 4) return '...'
      else return Math.round( getPrice(product, product.smallestsize) * (1 + product.smallcoeficient_ro) / currency) 
    } else return Math.round( getPrice(product, product.smallestsize) * (1 + product.smallcoeficient)) 
  }

  const smallCoeficient = roDomain ? 'smallcoeficient_ro' : 'smallcoeficient'

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
      
  const [sorting, setSorting] = useState(0)
  const [filtersState, setFiltersState] = useState({})
  const [openFilters, setOpenFilters] = useState(0)
  const [showReset, setShowReset] = useState(0)
      
  const [showNr, setShowNr] = useState(32)
  const [showFrom, setShowFrom] = useState(0)
      
  const [loadingSorting, setLoadingSorting] = useState(0)
            
  const optionNamesUnfiltered = category[0].filters.map((option) => {
    return option.name
  })

  const optionNamesUnfilteredRu = category[0].filters.map((option) => {
    return option.nameru
  })

  const optionNamesUnfilteredEn = category[0].filters.map((option) => {
    return option.nameen
  })
      
  const optionNames = uniq(optionNamesUnfiltered)
  const optionNamesRu = uniq(optionNamesUnfilteredRu)
  const optionNamesEn = uniq(optionNamesUnfilteredEn)

  const sortingOptions = sortingOptionsRaw[lang]

  const [activeFilters, setActiveFilters] = useState(optionNames.map((option) => {
    return{
      active : false
    }
  }))

  const getFilteredProducts = (productsToFilter) => productsToFilter.filter((product) => {
    let contor = true
    Object.keys(filtersState).length !== 0 && optionNames.map((optionName) => {
      const productFilter = product.filters.filter((filter) => filter.name == optionName)
      if(contor){
        if(filtersState[optionName] == false || filtersState[optionName].length == 0){
          contor = true
        }
        else if(productFilter.length == 0){
          contor = false
        }
        else if(product.filters.length === 0){
          contor = false
        }
        else if(filtersState[optionName].includes(productFilter[0].value)){
          contor = true
        }
        else {
          contor = false
        }
      }
    })
    return contor
  })

  const handleProductsSortingChange = (productsSorting) => {
    switch(sorting){
      case 0 : {
        return productsSorting
      }
      case 1 : {
        return([...productsSorting].sort((a, b) => {
          if (a.published_at > b.published_at) {
            return 1;
          }
          if (a.published_at < b.published_at) {
            return -1;
          }
          return 0;
          }))
      }
      case 2 : {
        return([...productsSorting].sort((a, b) => Math.round( getPrice(b, b.defaultsize) * (1 + b[smallCoeficient]) ) - Math.round( getPrice(a, a.defaultsize) * (1 + a[smallCoeficient]) )))
      }
      case 3 : {
        return([...productsSorting].sort((a, b) => Math.round( getPrice(a, a.defaultsize) * (1 + a[smallCoeficient]) ) - Math.round( getPrice(b, b.defaultsize) * (1 + b[smallCoeficient]) )))
      }
      default : return(productsSorting)
    }
  }

  const productsApi = useMemo(() => {
    const filteredProducts = getFilteredProducts(products)
    const afterSorting = handleProductsSortingChange(filteredProducts)
    return afterSorting
  }, [getFilteredProducts, handleProductsSortingChange])

  const getPages = () => {
    if (!productsApi || productsApi.length <= showNr) return 1
    else return Math.trunc(productsApi.length / showNr) + 1
  }
      
  const pages = getPages()

  const onSubmit = async (data) => {
    
    await setShowReset(0)

    await setFiltersState(data)

    await setActiveFilters(prevState => {
      const newState = prevState.map((option, index2) => {
        if(data[optionNames[index2]] != false && data[optionNames[index2]].length != 0){
          setShowReset(1)
          return {
            active : true
          }
        }
        else {
          return {
            active : false
          }
        }
      })
      return newState
    })
  }
      
  const handleSortingChange = async (index) => {
    await setSorting(index)
  }

  useEffect(() => {
    const withCurrency = async () => {
      const currencyStrapi = await getCurrency()
      setCurrency(currencyStrapi)
    }

    withCurrency()
  }, [] )

  return (
    <div className="font-Ubuntu">
      <FilterPopup
          openFilters={openFilters}
          setOpenFilters={setOpenFilters}
          optiuni={optionNames}
          category={category}
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          reset={reset}
          activeFilters={activeFilters}
          lang={lang}
          optiuniRu={optionNamesRu}
          optiuniEn={optionNamesEn}
      ></FilterPopup>
      <div className={`w-full h-auto px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pt-128px md:pt-136px lg:pt-234px pb-120px font-Ubuntu bg-ui-darkGrey ${openFilters ? "hidden" : "block"}`}>
        <div 
          className="flex flex-row justify-start items-center text-lg-14 font-normal text-type-manatee w-auto mb-4 md:mb-8"
          name="top"
        >
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

        <div 
          className="flex flex-row justify-between items-end mb-2 md:mb-3"
        >
          <h2 className="text-sm-h2 md:text-md-h3 lg:text-lg-h2 text-accent-text2 font-bold text-shadow-text2">
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

          <div className="w-190px bg-accent-transparent text-accent-dark rounded-xl h-9 flex-row justify-between items-center pr-6 pl-4 hidden smCatalog:flex">

            <svg xmlns="http://www.w3.org/2000/svg" className="h-18px w-18px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>

            <div>
              {
                lang == "ro" ?
                "36 luni garanție"
                :
                lang == "ru" ?
                "Гарантия 3 года"
                :
                "3 years Warranty"
              }
            </div>
          </div>
        </div>

        {category[0].filters.length ? <div className="w-full h-px bg-ui-blueishGrey mb-8"/> : ''}

      <form onSubmit={handleSubmit(onSubmit)} className="hidden lg:block mb-116px">
        <div 
          className="w-full border border-t border-l border-r-0 border-b-0 border-option-border-color hidden lg:grid grid-cols-4"
        >
          {
            optionNames.map((option, index) => {
              return (
                <div 
                  className="col-span-1 cursor-pointer"
                  key={index} 
                >
                  <Dropdown 
                    name={option}
                    filterOptions={
                      category[0].filters.filter((filter) => {
                      if(filter.name == option){
                        return true
                      }
                      else {
                        return false
                      }
                    })}
                    register={register}
                    active={activeFilters[index].active}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    nameru={optionNamesRu[index]}
                    nameen={optionNamesEn[index]}
                    lang={lang}
                  ></Dropdown>
                </div>
              )
            }
          )}
        </div>
        <div className="w-full flex flex-row justify-center items-start mt-6 ">
          <input 
            className={`w-124px rounded-lg border-2 border-type-manatee text-type-manatee h-9 cursor-pointer text-lg-14 font-medium flex-row justify-center items-center hover:text-type-dark hover:border-type-dark transition duration-300 hover:bg-ui-blueishGrey ${showReset ? "flex" : "hidden"}`}
            type="submit"
            value={lang == "ro" ? "Resetează" : lang == "ru" ? "Перезагрузить" : "Reset"}
            onClick={() => reset()}
          />
        </div>
      </form>

        <div className="w-full flex flex-row-reverse lg:flex-row justify-between items-center lg:items-start mb-6 lg:mb-0">
          <div className="px-2 flex flex-row justify-between items-start">
            <div className="text-type-grey text-lg-14 mr-4 p-2 hidden lg:block">
              {
                lang == "ro" ?
                "Sortează după:"
                :
                lang == "ru" ?
                "Сортировать по:"
                :
                "Sort by:"
              }
            </div>

            <Dropdown2
              options={sortingOptions} 
              handleChange={handleSortingChange} 
              chosen={sorting}
              lang={lang}
            ></Dropdown2>
          </div>

          <div className="px-2 py-4 text-type-grey text-lg-14 hidden smCatalog:block">
            {
              lang == "ro" ?
              `${productsApi && productsApi.length} produse`
              :
              lang == "ru" ?
              `${productsApi && productsApi.length} товаров`
              :
              `${productsApi && productsApi.length} items`
            }
          </div>

          <div 
            className="w-118px h-12 bg-ui-white flex flex-row justify-between items-center lg:hidden"
            onClick={() => setOpenFilters(!openFilters)}
          >
            <div className="w-12 h-12 flex flex-row items-center justify-center bg-ui-grey text-ui-dark">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>

            <div className="text-lg-14 font-medium text-ui-dark p-4">
              {
                lang == "ro" ?
                "Filtrare"
                :
                lang == "ru" ?
                "Фильтры"
                :
                "Filters"
              }
            </div>
          </div>

        </div>

        {
          loadingSorting ? 
          "Loading..."
          :
          <div className="w-full grid grid-flow-row grid-cols-12 gap-4">
            {productsApi && productsApi.slice(showFrom*showNr, showFrom*showNr + showNr).map((product, index) => {
              return (
                <div key={index} className="h-auto w-full col-span-12 smCatalog:col-span-6 md:col-span-4 lg:col-span-3">
                  <Link href={{
                    pathname: lang == "ro" ? 
                    `/produse/${product.slug}` 
                    : 
                    lang == "ru" ?
                    `/ru/produse/${product.slug}`
                    :
                    `/en/produse/${product.slug}`,
                    query: {tip: inStock ? 'stoc' : 'comanda'},
                  }}>
                    <a>
                      <div className="bg-ui-white rounded-xl p-5 border-2 border-transparent hover:border-accent-accent transition duration-300 group">
                        <div className="w-full pb-image-ratio lg:pb-lg-image-ratio relative rounded-lg overflow-hidden transform group-hover:scale-105 transition duration-300">
                          <Image
                            draggable={false}
                            src={product.image.length === 0 ? "/product/placeholder.png" : product.image[0].url}
                            layout="fill"
                            objectFit="cover"
                            alt={product.name}
                          />
                        </div>
                        <div className="text-sm-card-name md:text-lg-card-name-bold text-type-dark mt-6 md:mt-8 font-medium">
                          {
                            lang == "ro" ?
                            product.name
                            :
                            lang == "ru" ?
                            product.nameru
                            :
                            product.nameen
                          }
                        </div>
                        <div className={`text-sm-p md:text-lg-p text-type-manatee font-normal mt-2 ${product.seria != null ? "" : "opacity-0"}`}>
                          {
                            lang == "ro" ?
                            `Seria ${product.seria}`
                            :
                            lang == "ru" ?
                            `Серия ${product.seria}`
                            :
                            `${product.seria} series`
                          }
                        </div>
                        <div className="text-sm-button md:text-lg-17 text-accent-accent font-medium mt-4 md:mt-6">
                          {
                            lang == "ro" ?
                            "de la "
                            :
                            lang == "ru" ?
                            "от "
                            :
                            "from "
                          }
                          {getProductPrice(product)} 
                          {getCurrencyString(lang, roDomain)}
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        }

        <div 
          className={`mt-8 mx-auto w-230px h-12 flex flex-row justify-center items-center rounded-lg font-bold text-lg-button mb-4 ${showNr >= 32*pages || showFrom*32+32 >= 32*pages? "bg-ui-blueishGrey text-ui-white" : "bg-accent-transparent text-accent-accent cursor-pointer"}`}
          onClick={() => {
            showNr >= 32*pages? "" : showFrom*32+32 >= 32*pages ? "" : setShowNr(showNr + 32)
          }}
        >
          {
            lang == "ro" ?
            "Mai multe produse"
            :
            lang == "ru" ?
            "Больше товаров"
            :
            "More items"
          }
        </div>

        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center max-w-min mx-auto md:mx-0">
            {Array.from(Array(pages).keys()).map((page, index) => 
                page == 0 || 
                page >= showFrom - 1 && page <= showFrom + 1 || 
                page == pages - 1 ?
                <div key={index}>
                  <LinkScroll
                    to="top"
                    smooth={true}
                  >
                    <div
                      className={`${showFrom == page ? "text-accent-accent bg-transparent border-1.5px border-accent-accent" : "text-type-grey bg-accent-transparent"} h-8 w-auto px-3 flex flex-row items-center justify-center text-lg-1 rounded mr-4 transition duration-300 cursor-pointer`}
                      onClick={() => {
                        setShowFrom(page)
                        setShowNr(32)
                      }}
                      key={index}
                    >
                      {page + 1}
                    </div>
                  </LinkScroll>
                </div>
              :
                showFrom > 2 && page == 1 || 
                showFrom <= pages - 3 && page == pages - 2 ? 
                <div 
                  key={index}
                  className="h-8 w-auto px-3 flex flex-row items-center justify-center text-lg-14 text-type-grey bg-accent-transparent rounded mr-4 transition duration-300"
                >
                  ...
                </div>
              :
                ""
            )}
          </div>

          <div className="text-lg-14 text-type-grey font-normal">
            {
              lang == "ro" ?
              `Afișare ${showFrom * 32} - ${showFrom * 32 + showNr} (din ${productsApi && productsApi.length})`
              :
              lang == "ru" ?
              `Отображать ${showFrom * 32} - ${showFrom * 32 + showNr} (из ${productsApi && productsApi.length})`
              :
              `Displaying ${showFrom * 32} - ${showFrom * 32 + showNr} (from ${productsApi && productsApi.length})`
            }
          </div>
        </div>

      </div>
    </div>
  )
}