import { useEffect, useState } from "react"
import Dropdown from "./Dropdown"
import Dropdown2 from "./Dropdown2"
import FilterPopup from "./FilterPopup"
import Image from "next/image"
import {Link as LinkScroll} from 'react-scroll'
import {API_URL} from "../../utils/urls"
import Link from "next/link"
import { useForm } from "react-hook-form";


export default function Category({category, name, products}) {

    const [productsApi, setProductsApi] = useState(products)

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    
    const [sorting, setSorting] = useState(0)
    const [openFilters, setOpenFilters] = useState(0)
    
    const [showNr, setShowNr] = useState(32)
    const [showFrom, setShowFrom] = useState(0)
    
    const [loadingSorting, setLoadingSorting] = useState(0)
    
    const optionNamesUnfiltered = category[0].filters.map((option) => {
        return option.name
    })
    
    // console.log(category[0].filters)
    
    function uniq(a) {
        var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];
        
        return a.filter(function(item) {
            var type = typeof item;
            if(type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
            else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
        });
    }
    
    const optionNames = uniq(optionNamesUnfiltered)
    
    const pages = Math.trunc(productsApi.length / 32) + 1
    
    const sortingOptions = [
        {
            name : "Popularitate",
            index : 0
        },
        {
            name : "Cele mai recente",
            index : 1
        },
        {
            name : "Preț: de la mare la mic",
            index : 2
        },
        {
            name : "Preț: de la mic la mare",
            index : 3
        }
    ]

    const [activeFilters, setActiveFilters] = useState(optionNames.map((option) => {
        return{
            active : false
        }
    }))

    const onSubmit = (data) => {
        console.log(data)

        setActiveFilters(prevState => {
            const newState = prevState.map((option, index2) => {
                if(data[optionNames[index2]] != false && data[optionNames[index2]].length != 0){
                    return {
                        active : true
                    }
                }
                else{
                    return {
                        active : false
                    }
                }
            })
            return newState
        })

        const newProducts = products.filter((product) => {
            let contor = true
            optionNames.map((optionName) => {
                const productFilter = product.filters.filter((filter) => filter.name == optionName)
                // productFiltered = productFilterUnfiltered[0].value
                if(contor){
                    // console.log(contor, product.name)
                    if(data[optionName] == false || data[optionName].length == 0){
                        contor = true
                        // console.log("data[optionName] == false || data.length == 0", product.name)
                    }
                    else if(productFilter.length == 0){
                        contor = false
                        // console.log("productFilter.length == 0", product.name)
                    }
                    else if(product.filters.length === 0){
                        contor = false
                        // console.log("product.filters.length === 0", product.name)
                    }
                    else if(data[optionName].includes(productFilter[0].value)){
                        contor = true
                        // console.log("data[optionName].includes(productFilter)", product.name)
                    }
                    else{
                        contor = false
                        // console.log("Last else", product.name)
                    }
                }
                // else console.log(contor, product.name)
            })
            return contor
        })
        setProductsApi(newProducts)
        // const found = productsApi.find(product => product.filters != [])
        // console.log(productsApi)
    }
    
    function handleSortingChange (index) {
        setSorting(index)
    }

    async function handleProductsSortingChange(sorting) {
        switch(sorting){
            case 0 : {
                setProductsApi(products)
            }
            break;
            case 1 : {
                setProductsApi([...productsApi].sort((a, b) => {
                    if (a.published_at > b.published_at) {
                      return 1;
                    }
                    if (a.published_at < b.published_at) {
                      return -1;
                    }
                    return 0;
                  }))
            }
            break;
            case 2 : {
                setProductsApi([...productsApi].sort((a, b) => b.price - a.price))
            }
            break;
            case 3 : {
                setProductsApi([...productsApi].sort((a, b) => a.price - b.price))
            }
            break;
            default : setProductsApi(products)
            break;
        }
    }

    useEffect(() => {
        handleProductsSortingChange(sorting)
        console.log("Changed sorting to ", sorting)
    }
    , [sorting])

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
            ></FilterPopup>
            <div className={`w-full h-auto px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pt-128px md:pt-136px lg:pt-234px pb-120px font-Ubuntu bg-ui-darkGrey ${openFilters ? "hidden" : "block"}`}>
                <div 
                    className="flex flex-row justify-start items-center text-lg-14 font-normal text-type-manatee w-auto mb-4 md:mb-8"
                    name="top"
                >
                    <Link href="/">
                        <a>
                            <span className="mr-1 hover:underline transition duration-300">
                                Pagina principală
                            </span>
                        </a>
                    </Link>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>
                        {name}
                    </span>
                </div>

                <div 
                    className="flex flex-row justify-between items-end mb-2 md:mb-3"
                >
                    <h2 className="text-sm-h2 md:text-md-h3 lg:text-lg-h2 text-accent-text2 font-bold text-shadow-text2">
                        {name}
                    </h2>

                    <div className="w-190px bg-accent-transparent text-accent-dark rounded-xl h-9 flex-row justify-between items-center pr-6 pl-4 hidden smCatalog:flex">

                        <svg xmlns="http://www.w3.org/2000/svg" className="h-18px w-18px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>

                        <div>
                            36 luni garantie
                        </div>
                    </div>
                </div>

                <div className="w-full h-px bg-ui-blueishGrey mb-8"/>

                {/* <div className="w-full grid-cols-12 grid-flow-row grid-rows-2 border border-t border-l border-r-0 border-b-0 border-option-border-color mb-116px hidden lg:grid">
                    {optiuni.map((option, index)=>
                        <Dropdown key={index} name={option}></Dropdown>
                    )}
                </div> */}

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
                                            else{
                                                return false
                                            }
                                        })}
                                        register={register}
                                        active={activeFilters[index].active}
                                    ></Dropdown>
                                </div>
                            )
                        }
                    )}
                </div>
                <div className="w-full flex flex-row justify-center items-start mt-6 ">
                    <input 
                        className="w-124px bg-accent-accent rounded-lg border-2 border-ui-white text-ui-white h-9 cursor-pointer mr-4 text-lg-14 font-medium "
                        type="submit"
                        value="Aplică"
                    />
                    <input 
                        className="w-124px rounded-lg border-2 border-type-manatee text-type-manatee h-9 cursor-pointer mr-4 text-lg-14 font-medium  flex flex-row justify-center items-center hover:text-type-dark hover:border-type-dark transition duration-300"
                        type="submit"
                        value="Resetează"
                        onClick={() => reset()}
                    />
                </div>
            </form>

                <div className="w-full flex flex-row-reverse lg:flex-row justify-between items-center lg:items-start mb-6 lg:mb-0">
                    <div className="px-2 flex flex-row justify-between items-start">
                        <div className="text-type-grey text-lg-14 mr-4 p-2 hidden lg:block">
                            Sortează după:
                        </div>

                        <Dropdown2 
                            options={sortingOptions} 
                            handleChange={handleSortingChange} 
                            chosen={sorting}
                        ></Dropdown2>
                    </div>

                    <div className="px-2 py-4 text-type-grey text-lg-14 hidden smCatalog:block">
                        {productsApi.length} produse
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
                            Filtrare
                        </div>
                    </div>

                </div>

                {
                    loadingSorting ? 
                    "Loading..."
                    :
                    <div className="w-full grid grid-flow-row grid-cols-12 gap-4">
                        {productsApi.slice(showFrom*showNr, showFrom*showNr + showNr).map((product, index) => {
                            return (
                                <div key={index} className="h-auto w-full col-span-12 smCatalog:col-span-6 md:col-span-4 lg:col-span-3">
                                    <Link href={`/produse/${product.slug}`}>
                                        <a>
                                            <div className="h-296px md:h-425px bg-ui-white rounded-xl p-5 border-2 border-transparent hover:border-accent-accent transition duration-300">
                                                <div className="w-auto h-156px md:h-245px relative">
                                                    <Image
                                                        draggable={false}
                                                        src={product.image[0].formats.medium.url}
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>
                                                <div className="text-sm-card-name md:text-lg-card-name-bold text-type-dark mt-6 md:mt-8 font-medium">
                                                    {product.name}
                                                </div>
                                                <div className="text-sm-p md:text-lg-p text-type-manatee font-normal mt-2">
                                                    Seria Juergen LED
                                                </div>
                                                <div className="text-sm-button md:text-lg-17 text-accent-accent font-medium mt-4 md:mt-6">
                                                    de la {product.price} lei
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
                    className="mt-8 mx-auto w-230px h-12 flex flex-row justify-center items-center rounded-lg bg-accent-transparent text-accent-accent font-bold text-lg-button mb-4"
                    onClick={() => {
                        showNr >= showNr*pages? "" : setShowNr(showNr + 32)
                    }}
                >
                    Mai multe produse
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
                                            className={`${showFrom == page ? "text-accent-accent bg-transparent border border-1.5px border-accent-accent" : "text-type-grey bg-accent-transparent"} h-8 w-auto px-3 flex flex-row items-center justify-center text-lg-1 rounded mr-4 transition duration-300`}
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
                        Afișare {showFrom * 32} - {showFrom * 32 + showNr} (din {productsApi.length})
                    </div>
                </div>

            </div>
        </div>
    )
}