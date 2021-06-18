import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import {useContext} from "react"
import {CartContext} from "../../components/context"

export default function CosProducts(){

    const {cart, setCart} = useContext(CartContext)
    let optionsPrice = 0

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
        console.log(cart)
    }, [cart])
    return (
        <div className="w-full h-auto px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pt-128px md:pt-136px lg:pt-234px pb-180px font-Ubuntu bg-ui-darkGrey">
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

            <div className="w-full rounded-xl bg-ui-white mb-20">
                {
                    cart.map((product, index) => {
                        optionsPrice = 0
                        return(
                            <div className="flex flex-col md:flex-row w-full border-l-0 border-b-2 border-t-0 border-r-0 border-ui-darkGrey">
                                <div className="py-6 px-2 lg:px-6 md:w-cart-md lg:w-cart-lg flex flex-row justify-start items-center border-l-0 border-b md:border-b-0 border-t-0 border-r-2 border-ui-darkGrey">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-6 w-6 text-type-grey mr-2 cursor-pointer" 
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
                                    <div className="w-full flex flex-row md:flex-col lg:flex-row justify-start items-start lg:items-center">
                                        <div className="lg:ml-6 w-20 h-20 lg:w-112px lg:h-112px relative mr-6 md:mb-6 lg:mb-0">
                                            <Image
                                                src="/product/product.png"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-lg-17 text-type-manatee font-medium mb-2">
                                                {product.product.name}
                                            </div>
                                            <div className="text-lg-14 text-type-grey mb-4">
                                                90 x 90 cm
                                            </div>
                                            <div className="flex flex-row justify-start items-center text-accent-accent">
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
                                    
                                    <div className="flex flex-row justify-start items-center text-accent-accent mt-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-14px w-14px mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                        <div className="text-lg-12">
                                            Configurați opțiunile
                                        </div>
                                    </div>
                                </div>
                                <div className="py-6 px-2 lg:px-6 md:w-40 lg:w-272px border-l-0 border-b md:border-b-0 border-t-0 border-r-2 border-ui-darkGrey flex flex-row justify-center items-center">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-8 w-8 text-type-dark cursor-pointer" 
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
                            
                                    <div className="bg-ui-grey rounded-lg h-12 text-lg-32 text-type-manatee px-18px mx-2 lg:mx-4 flex flex-row justify-center items-center">
                                        {product.number}
                                    </div>

                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-8 w-8 text-type-dark cursor-pointer" 
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
                                <div className="py-6 px-2 lg:px-8 md:w-40 lg:w-272px border-l-0 border-b md:border-b-0 border-t-0 border-r-2 border-ui-darkGrey text-lg-14 text-type-grey flex flex-col justify-between">
                                    <div className="w-full">
                                        <div className="flex flex-row justify-between items-start w-full mb-2">
                                            <div>
                                                Oglinda
                                            </div>
                                            <div>
                                                2 144 lei
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-between items-start w-full mb-2">
                                            <div>
                                                Optiuni
                                            </div>
                                            <div>
                                                {optionsPrice+" lei"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between items-start text-type-manatee font-bold w-full">
                                        <div>
                                            Total
                                        </div>
                                        <div>
                                            8 854 lei
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
                    <div className="text-sm-h4 md:text-lg-28 text-type-manatee font-bold mb-4">
                        Comentariu
                    </div>
                    <input
                        type="text"
                        className="w-full bg-ui-grey rounded-lg outline-none p-4 text-type-grey min-h-96px"
                        placeholder="Mesajul Dvs..."
                    />
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
                                29 856 lei
                            </div>
                        </div>
                        <div className="flex flex-row justify-center itemes-start p-2 border-ui-darkGrey w-full">
                            <div className="w-full bg-accent-accent text-ui-white h-52px text-lg-button font-bold flex flex-row justify-center items-center rounded-lg">
                                Finalizează comanda
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}