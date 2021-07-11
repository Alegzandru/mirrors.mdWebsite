import DropdownProduct2 from "./DropdownProduct2"
import { useForm } from "react-hook-form";
import Image from "next/image"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {useState, useContext, useEffect, useRef} from "react"
import {CartContext} from "../../components/context"
import Link from 'next/link'
import { useRouter } from 'next/router'
import ReactTooltip from 'react-tooltip';
import Scroll from 'react-scroll';

var Element = Scroll.Element;

export default function ProductComponent ({deviceType, name, images, options, optionVariants, productData, optionsRaw, lang, nameru, optionsRu}) {

    const router = useRouter()

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

    const coeficientFinder = (size) => {
        if(size.width*size.height < productData[0].mediumsize.height * productData[0].mediumsize.width){
            return productData[0].smallcoeficient
        }
        else if(size.width*size.height < productData[0].bigsize.height * productData[0].bigsize.width) {
            return productData[0].mediumcoeficient
        }
        else{
            return productData[0].bigcoeficient
        }
    }
    const [checkout, setCheckout] = useState(false)
    const {cart, setCart} = useContext(CartContext)

    const [price, setPrice] = useState(Math.trunc(getPrice(productData[0], productData[0].defaultsize) * ( 1 + coeficientFinder(productData[0].defaultsize))))
    const [sizeGlobal, setSizeGlobal] = useState(productData[0].defaultsize)

    const [openOptions, setOpenOptions] = useState(0)

    let contorAddons = 1

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        
        contorAddons = 1
        const addOns = Object.entries(data).filter((addOn) => addOn[1] != null && addOn[1] != false && addOn[0] != "Dimensiuni recomandate")
        // let sizeName = data["Dimensiuni recomandate"]
        // let sizeRaw = productData[0].linkedsizes.filter((sizeFilter) => sizeFilter.name == sizeName)
        let size = productData[0].defaultsize

        fetch(`https://mirrors-md-admin.herokuapp.com/sizes?name_eq=${sizeGlobal.height}x${sizeGlobal.width}`)
            .then(response => response.json())
            .then(data => {
                if(data.length == 0){
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            name : `${sizeGlobal.height}x${sizeGlobal.width}`,
                            height : sizeGlobal.height,
                            width : sizeGlobal.width
                        })
                    };
    
                    fetch(`https://mirrors-md-admin.herokuapp.com/sizes`, requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            size = data

                            let addOnsPrice = 0

                            let productCart = {
                                product : {},
                                addOns : [],
                                size : size,
                                number : 1,
                                price : Math.trunc(getPrice(productData[0], size) * ( 1 + coeficientFinder(size)))
                            }

                            function flatten(obj) {
                                var result = Object.create(obj);
                                for(var key in result) {
                                    result[key] = result[key];
                                }
                                return result;
                            }

                            fetch(`https://mirrors-md-admin.herokuapp.com/products?name_eq=${name}`)
                                .then(response => response.json())
                                .then(data => {
                                    productCart.product = data[0]

                                    if(addOns.length == 0){
                                        if( cart.length != 0 && productCart.product.name == cart[cart.length - 1].product.name  && cart[cart.length - 1].size.name == `${size.height}x${size.width}`){
                                            let mutableCart = [...cart]
                                            mutableCart[mutableCart.length - 1].number += 1
                                            setCart(
                                                mutableCart
                                            )
                                            if(checkout){
                                                router.push("/cos/checkout")
                                            }
                                        }
                                        else{
                                            setCart([
                                                ...cart,
                                                productCart
                                            ])
                                            if(checkout){
                                                router.push("/cos/checkout")
                                            }
                                        }
                                    }
                                    addOns.map((addOn, index) => {
                                        if(addOn[1] == true){
                                            let addOnRaw = optionsRaw.filter((addOnRaw) => {
                                                return addOnRaw.name == addOn[0]
                                            })
                                            if(cart.length == 0){
                                                contorAddons = 0
                                            }
                                            else if(cart[cart.length - 1].addOns.length != addOns.length){
                                                contorAddons = 0
                                            }
                                            else if(cart[cart.length - 1].addOns.length != 0){
                                                if(addOn[0] != cart[cart.length - 1].addOns[index].name){
                                                    contorAddons = 0
                                                }
                                            }
                                            productCart.addOns.push(addOnRaw[0])
                                            addOnsPrice += addOnRaw[0].price
                                            if (index == addOns.length-1){
                                                if( contorAddons && cart[cart.length - 1].size.name == `${size.height}x${size.width}`){
                                                    let mutableCart = [...cart]
                                                    mutableCart[mutableCart.length - 1].number += 1
                                                    setCart(
                                                        mutableCart
                                                    )
                                                    if(checkout){
                                                        router.push("/cos/checkout")
                                                    }
                                                }
                                                else{
                                                    setCart([
                                                        ...cart,
                                                        productCart
                                                    ])
                                                    if(checkout){
                                                        router.push("/cos/checkout")
                                                    }
                                                }
                                            }
                                        }
                                        else{
                                            let addOnRaw = optionsRaw.filter((addOnRaw) => {
                                                return addOnRaw.group == addOn[0] && addOnRaw.typename == addOn[1]
                                            })
                                            if(cart.length == 0){
                                                contorAddons = 0
                                            }
                                            else if(cart[cart.length - 1].addOns.length != addOns.length){
                                                contorAddons = 0
                                            }
                                            else if(cart[cart.length - 1].addOns.length != 0){
                                                if(addOn[0] != cart[cart.length - 1].addOns[index].group || addOn[1] != cart[cart.length - 1].addOns[index].typename){
                                                    contorAddons = 0
                                                }
                                            }

                                            productCart.addOns.push(addOnRaw[0])
                                            addOnsPrice += addOnRaw[0].price

                                            if (index == addOns.length-1){
                                                if( contorAddons && cart[cart.length - 1].size.name == `${size.height}x${size.width}`){
                                                    let mutableCart = [...cart]
                                                    mutableCart[mutableCart.length - 1].number += 1
                                                    setCart(
                                                        mutableCart
                                                    )
                                                    if(checkout){
                                                        router.push("/cos/checkout")
                                                    }
                                                }
                                                else{
                                                    setCart([
                                                        ...cart,
                                                        productCart
                                                    ])
                                                    if(checkout){
                                                        router.push("/cos/checkout")
                                                    }
                                                }
                                            }
                                        }
                                    })
                                }
                            )
                        })
                }
                else{
                    size = data[0]

                    let addOnsPrice = 0

                    let productCart = {
                        product : {},
                        addOns : [],
                        size : size,
                        number : 1,
                        price : Math.trunc(getPrice(productData[0], size) * (1 + coeficientFinder(size)))
                    }

                    function flatten(obj) {
                        var result = Object.create(obj);
                        for(var key in result) {
                            result[key] = result[key];
                        }
                        return result;
                    }

                    fetch(`https://mirrors-md-admin.herokuapp.com/products?name_eq=${name}`)
                        .then(response => response.json())
                        .then(data => {
                            productCart.product = data[0]

                            if(addOns.length == 0){
                                if( cart.length != 0 && productCart.product.name == cart[cart.length - 1].product.name && cart[cart.length - 1].size.name == `${size.height}x${size.width}`){
                                    let mutableCart = [...cart]
                                    mutableCart[mutableCart.length - 1].number += 1
                                    setCart(
                                        mutableCart
                                    )
                                    if(checkout){
                                        router.push("/cos/checkout")
                                    }
                                }
                                else{
                                    setCart([
                                        ...cart,
                                        productCart
                                    ])
                                    if(checkout){
                                        router.push("/cos/checkout")
                                    }
                                }
                            }
                            addOns.map((addOn, index) => {
                                if(addOn[1] == true){
                                    let addOnRaw = optionsRaw.filter((addOnRaw) => {
                                        return addOnRaw.name == addOn[0]
                                    })
                                    if(cart.length == 0){
                                        contorAddons = 0
                                    }
                                    else if(cart[cart.length - 1].addOns.length != addOns.length){
                                        contorAddons = 0
                                    }
                                    else if(cart[cart.length - 1].addOns.length != 0){
                                        if(addOn[0] != cart[cart.length - 1].addOns[index].name){
                                            contorAddons = 0
                                        }
                                    }
                                    productCart.addOns.push(addOnRaw[0])
                                    addOnsPrice += addOnRaw[0].price
                                    if (index == addOns.length-1){
                                        if( contorAddons && cart[cart.length - 1].size.name == `${size.height}x${size.width}`){
                                            let mutableCart = [...cart]
                                            mutableCart[mutableCart.length - 1].number += 1
                                            setCart(
                                                mutableCart
                                            )
                                            if(checkout){
                                                router.push("/cos/checkout")
                                            }
                                        }
                                        else{
                                            setCart([
                                                ...cart,
                                                productCart
                                            ])
                                            if(checkout){
                                                router.push("/cos/checkout")
                                            }
                                        }
                                    }
                                }
                                else{
                                    let addOnRaw = optionsRaw.filter((addOnRaw) => {
                                        return addOnRaw.group == addOn[0] && addOnRaw.typename == addOn[1]
                                    })
                                    if(cart.length == 0){
                                        contorAddons = 0
                                    }
                                    else if(cart[cart.length - 1].addOns.length != addOns.length){
                                        contorAddons = 0
                                    }
                                    else if(cart[cart.length - 1].addOns.length != 0){
                                        if(addOn[0] != cart[cart.length - 1].addOns[index].group || addOn[1] != cart[cart.length - 1].addOns[index].typename){
                                            contorAddons = 0
                                        }
                                    }

                                    productCart.addOns.push(addOnRaw[0])
                                    addOnsPrice += addOnRaw[0].price

                                    if (index == addOns.length-1){
                                        if( contorAddons && cart[cart.length - 1].size.name == `${size.height}x${size.width}`){
                                            let mutableCart = [...cart]
                                            mutableCart[mutableCart.length - 1].number += 1
                                            setCart(
                                                mutableCart
                                            )
                                            if(checkout){
                                                router.push("/cos/checkout")
                                            }
                                        }
                                        else{
                                            setCart([
                                                ...cart,
                                                productCart
                                            ])
                                            if(checkout){
                                                router.push("/cos/checkout")
                                            }
                                        }
                                    }
                                }
                            })
                        }
                    )
                }
            })

        // fetch(`https://mirrors-md-admin.herokuapp.com/products?name_eq=${name}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         const requestOptions = {
        //             method: 'POST',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify({ 
        //                 name : 'React Order',
        //                 products: data
        //             })
        //         };

        //         fetch(`https://mirrors-md-admin.herokuapp.com/orders`, requestOptions)
        //             .then(response => response.json())
        //             .then(data => console.log(data))
        // });

        // console.log(addOns)

        // addOns.map((addOn) => {
        //     if(addOn[1] == true){
        //         fetch(`https://mirrors-md-admin.herokuapp.com/add-ons?name_eq=${addOn[0]}`)
        //             .then(response => response.json())
        //             .then(data => {
        //                 console.log(data)
        //                 fetchedAddons.push(data)
        //                 console.log(fetchedAddons)


            //             const requestOptions = {
            //                 method: 'POST',
            //                 headers: { 'Content-Type': 'application/json' },
            //                 body: JSON.stringify({ 
            //                     name : 'React Order',
            //                     add_ons: data
            //                 })
            //             };
        
            //             fetch(`https://mirrors-md-admin.herokuapp.com/orders`, requestOptions)
            //                 .then(response => response.json())
            //                 .then(data => console.log(data))

            //     })
            // }
        //     else{
        //         fetch(`https://mirrors-md-admin.herokuapp.com/add-ons?group_eq=${addOn[0]}&typename_eq=${addOn[1]}`)
        //             .then(response => response.json())
        //             .then(data => {
        //                 console.log(data)
        //                 fetchedAddons.push(data)
        //                 console.log(fetchedAddons)
        //         })
        //     }
        // })
        
    }

    useEffect(() => {
        // console.log("Cart object", cart)
        // console.log("JSON.stringify cart : ", JSON.stringify(cart))
        localStorage.setItem('cart', JSON.stringify(cart))
        const localCart = localStorage.getItem('cart')
        
    }, [cart])
    
    const [openImage, setOpenImage] = useState(0)

    const [showTooltip, setShowTooltip] = useState(false)

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

    const inputEl = useRef(null);

    return (
        <div className="w-full h-auto px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pt-128px md:pt-136px lg:pt-234px pb-88px md:pb-120px font-Ubuntu bg-ui-darkGrey">
            <div className="flex flex-row justify-start items-center text-lg-14 font-normal text-type-manatee w-auto mb-6">
                <Link href={lang == "ro" ? "/" : "/ru"}>
                    <a>
                        <span className="mr-1 hover:underline transition duration-300">
                            {
                                lang == "ro" ?
                                "Pagina principală"
                                :
                                "Главная страница"
                            }
                        </span>
                    </a>
                </Link>

                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>

                <Link href={lang == "ro" ? `/${productData[0].category.slug}` : `/ru/${productData[0].category.slug}`}>
                    <a>
                        <span className="mr-1">
                            {
                                lang=="ro" ?
                                productData[0].category.name
                                :
                                productData[0].category.nameru
                            }
                        </span>
                    </a>
                </Link>

                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>

                <span>
                    {
                        lang=="ro" ?
                        name
                        :
                        nameru
                    }
                </span>
            </div>

            <div className="w-full bg-ui-grey flex flex-col lg:flex-row justify-between items-stretch">
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

                <div className="w-full lg:w-408px bg-ui-white py-56px px-2 md:px-8">
                    <DropdownProduct2
                        name={"Dimensiuni recomandate"}
                        nameru={"Рекомендуемые размеры"}
                        options={productData[0].linkedsizes.map((size, index) => {
                            return (
                                {
                                    height : size.height,
                                    width : size.width,
                                    typename : size.name,
                                    typenameru : size.name,
                                    price : Math.trunc(getPrice(productData[0], size) * ( 1 + coeficientFinder(size)))
                                }
                            )
                        })}
                        register={register}
                        setPrice={setPrice}
                        price={price}
                        sizeGlobal={sizeGlobal}
                        setSizeGlobal={setSizeGlobal}
                        initialPrice={Math.trunc(getPrice(productData[0], productData[0].defaultsize) * (1 + coeficientFinder(productData[0].defaultsize)))}
                        minHeight={productData[0].smallestsize.height}
                        maxHeight={productData[0].biggestsize.height}
                        minWidth={productData[0].smallestsize.width}
                        maxWidth={productData[0].biggestsize.width}
                        coeficientFinder={coeficientFinder}
                        productData={productData[0]}
                        lang={lang}
                        optionsRaw={optionsRaw}
                    />
                </div>

                <div className="w-full lg:w-544px pt-6 lg:pt-72px pb-16 px-2 md:px-6 lg:px-8 bg-ui-white lg:bg-ui-grey relative h-full">
                    <h2 className="text-sm-h2 md:text-md-h2 lg:text-lg-h2 text-type-dark font-bold mb-5">
                        {
                            lang=="ro" ?
                            name
                            :
                            nameru
                        }
                    </h2>

                    <div className="text-lg-32 text-accent-accent mb-12">
                        {price} 
                        {
                            lang == "ro" ?
                            " Lei"
                            :
                            " Лей"
                        }
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="">

                        <div 
                            className="w-full cursor-pointer"
                            onClick={() => setOpenOptions(!openOptions)}
                        >
                            <div className="w-full flex flex-row justify-between items-center mb-2">
                                <div className="text-sm-h3 font-medium text-type-manatee">
                                    Opțiuni adăugătoare
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${openOptions ? "hidden" : "block"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${openOptions ? "block" : "hidden"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            </div>

                            <div className={`w-full h-0.5 bg-ui-blueishGrey ${openOptions ? "hidden" : "block"}`}/>
                        </div>

                        <Element name="test7" className="element" id="containerElement" style={{
                            position: 'relative',
                            height: '508px',
                            overflow: 'scroll',
                            borderRadius: "0px 0px 8px 8px",
                            border : "2px solid #C2D1D9",
                            boxShadow : "0px 2px 6px rgba(0, 0, 0, 0.08)",
                            display : openOptions ? "block" : "none"
                        }}>  

                            {options.map((option, index) =>
                                <DropdownProduct2
                                    name={option}
                                    nameru={optionsRu[index]}
                                    options={optionVariants.filter((optionObj) => optionObj.group == option || optionObj.name == option)}
                                    register={register}
                                    key={index}
                                    setPrice={setPrice}
                                    price={price}
                                    productData={productData[0]}
                                    lang={lang}
                                    optionsRaw={optionsRaw}
                                />
                            )}
                        </Element>

                        <div className={`w-full flex flex-col md:flex-row justify-between items-center ${openOptions ? "mt-6" : "mt-56px"}`}>

                            <input 
                                value={lang == "ro" ? "La pagina de Check-Out" : "Оформить заказ"} 
                                type="submit" 
                                className="w-full bg-transparent border-2 rounded-lg border-accent-accent h-12 flex flex-row justify-center items-center text-accent-accent font-medium mb-6 md:mb-0 hover:bg-accent-transparent transition duration-300 md:mr-4 cursor-pointer"
                                onClick={() => setCheckout(true)}
                            />

                            <input 
                                value={lang == "ro" ? "Adaugă în coș" : "Добавить в корзину"}
                                type="submit" 
                                className="w-full bg-accent-accent rounded-lg h-12 flex flex-row justify-center items-center text-ui-white font-medium hover:bg-accent-light transition duration-300 cursor-pointer"
                                onClick={() => setCheckout(false)}
                                data-tip={lang == "ro" ? "Produs adăugat la coș" : "Товар добавлен в корзину"}
                                data-event={"click"}
                            />

                            <ReactTooltip textColor="#FFFFFF" backgroundColor="#111215" clickable/>
                        </div>
                        
                    </form>


                </div>
            </div>
        </div>
    )
}