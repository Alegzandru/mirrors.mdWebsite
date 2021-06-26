import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useState , useRef} from 'react'
import {CartContext, DeviceTypeContext, PopupContext} from "../../components/context"
import {API_URL} from "../../utils/urls"
import { useForm } from "react-hook-form";
import DropdownProduct2 from "../catalog/DropdownProduct2"
import Scroll from 'react-scroll';

var Element = Scroll.Element;

export default function CosProducts(){

    const {deviceType, setDeviceType} = useContext(DeviceTypeContext)

    const { reset, register, handleSubmit, watch, formState: { errors } } = useForm();

    const {cart, setCart} = useContext(CartContext)
    const [totalPrice, setTotalPrice] = useState(0)
    const {popupOpen, setPopupOpen} = useContext(PopupContext)
    const [popupProduct , setPopupProduct] = useState(cart[0])
    const [optionNames, setOptionNames] = useState([])
    const [optionVariants, setOptionVariants] = useState([])
    const [price, setPrice] = useState(0)

    let optionsPrice = 0

    const coeficientFinder = (size, product) => {
        if(size.width*size.height < product.mediumsize.height * product.mediumsize.width){
            return product.smallcoeficient
        }
        else if(size.width*size.height < product.bigsize.height * product.bigsize.width) {
            return product.mediumcoeficient
        }
        else{
            return product.bigcoeficient
        }
    }

    const onSubmit = (data) => {
        if(data.height != undefined && data.width != undefined){
            let changeProduct = cart.filter((product) => popupProduct == product)[0]
            let mutableCart = [...cart]
            let index = mutableCart.indexOf(changeProduct)

            fetch(`https://mirrors-md-admin.herokuapp.com/sizes?name_eq=${data.height}x${data.width}`)
                .then(response => response.json())
                .then(dataInside => {
                    if(dataInside.length == 0){
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                                name : `${data.height}x${data.width}`,
                                height : data.height,
                                width : data.width
                            })
                        };
        
                        fetch(`https://mirrors-md-admin.herokuapp.com/sizes`, requestOptions)
                            .then(response => response.json())
                            .then(dataInside2 => {
                                changeProduct.size = dataInside2
                                changeProduct.price = Math.trunc(data.height * data.width / 1000000 * changeProduct.product.m2price * ( 1 + coeficientFinder(data, changeProduct.product)))
                                mutableCart[index] = changeProduct
                                setCart(mutableCart)   
                                setPopupOpen("")  
                                reset()               
                            })
                    }
                    else{
                        changeProduct.size = dataInside[0]
                        changeProduct.price = Math.trunc(data.height * data.width / 1000000 * changeProduct.product.m2price * ( 1 + coeficientFinder(data, changeProduct.product)))
                        mutableCart[index] = changeProduct
                        setCart(mutableCart)   
                        setPopupOpen("") 
                        reset()                         
                    }
            })
        }
        else{
            const addOns = Object.entries(data).filter((addOn) => addOn[1] != null && addOn[1] != false && addOn[0] != "Dimensiuni recomandate")
            
            let changeProduct = cart.filter((product) => popupProduct == product)[0]
            let mutableCart = [...cart]
            let index = mutableCart.indexOf(changeProduct)
    
            let productCart = {
                product : {},
                addOns : [],
                size : changeProduct.size,
                number : changeProduct.number,
                price : changeProduct.size
            }
    
            changeProduct.addOns = []
    
            addOns.map((addOn, index) => {
                if(addOn[1] == true){
                    let addOnRaw = optionVariants.filter((addOnRaw) => {
                        return addOnRaw.name == addOn[0]
                    })
                    changeProduct.addOns.push(addOnRaw[0])
                    // addOnsPrice += addOnRaw[0].price
                }
                else{
                    let addOnRaw = optionVariants.filter((addOnRaw) => {
                        return addOnRaw.group == addOn[0] && addOnRaw.typename == addOn[1]
                    })
                    changeProduct.addOns.push(addOnRaw[0])
                    // addOnsPrice += addOnRaw[0].price
                }
            })
    
            mutableCart[index] = changeProduct
            setCart(mutableCart)
            setPopupOpen("")     
            reset()            
        }
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
        let mutablePrice = 0
        cart.map((product) => {
            mutablePrice += product.price * product.number
            product.addOns.map((addOn, index) => {
                mutablePrice += addOn.price * product.number
            })
        })
        setTotalPrice(mutablePrice)
    }, [cart])

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setPopupOpen("")
                }
            }
    
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }


    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <div className="font-Ubuntu">
            <div ref={wrapperRef} className="w-full">
                {popupProduct != undefined && popupOpen == "size" &&
                    <div className={`bg-ui-white fixed sm:top-popup-top-sm left-popup-left-sm md:top-popup-top-md md:left-popup-left-md lg:top-popup-top lg:left-popup-left md:h-444px md:w-720px lg:w-981px lg:h-500px ${popupOpen == "size" ? "block" : "hidden"} p-4 md:py-8 md:px-6 lg:p-12 md:rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center z-50 w-full h-full`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mt-2 mb-6 text-type-grey ml-auto md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setPopupOpen("")}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <div className="relative lg:w-368px md:h-288px md:w-320px w-full h-240px">
                            <Image
                                src={popupProduct.product.image[0].formats.small.url}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <form className="lg:w-444px h-full flex flex-col justify-start md:justify-between items-start pt-6 md:w-320px w-full md:w-auto">
                            <div className="w-full md:w-auto">
                                <h3 className="w-full text-type-dark text-sm-h3 md:text-md-h3 lg:text-lg-h3 font-bold mb-8">
                                    {popupProduct.product.name}
                                </h3>
                                <div className="flex flex-col md:flex-row justify-between items-end w-full">
                                    <div className="w-full md:mr-4">
                                        <div className="text-type-grey text-lg-12 mb-2">
                                            <span className="text-type-manatee text-lg-14 font-medium">Înălțime</span> (de la {popupProduct.product.smallestsize.height}mm pînă la {popupProduct.product.biggestsize.height}mm)
                                        </div>
                                        <div className="flex flex-row justify-start items-center text-lg-17">
                                            <input
                                                className="w-84px h-34px bg-ui-grey text-type-manatee flex flex-row justify-center items-center outline-none border-0 rounded mr-2"
                                                type="number"
                                                placeholder={popupProduct.size.height}
                                                {...register("height", { min: popupProduct.product.smallestsize.height, max: popupProduct.product.biggestsize.height, valueAsNumber : true, required : true })}
                                            />
                                            {errors.height?.type === 'min' && `Min height is ${popupProduct.product.smallestsize.height}`}
                                            {errors.height?.type === 'max' && `Max height is ${popupProduct.product.biggestsize.height}`}

                                            <span className="text-ui-black">
                                                mm
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-lg-17 text-ui-black font-medium">
                                        x
                                    </div>

                                    <div className="w-full md:ml-4">
                                        <div className="text-type-grey text-lg-12 mb-2">
                                            <span className="text-type-manatee text-lg-14 font-medium">Lățime</span> (de la {popupProduct.product.smallestsize.width}mm pînă la {popupProduct.product.biggestsize.width}mm)
                                        </div>
                                        <div className="flex flex-row justify-start items-center text-lg-17">
                                            <input
                                                className="w-84px h-34px bg-ui-grey text-type-manatee flex flex-row justify-center items-center outline-none border-0 rounded mr-2"
                                                type="number"
                                                placeholder={popupProduct.size.width}
                                                {...register("width", { min: popupProduct.product.smallestsize.width, max: popupProduct.product.biggestsize.width, valueAsNumber : true , required : true })}
                                            />
                                            {errors.width?.type === 'min' && `Min width is ${popupProduct.product.smallestsize.width}`}
                                            {errors.width?.type === 'max' && `Max width is ${popupProduct.product.biggestsize.width}`}

                                            <span className="text-ui-black">
                                                mm
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button 
                                className="w-full h-11 rounded-lg bg-accent-accent text-ui-white font-bold text-lg-button mt-8 md:mt-0"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Salvează
                            </button>

                        </form>
                    </div>
                }

                {
                    popupProduct != undefined && popupOpen == "addOns" &&
                    <div className={`bg-ui-white absolute top-popup-top-sm left-popup-left-sm md:top-140px md:left-popup-left-md lg:top-popup-140px lg:left-popup-left w-full md:w-720px lg:w-981px ${popupOpen == "addOns" ? "block" : "hidden"} p-4 md:py-8 md:px-6 lg:p-12 md:rounded-xl flex flex-col md:flex-row justify-start md:justify-between items-start z-50`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mt-2 mb-6 text-type-grey ml-auto md:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setPopupOpen("")}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <div className="w-full md:w-auto">
                            <div className="relative lg:w-368px md:h-288px md:w-320px w-full h-240px">
                                <Image
                                    src={popupProduct.product.image[0].formats.small.url}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <h3 className="w-full text-type-dark text-sm-h3 md:text-md-h3 lg:text-lg-h3 font-bold mt-6">
                                {popupProduct.product.name}
                            </h3>
                        </div>
                        <div className="md:w-320px lg:w-444px h-full flex flex-col justify-start items-start w-full">

                            <form className="w-full mt-40px md:mt-0">
                                <Element name="test7" className="element" id="containerElement" style={{
                                    position: 'relative',
                                    height: deviceType == "mobile" ? '360px' : '508px',
                                    overflow: 'scroll',
                                    borderRadius: "8px",
                                    border : "2px solid #C2D1D9"
                                }}>  
                                    {optionNames.map((option, index) =>
                                        <DropdownProduct2
                                            name={option}
                                            options={optionVariants.filter((optionObj) => optionObj.group == option || optionObj.name == option)}
                                            register={register}
                                            key={index}
                                            setPrice={setPrice}
                                            price={price}
                                        />
                                    )}
                                </Element>
                            </form>

                            <button 
                                className="w-full h-11 rounded-lg bg-accent-accent text-ui-white font-bold text-lg-button mt-8"
                                onClick={handleSubmit(onSubmit)}
                            >
                                Salvează
                            </button>

                        </div>
                    </div>
                }
            </div>

            <div 
                className={`transition duration-300 w-full h-auto px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pt-128px md:pt-136px lg:pt-234px pb-180px font-Ubuntu bg-ui-darkGrey filter ${popupOpen ? "brightness-50" : ""}`}
            >
                <div className="flex flex-row justify-start items-center text-lg-14 font-normal text-type-manatee w-auto mb-4 md:mb-8">
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
                        Coș
                    </span>
                </div>

                <h2 className="text-sm-h2 md:text-md-h3 lg:text-lg-h2 text-accent-text2 font-bold mb-2 md:mb-3 text-shadow-text2">
                    Coș
                </h2>

                <div className="w-full h-px bg-ui-blueishGrey mb-8"/>

                {
                cart.length == 0 ? 
                <div className="w-full">
                    <div className="mx-auto lg:w-776px h-224px md:h-382px lg:h-444px w-full relative mix-blend-multiply	md:mt-3 lg:mt-4 md:mb-6 lg:mb-8">
                        <Image
                            src="/checkout/empty.svg"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="text-sm-p md:text-md-h3 lg:text-lg-28 font-bold text-type-dark w-full text-center">
                        Coșul dumneavoastră este gol. Ajutați-l să se umple, întorceți-vă înapoi la cumpărături!
                    </div>
                </div>
                :
                <div className="w-full">
                    <div className="w-full rounded-xl bg-ui-white mb-20">
                        {
                            cart.map((product, index) => {
                                optionsPrice = 0
                                return(
                                    <div className="flex flex-col md:flex-row w-full border-l-0 border-b-2 border-t-0 border-r-0 border-ui-darkGrey">
                                        <div className="py-6 px-2 lg:px-6 md:w-cart-md lg:w-cart-lg flex flex-row justify-start items-center border-l-0 border-b md:border-b-0 border-t-0 border-r-2 border-ui-darkGrey">
                                            <div className="h-8 w-8 flex flex-row justify-center items-center rounded-lg hover:bg-ui-grey mr-2 transition duration-300 group">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-6 w-6 text-type-grey cursor-pointer group-hover:text-accent-error transition duration-300" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                    onClick={() => {
                                                        setCart(
                                                            cart.filter((product2, index2) => {
                                                                return index != index2
                                                            })
                                                        )
                                                    }}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </div>
                                            <div className="w-full flex flex-row md:flex-col lg:flex-row justify-start items-start lg:items-center">
                                                <div className="lg:ml-6 w-20 h-20 lg:w-112px lg:h-112px relative mr-6 md:mb-6 lg:mb-0 rounded-lg overflow-hidden">
                                                    <Image
                                                        src={product.product.image[0].formats.small.url}
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="text-lg-17 text-type-manatee font-medium mb-2">
                                                        {product.product.name}
                                                    </div>
                                                    <div className="text-lg-14 text-type-grey mb-4">
                                                        {product.size.height+"x"+product.size.width+" mm"}
                                                    </div>
                                                    <div 
                                                        className="flex flex-row justify-start items-center text-accent-accent cursor-pointer"
                                                        onClick={() => {
                                                        setPopupOpen("size")
                                                        setPopupProduct(product)
                                                        }}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-14px w-14px mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                                        </svg>
                                                        <div className="text-lg-12">
                                                            Alegeți altă dimensiune
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-6 px-2 lg:px-8 md:w-cart-md lg:w-cart-lg border-l-0 border-b md:border-b-0 border-t-0 border-r-2 border-ui-darkGrey text-lg-14 text-type-grey">
                                            {
                                                product.addOns.length == 0 ? 
                                                <div>
                                                    Nu sunt optiuni
                                                </div>
                                                :
                                                product.addOns.map((addOn) => {
                                                    optionsPrice += addOn.price
                                                    return(
                                                        <div className="flex flex-row justify-between items-start mb-2">
                                                            <div className="max-w-130px">
                                                                {addOn.name}
                                                            </div>
                                                            <div>
                                                                {addOn.price} lei
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            
                                            <div 
                                                className="flex flex-row justify-start items-center text-accent-accent mt-4 cursor-pointer"
                                                onClick={async () => {

                                                    const category = product.product.category.name
                                                    const categoryRes = await fetch(`${API_URL}/categories?name_eq=${category}`)
                                                    setPopupProduct(product)
                                                    await categoryRes.json().then( (data) => {
                                                        const optionsRaw = data[0].add_ons
                                                        setOptionVariants(data[0].add_ons)
        
                                                        const optionNamesUnfiltered = optionsRaw.map((option) => {
                                                            if(option.group){
                                                                return option.group
                                                            }
                                                            else{
                                                                return option.name
                                                            }
                                                        })
        
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
                                                    
                                                        setOptionNames(uniq(optionNamesUnfiltered))
                                                        setPopupOpen("addOns")
                                                    })
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-14px w-14px mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                                </svg>
                                                <div className="text-lg-12">
                                                    Configurați opțiunile
                                                </div>
                                            </div>
                                        </div>
                                        <div className="py-6 px-2 lg:px-6 md:w-40 lg:w-272px border-l-0 border-b md:border-b-0 border-t-0 border-r-2 border-ui-darkGrey flex flex-row justify-center items-center">
                                            <div className="w-40px h-40px flex flex-row justify-center items-center group hover:bg-ui-grey transition duration-300 rounded-lg">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-8 w-8 text-type-dark cursor-pointer group-hover:text-accent-accent transition duration-300" 
                                                    fill="none" viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                    onClick={() => {
                                                        if(product.number == 1){
                                                            setCart(
                                                                cart.filter((product2, index2) => {
                                                                    return index != index2
                                                                })
                                                            )
                                                        }
                                                        else{
                                                            let mutableCart = [...cart]
                                                            mutableCart[index].number -= 1
                                                            setCart(mutableCart)
                                                        }
                                                    }}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                </svg>
                                            </div>
                                    
                                            <div className="bg-ui-grey rounded-lg h-12 text-lg-32 text-type-manatee px-18px mx-2 lg:mx-4 flex flex-row justify-center items-center">
                                                {product.number}
                                            </div>

                                            <div className="w-40px h-40px flex flex-row justify-center items-center group hover:bg-ui-grey transition duration-300 rounded-lg">
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-8 w-8 text-type-dark cursor-pointer group-hover:text-accent-accent transition duration-300" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                    onClick={() => {
                                                        let mutableCart = [...cart]
                                                        mutableCart[index].number += 1
                                                        setCart(mutableCart)
                                                    }}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="py-6 px-2 lg:px-8 md:w-40 lg:w-272px border-l-0 border-b md:border-b-0 border-t-0 border-r-2 border-ui-darkGrey text-lg-14 text-type-grey flex flex-col justify-between">
                                            <div className="w-full">
                                                <div className="flex flex-row justify-between items-start w-full mb-2">
                                                    <div>
                                                        Oglinda
                                                    </div>
                                                    <div>
                                                        {product.price * product.number} lei
                                                    </div>
                                                </div>
                                                <div className="flex flex-row justify-between items-start w-full mb-2">
                                                    <div>
                                                        Optiuni
                                                    </div>
                                                    <div>
                                                        {optionsPrice * product.number} lei
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-row justify-between items-start text-type-manatee font-bold w-full">
                                                <div>
                                                    Total
                                                </div>
                                                <div>
                                                    {(product.price + optionsPrice) * product.number} lei
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                    <div className="w-full flex flex-col md:flex-row justify-between items-start">
                        <div className="w-full mr-40 mb-14 md:mb-0">   
                        </div>
                        <div className="w-full">
                            <div className="text-sm-h4 md:text-lg-28 text-type-dark font-bold mb-4">
                                Total
                            </div>
                            <div className="rounded-xl bg-ui-white w-full">
                                <div className="flex flex-row justify-between items-start py-6 px-2 lg:px-8 text-type-dark font-medium text-lg-p border border-ui-darkGrey w-full">
                                    <div>
                                        Total
                                    </div>
                                    <div>
                                        {totalPrice} lei
                                    </div>
                                </div>

                                {
                                    cart.length != 0 &&
                                    <div className="p-2 border-ui-darkGrey w-full">
                                        <Link href="/cos/checkout">
                                            <a className="flex flex-row justify-center itemes-start w-full">
                                                <div className="w-full bg-accent-accent text-ui-white h-52px text-lg-button font-bold flex flex-row justify-center items-center rounded-lg hover:bg-accent-light transition duration-300">
                                                    Finalizează comanda
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                }      
            </div>
        </div>
    )
}