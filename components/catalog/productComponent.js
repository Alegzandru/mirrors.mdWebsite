import DropdownProduct from "./DropdownProduct"
import { useForm } from "react-hook-form";
import Image from "next/image"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {useState, useContext, useEffect} from "react"
import {CartContext} from "../../components/context"
import Link from 'next/link'

export default function ProductComponent ({deviceType, name, price, images, options, optionVariants, productData, optionsRaw}) {

    const {cart, setCart} = useContext(CartContext)

    let contorAddons = 1

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        contorAddons = 1
        const addOns = Object.entries(data).filter((addOn) => addOn[1] != null && addOn[1] != false)
        console.log(addOns)

        let productCart = {
            product : {},
            addOns : [],
            number : 1
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
                    if( cart.length != 0 && productCart.product.name == cart[cart.length - 1].product.name){
                        console.log("Changed product number")
                        let mutableCart = [...cart]
                        mutableCart[mutableCart.length - 1].number += 1
                        setCart(
                            mutableCart
                        )
                    }
                    else{
                        console.log("Added product")
                        setCart([
                            ...cart,
                            productCart
                        ])
                    }
                }
                addOns.map((addOn, index) => {
                    if(addOn[1] == true){
                        let addOnRaw = optionsRaw.filter((addOnRaw) => {
                            return addOnRaw.name == addOn[0]
                        })
                        console.log("Add on raw ", addOnRaw)
                        if(cart.length == 0){
                            contorAddons = 0
                            console.log("Checkbox element step 1 stop")
                        }
                        else if(cart[cart.length - 1].addOns.length != addOns.length){
                            contorAddons = 0
                            console.log("Checkbox element step 2 stop")
                        }
                        else if(cart[cart.length - 1].addOns.length != 0){
                            console.log("Checkbox on index ", index, " ", cart[cart.length - 1].addOns[index])
                            if(addOn[0] != cart[cart.length - 1].addOns[index].name){
                                contorAddons = 0
                                console.log("Checkbox element step 3 stop")
                            }
                        }
                        console.log("Contor ", contorAddons)
                        console.log(addOn[0])
                        fetch(`https://mirrors-md-admin.herokuapp.com/add-ons?id_eq=${addOnRaw[0].id}`)
                            .then(response => response.json())
                            .then(data => {
                                productCart.addOns.push(data[0])
                                console.log(data)
                                if (index == addOns.length-1){
                                    if( contorAddons ){
                                        console.log("Changed product number")
                                        let mutableCart = [...cart]
                                        mutableCart[mutableCart.length - 1].number += 1
                                        setCart(
                                            mutableCart
                                        )
                                    }
                                    else{
                                        console.log("Added product")
                                        setCart([
                                            ...cart,
                                            productCart
                                        ])
                                    }
                                }
                            })
                    }
                    else{
                        let addOnRaw = optionsRaw.filter((addOnRaw) => {
                            return addOnRaw.group == addOn[0] && addOnRaw.typename == addOn[1]
                        })
                        console.log("Add on raw ", addOnRaw)
                        if(cart.length == 0){
                            contorAddons = 0
                            console.log("Radio element step 1 stop")
                        }
                        else if(cart[cart.length - 1].addOns.length != addOns.length){
                            contorAddons = 0
                            console.log("Radio element step 2 stop")
                        }
                        else if(cart[cart.length - 1].addOns.length != 0){
                            console.log("Radio on index ", index, " ", cart[cart.length - 1].addOns[index])
                            if(addOn[0] != cart[cart.length - 1].addOns[index].group || addOn[1] != cart[cart.length - 1].addOns[index].typename){
                                contorAddons = 0
                                console.log("Radio element step 3 stop")
                            }
                        }
                        console.log("Contor ", contorAddons)
                        fetch(`https://mirrors-md-admin.herokuapp.com/add-ons?id_eq=${addOnRaw[0].id}`)
                            .then(response => response.json())
                            .then(data => {
                                productCart.addOns.push(data[0])
                                // console.log(data[0])
                                if (index == addOns.length-1){
                                    if( contorAddons ){
                                        console.log("Changed product number")
                                        let mutableCart = [...cart]
                                        mutableCart[mutableCart.length - 1].number += 1
                                        setCart(
                                            mutableCart
                                        )
                                    }
                                    else{
                                        console.log("Added product")
                                        setCart([
                                            ...cart,
                                            productCart
                                        ])
                                    }
                                }
                            })
                    }
                })
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


        //                 const requestOptions = {
        //                     method: 'POST',
        //                     headers: { 'Content-Type': 'application/json' },
        //                     body: JSON.stringify({ 
        //                         name : 'React Order',
        //                         add_ons: data
        //                     })
        //                 };
        
        //                 fetch(`https://mirrors-md-admin.herokuapp.com/orders`, requestOptions)
        //                     .then(response => response.json())
        //                     .then(data => console.log(data))

        //         })
        //     }
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
        console.log("JSON parsed cart : ", JSON.parse(localCart) )
        
    }, [cart])
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
        <div className="w-full h-auto px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pt-128px md:pt-136px lg:pt-234px pb-88px md:pb-120px font-Ubuntu bg-ui-darkGrey">
            <div className="flex flex-row justify-start items-center text-lg-14 font-normal text-type-manatee w-auto mb-6">
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
                                options={optionVariants.filter((optionObj) => optionObj.group == option || optionObj.name == option)}
                                register={register}
                                key={index}
                            />
                        )}

                        <div className="w-full flex flex-col md:flex-row justify-between items-center mt-14">

                            <input value="La pagina de Check-Out" type="submit" className="w-full bg-transparent border-2 rounded-lg border-accent-accent h-12 flex flex-row justify-center items-center text-accent-accent md:mr-4 font-medium mb-6 md:mb-0"/>
                            <input 
                                value="Adaugă în coș" 
                                type="submit" 
                                className="w-full bg-accent-accent rounded-lg h-12 flex flex-row justify-center items-center text-ui-white font-medium"
                                // onClick={() => {
                                //     const productCart = {
                                //         product : {
                                //             name
                                //         },
                                //         addOns : {
                                            
                                //         }
                                //     }
                                //     console.log("")
                                // }}
                            />

                        </div>
                        
                    </form>

                </div>
            </div>
        </div>
    )
}