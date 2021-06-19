import Link from 'next/link'
import { useState, useContext} from 'react'
import Image from 'next/image'
import { CartContext } from '../context'

export default function Checkout() {

    const [step , setStep] = useState(1)
    const {cart, setCart} = useContext(CartContext)
    let priceTotal = 0

    return (
        <div className="w-full h-auto px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pt-128px md:pt-136px lg:pt-234px pb-120px font-Ubuntu bg-ui-darkGrey">
            <div className="flex flex-row justify-start items-center text-lg-14 font-normal text-type-manatee w-auto mb-8 md:mb-12">
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
                <Link href="/cos">
                    <a>
                        <span className="mr-1 hover:underline transition duration-300">
                            Coș
                        </span>
                    </a>
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span>
                    Întrebări frecvente
                </span>
            </div>
            <h2 className="text-sm-h2 md:text-md-h2 lg:text-lg-h2 text-type-dark font-bold w-full text-center mb-3">
                Înregistrarea comenzii
            </h2>
            <div className="h-px bg-ui-blueishGrey w-full mb-14 md:mb-68px"/>
            <div className="lg:px-268px">
                <div className="w-full flex flex-row justify-between items-start mb-16">
                    <div className="mt-2">
                        <div className="flex flex-row justify-center items-center w-full mb-2">
                            <div className="w-full bg-transparent h-0.5">
                            </div>
                            <div className="p-0.5">
                                <div className={`flex flex-row justify-center items-center h-20px w-20px rounded-full border-2 ${step == 1 || step > 1 ? "border-accent-accent" : "border-ui-blueishGrey"}`}>
                                    <div className={`bg-accent-accent rounded-full h-10px w-10px ${step == 1 ? "block" : "hidden"}`}/>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-accent-accent ${step > 1 ? "block" : "hidden"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className={`w-full h-0.5 ${ step > 1 ? "bg-accent-accent" : "bg-type-grey"}`}>
                            </div>
                        </div>
                        <div className={`${step == 1 ? "text-accent-accent" : "text-type-manatee"} text-lg-14 text-center`}>
                            Detalii de contact
                        </div>
                    </div>

                    <div className="flex-grow flex flex-row justify-center items-center h-6 mt-2">
                        <div className={`h-0.5 w-full ${ step > 1 ? "bg-accent-accent" : "bg-type-grey"}`}/>
                    </div>

                    <div className="mt-2">
                        <div className="flex flex-row justify-between items-center w-full mb-2">
                            <div className={`w-full h-0.5 ${ step > 1 ? "bg-accent-accent" : "bg-type-grey"}`}>
                            </div>
                            <div className="p-0.5">
                                <div className={`flex flex-row justify-center items-center h-20px w-20px rounded-full border-2 ${step == 2 || step > 2 ? "border-accent-accent" : "border-ui-blueishGrey"}`}>
                                    <div className={`bg-accent-accent rounded-full h-10px w-10px ${step == 2 ? "block" : "hidden"}`}/>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-accent-accent ${step > 2 ? "block" : "hidden"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className={`w-full h-0.5 ${ step > 2 ? "bg-accent-accent" : "bg-type-grey"}`}>
                            </div>
                        </div>
                        <div className={`${step == 2 ? "text-accent-accent" : "text-type-manatee"} text-lg-14 text-center`}>
                            Livrarea
                        </div>
                    </div>

                    <div className="flex-grow flex flex-row justify-center items-center h-6 mt-2">
                        <div className={`h-0.5 w-full ${ step > 2 ? "bg-accent-accent" : "bg-type-grey"}`}/>
                    </div>

                    <div className="mt-2">
                        <div className="flex flex-row justify-between items-center w-full mb-2">
                            <div className={`w-full h-0.5 ${ step > 2 ? "bg-accent-accent" : "bg-type-grey"}`}>
                            </div>
                            <div className="p-0.5">
                                <div className={`flex flex-row justify-center items-center h-20px w-20px rounded-full border-2 ${step == 3 || step > 3 ? "border-accent-accent" : "border-ui-blueishGrey"}`}>
                                    <div className={`bg-accent-accent rounded-full h-10px w-10px ${step == 3 ? "block" : "hidden"}`}/>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-accent-accent ${step > 3 ? "block" : "hidden"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className={`w-full h-0.5 ${ step > 3 ? "bg-accent-accent" : "bg-type-grey"}`}>
                            </div>
                        </div>
                        <div className={`${step == 3 ? "text-accent-accent" : "text-type-manatee"} text-lg-14 text-center`}>
                            Modalitatea de plată
                        </div>
                    </div>

                    <div className="flex-grow flex flex-row justify-center items-center h-6 mt-2">
                        <div className={`h-0.5 w-full ${ step > 3 ? "bg-accent-accent" : "bg-type-grey"}`}/>
                    </div>

                    <div className="mt-2">
                        <div className="flex flex-row justify-between items-center w-full mb-2">
                            <div className={`w-full h-0.5 ${ step > 3 ? "bg-accent-accent" : "bg-type-grey"}`}>
                            </div>
                            <div className="p-0.5">
                                <div className={`flex flex-row justify-center items-center h-20px w-20px rounded-full border-2 ${step == 4 || step > 4 ? "border-accent-accent" : "border-ui-blueishGrey"}`}>
                                    <div className={`bg-accent-accent rounded-full h-10px w-10px ${step == 4 ? "block" : "hidden"}`}/>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-accent-accent ${step > 4 ? "block" : "hidden"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className={`w-full h-0.5 bg-transparent`}>
                            </div>
                        </div>
                        <div className={`${step == 4 ? "text-accent-accent" : "text-type-manatee"} text-lg-14 text-center`}>
                            Plasarea comenzii
                        </div>
                    </div> 

                </div>

                <div className={`${step == 1 ? "block" : "hidden"} w-full bg-ui-white md:pt-14 px-6 py-10 md:pb-16 md:px-12 mb-12`}>
                    <div className="w-full flex flex-col md:flex-row justify-between items-start mb-6">
                        <div className="w-full mr-6 mb-6 md:mb-0">
                            <div className="mb-2 text-lg-14 font-medium text-type-manatee">
                                Nume
                            </div>
                            <input
                                className="w-full bg-ui-grey border border-ui-blueishGrey rounded-md p-4 text-type-dark text-lg-14"
                                type="text"
                            />
                        </div>

                        <div className="w-full">
                            <div className="mb-2 text-lg-14 font-medium text-type-manatee">
                                Prenume
                            </div>
                            <input
                                className="w-full bg-ui-grey border border-ui-blueishGrey rounded-md p-4 text-type-dark text-lg-14"
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="w-full flex flex-col md:flex-row justify-between items-start">
                        <div className="w-full mr-6 mb-6 md:mb-0">
                            <div className="mb-2 text-lg-14 font-medium text-type-manatee">
                                Email
                            </div>
                            <input
                                className="w-full bg-ui-grey border border-ui-blueishGrey rounded-md p-4 text-type-dark text-lg-14"
                                type="text"
                            />
                        </div>

                        <div className="w-full">
                            <div className="mb-2 text-lg-14 font-medium text-type-manatee">
                                Telefon
                            </div>
                            <input
                                className="w-full bg-ui-grey border border-ui-blueishGrey rounded-md p-4 text-type-dark text-lg-14"
                                type="text"
                            />
                        </div>
                    </div>
                </div>

                <div className={`${step == 2 ? "block" : "hidden"} w-full bg-ui-white md:pt-14 px-6 py-10 md:pb-16 md:px-12 mb-12`}>
                    <div className="w-full py-20px border border-ui-darkGrey flex flex-row justify-between items-center mb-6">
                        <div className="w-4 h-4 flex flex-row justify-center items-center mx-4">
                            <div className="border-ui-blueishGrey rounded-full w-3 h-3 border-2"/>
                        </div>
                        <div className="w-full mr-4 text-lg-14 text-type-grey">
                            Ridicare din oficiu, str. Calea Moșilor 9/1 etaj. 2
                        </div>
                        <div className="w-full text-lg-14 text-type-grey font-medium">
                            gratuit
                        </div>
                    </div>

                    <div className="w-full py-20px border border-ui-darkGrey flex flex-row justify-between items-center mb-6">
                        <div className="w-4 h-4 flex flex-row justify-center items-center mx-4">
                            <div className="border-ui-blueishGrey rounded-full w-3 h-3 border-2"/>
                        </div>
                        <div className="w-full mr-4 text-lg-14 text-type-grey">
                            Livrare până la ușă
                        </div>
                        <div className="w-full text-lg-14 text-type-grey font-medium">
                            150 lei
                        </div>
                    </div>

                    <div className="w-full p-3 text-type-manatee flex flex-row justify-between items-center text-lg-14 border border-ui-blueishGrey rounded-md mb-4">
                        <div>
                            Oras
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-14px w-14px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    <input
                        className="w-full p-3 text-type-manatee flex flex-row justify-between items-center text-lg-14 border border-ui-blueishGrey rounded-md"
                        placeholder="Adresa"
                    />
                </div>

                <div className={`${step == 3 ? "block" : "hidden"} w-full bg-ui-white md:pt-14 px-6 py-10 md:pb-16 md:px-12 mb-12`}>
                    <div className="w-full py-20px border border-ui-darkGrey flex flex-row justify-start items-center mb-6">
                        <div className="w-4 h-4 flex flex-row justify-center items-center mx-4">
                            <div className="border-ui-blueishGrey rounded-full w-3 h-3 border-2"/>
                        </div>
                        <div className="h-8 w-14 relative">
                            <Image
                                src="/checkout/visa.svg"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="h-8 w-10 relative mr-4">
                            <Image
                                src="/checkout/mastercard.svg"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="flex-grow text-lg-14 text-type-grey">
                            Transfer direct
                        </div>
                    </div>

                    <div className="w-full py-20px border border-ui-darkGrey flex flex-row justify-start items-center mb-6">
                        <div className="w-4 h-4 flex flex-row justify-center items-center mx-4">
                            <div className="border-ui-blueishGrey rounded-full w-3 h-3 border-2"/>
                        </div>
                        <div className="h-8 w-8 relative mr-4">
                            <Image
                                src="/checkout/cash.svg"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <div className="flex-grow text-lg-14 text-type-grey">
                            Cash la livrare
                        </div>
                    </div>
                </div>

                <div className={`${step == 4 ? "block" : "hidden"} w-full`}>
                    <div className="bg-ui-grey w-full px-6 py-14px text-type-manatee text-lg-p font-medium">
                        Comanda Dvs
                    </div>
                    {cart.map((product) => {
                        let addOnsPrice = 0
                        product.addOns.map((addOn) => {
                            addOnsPrice += addOn.price
                        })
                        let price = product.product.price + addOnsPrice
                        priceTotal += price
                        console.log(product)
                        return (
                            <div className="px-8 py-2 border border-ui-grey flex flex-row justify-start items-center bg-ui-white">
                                <div className="w-20 h-20 relative mr-4">
                                    <Image
                                        src={product.product.image[0].formats.small.url}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className="">
                                    <div className="text-lg-17 text-type-dark mb-10px font-medium">
                                        {product.product.name}
                                    </div>
                                    <div className="text-lg-14 text-accent-accent">
                                        {product.number + " x " + price + " lei"}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}
                    <div className="mt-4 w-full text-lg-p mb-6">
                        <div className="w-full bg-ui-white border border-ui-grey px-8 py-6 flex flex-row justify-between items-start">
                            <div className="font-medium text-type-dark w-full">
                                Sub-total
                            </div>
                            <div className="text-type-manatee w-full">
                                {priceTotal + " lei"}
                            </div>
                        </div>

                        <div className="w-full bg-ui-white border border-ui-grey px-8 py-6 flex flex-row justify-between items-start">
                            <div className="font-medium text-type-dark w-full">
                                Livrare
                            </div>
                            <div className="text-type-manatee w-full">
                                <div className="mb-2 font-medium">
                                    livrare gratuita
                                </div>
                                <div>
                                    Livrare până la ușă,
                                </div>
                                <div>
                                    str. Bucuresti 72
                                </div>
                            </div>
                        </div>

                        <div className="w-full bg-ui-white border border-ui-grey px-8 py-6 flex flex-row justify-between items-start text-accent-accent">
                            <div className="font-medium w-full">
                                Total
                            </div>
                            <div className="text-type-manatee w-full">
                                {priceTotal + " lei"}
                            </div>
                        </div>
                    </div>

                    <div className="text-lg-p text-type-grey mb-84px">
                        Datele dvs. personale vor fi utilizate pentru a vă procesa comanda, pentru a vă sprijini experiența pe acest site web și în alte scopuri descrise în pagina noastră <span className="text-accent-accent">politică de confidențialitate</span>.
                    </div>
                </div>

                <div 
                    className="bg-accent-accent text-ui-white rounded-md text-lg-button font-bold flex flex-row justify-center items-center mx-auto h-52px w-full lg:w-500px"
                    onClick={ () => {
                        setStep(step + 1)
                    }}
                >
                    {
                        step == 4 ? "Plasează comanda" : "Continuă"
                    }
                </div>
            </div>
        </div>
    )
}