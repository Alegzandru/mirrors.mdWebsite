import Link from 'next/link'
import { useState, useContext, useEffect, useRef} from 'react'
import Image from 'next/image'
import { CartContext, PopupContext } from '../context'
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from 'uuid';
import Lottie from "lottie-react";
import done from "./done.json"
import loading from "./loading.json"
import { useRouter } from 'next/router'
var md5 = require('md5');


export default function Checkout({lang}) {

    const [step , setStep] = useState(1)
    const {cart, setCart} = useContext(CartContext)
    const [userInfo, setUserInfo] = useState({})
    const [popupLoading, setPopupLoading] = useState()
    const [popupDone, setPopupDone] = useState()
    const {popupOpen, setPopupOpen} = useContext(PopupContext)
    let priceTotal = 0

    const { reset, register, handleSubmit, watch, formState: { errors } } = useForm();

    const router = useRouter()

    const sendMailOwner = async (data) => {
        try {
            await fetch("/api/owner", {
                "method": "POST",
                "headers": { "content-type": "application/json" },
                "body": JSON.stringify(data)
            })
        } 
        catch (error) {
        }
    }

    const sendMailClient = async (data) => {
        try {
            await fetch("/api/client", {
                "method": "POST",
                "headers": { "content-type": "application/json" },
                "body": JSON.stringify(data)
            })
        } 
        catch (error) {
        }
    }

    const formRef = useRef(null);

    const fillInputs = (PaymentId, ExpiryDate, Signature) => {
        const inputs = formRef.current.elements;

        inputs[0].name = "operation"
        inputs[1].name = "ExpiryDate"
        inputs[2].name = "Signature"

        inputs[0].value = PaymentId;
        inputs[1].value = ExpiryDate;
        inputs[2].value = Signature;
    }

    const onSubmit = (data) => {
        setUserInfo({...data})
        
        if(step == 4){
            setPopupOpen(1)
            setPopupLoading(1)

            let orders = []
            cart.map((cartProduct, index) => {
                let price = cartProduct.price
                cartProduct.addOns.map((addOn) => {
                    price += addOn.price
                })

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        products : [cartProduct.product],
                        add_ons : cartProduct.addOns,
                        price : price,
                        number : cartProduct.number
                    })
                }

                
                fetch(`https://mirrors-md-admin.herokuapp.com/orders`, requestOptions)
                .then(response => response.json())
                .then(dataInside => {
                    orders.push(
                        {
                            ...dataInside,
                            image : dataInside.products[0].image[0].formats.small.url
                        }
                    )
                    if(index == cart.length -1 ){
                        const requestOptionsClient = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                                name : data.nume + " " + data.prenume,
                                phone : data.telefon,
                                address : data.adresa,
                                email : data.email,
                                pret : userInfo.livrare == "livrare_la_usa" ? priceTotal + 150 : priceTotal,
                                mod_de_plata : data.plata,
                                mod_de_livrare : data.livrare,
                                orders : orders,
                                comentariu : data.comentariu
                            })
                        };
            
                        fetch(`https://mirrors-md-admin.herokuapp.com/clients`, requestOptionsClient)
                            .then(response => response.json())
                            .then(async (strapiData) => {

                                let ClientCode = uuidv4()
                                let ExternalID = Math.floor(Math.random() * Date.now())

                                let ExpiryDate = "2022-01-01T00:00:00"
                                let secretKey = process.env.NEXT_PUBLIC_PAYNET_SECRET

                                let signatureRaw = "498"+strapiData.address+"Chisinau"+ClientCode+"Moldova"+strapiData.email+userInfo.prenume+userInfo.nume+strapiData.phone+ExpiryDate+ExternalID+"388417"+"Paynet"+"1"+"Cumpararea oglinzilor pe site-ul mirrors.md"+"Cumpărarea oglinzilor online"

                                let productsPaynet = orders.map((order, index) => {
                                    signatureRaw += order.number+order.products[0].id+order.products[0].slug+`Produsul ${order.products[0].name}`+order.products[0].category+"Produs"+1+order.products[0].name+order.products[0].price+1
                                    return({
                                        Amount : Math.trunc(order.number * order.products[0].price * 100),
                                        Barcode : order.products[0].id,
                                        Code : order.products[0].slug,
                                        Description : `Produsul ${order.products[0].name}`,
                                        GroupId : order.products[0].category,
                                        GroupName : "Produs",
                                        LineNo : 1,
                                        Name : order.products[0].name,
                                        Quantity : Math.trunc(order.number),
                                        UnitPrice : Math.trunc(order.products[0].price * 100),
                                        UnitProduct : 1
                                    })
                                })
                                
                                orders.map((order, index) => {
                                    order.add_ons.map((addOn, indexAddon) => {
                                        signatureRaw += order.number+order.add_ons[indexAddon].id+order.add_ons[indexAddon].name+`Addon-ul ${order.add_ons[indexAddon].name}`+2+"Add On"+1+order.add_ons[indexAddon].name+order.add_ons[indexAddon].price+1
                                        productsPaynet.push({
                                            Amount : Math.trunc(order.number * order.products[0].price * 100),
                                            Barcode : order.add_ons[indexAddon].id,
                                            Code : order.add_ons[indexAddon].name,
                                            Description : `Addon-ul ${order.add_ons[indexAddon].name}`,
                                            GroupId : 2,
                                            GroupName : "Add On",
                                            LineNo : 1,
                                            Name : order.add_ons[indexAddon].name,
                                            Quantity : Math.trunc(order.number),
                                            UnitPrice : Math.trunc(order.products[0].price * 100),
                                            UnitProduct : 1
                                        })
                                    })
                                })

                                // sendMailOwner({
                                //     ...strapiData,
                                //     orders : orders
                                // })
                                // sendMailClient({
                                //     ...strapiData,
                                //     orders: orders
                                // })

                                let signature = btoa(md5(signatureRaw + secretKey))

                                if(strapiData.mod_de_plata == "card"){
    
                                    var details = {
                                        'grant_type': 'password',
                                        'username': '370455',
                                        'password' : process.env.NEXT_PUBLIC_PAYNET_PASSWORD,
                                        'merchantcode' : '388417'
                                    };
                                    
                                    var formBody = [];
                                    for (var property in details) {
                                      var encodedKey = encodeURIComponent(property);
                                      var encodedValue = encodeURIComponent(details[property]);
                                      formBody.push(encodedKey + "=" + encodedValue);
                                    }
                                    formBody = formBody.join("&");
        
                                    const authRequestOptions = {
                                        method : 'POST',
                                        headers : {
                                            'Content-Type': 'application/x-www-form-urlencoded',
                                            'Accept-Language' : 'ro-RO'
                                        },
                                        body : formBody
                                    }

                                    fetch("https://nameless-shore-75507.herokuapp.com/https://test.paynet.md:4446/auth", authRequestOptions)
                                        .then(response => response.json())
                                        .then(async (dataAuth) => {

                                            const requestOptionsPaynet = {
                                                method: 'POST',
                                                headers: { 
                                                    'Content-Type': 'application/json',
                                                    'Authorization' : `Bearer ${dataAuth.access_token}`
                                                },
                                                body: JSON.stringify({ 
                                                    Invoice : ExternalID,
                                                    Currency : 498,
                                                    MerchantCode : "388417",
                                                    Customer : {
                                                        Code : ClientCode,
                                                        NameFirst : userInfo.prenume,
                                                        NameLast : userInfo.nume,
                                                        PhoneNumber : strapiData.phone,
                                                        email : strapiData.email,
                                                        Country : "Moldova",
                                                        City : "Chisinau",
                                                        Address : strapiData.address
                                                    },
                                                    Services : [{
                                                        Name : "Cumpărarea oglinzilor online",
                                                        Description : "Cumpararea oglinzilor pe site-ul mirrors.md",
                                                        Amount : Math.trunc(strapiData.pret * 100),
                                                        products : productsPaynet
                                                    }],
                                                    ExpiryDate : ExpiryDate,
                                                    SignVersion : "v05",
                                                    LinkUrlSucces : "https://www.mirrors.md",
                                                    LinkUrlCancel : "https://www.mirrors.md/cos",
                                                    MoneyType : {
                                                        Code : "Paynet"
                                                    }
                                                })
                                            };
                                           
                                            try {
                                                await fetch("https://nameless-shore-75507.herokuapp.com/https://test.paynet.md:4446/api/payments", requestOptionsPaynet)
                                                    .then(response => response.json())
                                                    .then(async (data) => {
                                                        
                                                        try {
                                                            fillInputs(data.PaymentId, data.ExpiryDate, data.Signature);
                                                            formRef.current.submit();

                                                            const requestOptionsNotifications = {
                                                                method: 'POST',
                                                                headers: { 
                                                                    'Content-Type': 'application/json',
                                                                    'Authorization' : `Bearer ${dataAuth.access_token}`
                                                                },
                                                                body: JSON.stringify({
                                                                    Eventid : Math.trunc(Math.random() * Date.now()),
                                                                    EventType : "Paid",
                                                                    Payment : {
                                                                        ID : data.PaymentId,
                                                                        ExternalID : ExternalID,
                                                                        Merchant : "388417",
                                                                        Customer : ClientCode,
                                                                        Amount : Math.trunc(strapiData.pret * 100)
                                                                    }
                                                                })
                                                            }

                                                            fetch("https://nameless-shore-75507.herokuapp.com/https://www.mirrors.md/payment/paynet/callback", requestOptionsNotifications)

                                                            setPopupLoading(0)
                                                            setPopupDone(1)

                                                            setTimeout(() => {
                                                                setPopupDone(0)
                                                                setPopupOpen(0)

                                                                setTimeout(() => {
                                                                    localStorage.setItem('cart', "[]")
                                                                    setCart([])
                                                                    router.push("/")
                                                                }, 200)

                                                            }, 1200)

                                                        }
                                                        catch(error){
                                                            console.log("Error with redirect : ", error)
                                                        }
                                                    })
                                            } catch (error) {
                                                console.log("Error with sending payment : ", error)
                                            }
                                        })

                                }
                                else{
                                    setPopupLoading(0)
                                    setPopupDone(1)
    
                                    setTimeout(() => {
                                        setPopupDone(0)
                                        setPopupOpen(0)

                                        setTimeout(() => {
                                            localStorage.setItem('cart', "[]")
                                            setCart([])
                                            router.push("/")
                                        }, 200)

                                    }, 1200)

                                }

                            })
                    }
                })
            })
        }
        else{
            setStep(step+1)
        }
    }

    return (
        <div>
            <div className={`w-288px h-240px bg-ui-white fixed top-checkout-top left-checkout-left flex flex-col items-center justify-center rounded-xl ${popupDone ? "block" : "hidden"} z-20`}>
                <div className="w-240px h-120px transform scale-150">
                    <Lottie animationData={done}/>
                </div>
                <div className="w-240px text-sm-p md:text-md-p lg:text-lg-p text-type-manatee">
                    {
                        lang == "ro" ? 
                        "Comanda a fost procesată. Vei fi telefonat in cel mai scurt timp posibil"
                        :
                        "Заказ обработан. Вам позвонят в ближайшее время"
                    }
                </div>
            </div>

            <div className={`w-288px h-240px bg-ui-white fixed top-checkout-top left-checkout-left flex flex-col items-center justify-center rounded-xl ${popupLoading ? "block" : "hidden"} z-20`}>
                <div className="w-240px h-120px transform scale-150">
                    <Lottie animationData={loading}/>
                </div>
                <div className="w-240px text-sm-p md:text-md-p lg:text-lg-p text-type-manatee">
                    {
                        lang == "ro" ? 
                        "Comanda se procesează"
                        :
                        "Заказ обрабатывается"
                    }
                </div>
            </div>

            <form className={`w-full h-auto px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pt-128px md:pt-136px lg:pt-234px pb-120px font-Ubuntu bg-ui-darkGrey ${popupOpen ? "filter brightness-50" : ""} transition duration-300`}>

                <div className="flex flex-row justify-start items-center text-lg-14 font-normal text-type-manatee w-auto mb-8 md:mb-12">
                    <Link href="/">
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
                    <Link href="/cos">
                        <a>
                            <span className="mr-1 hover:underline transition duration-300">
                                {
                                    lang == "ro" ?
                                    "Coș"
                                    :
                                    "Корзина"
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
                            "Checkout"
                            :
                            "Checkout"
                        }
                    </span>
                </div>
                <h2 className="text-sm-h2 md:text-md-h2 lg:text-lg-h2 text-type-dark font-bold w-full text-center mb-3">
                    Înregistrarea comenzii
                </h2>
                <div className="h-px bg-ui-blueishGrey w-full mb-14 md:mb-68px"/>
                <div className="lg:px-268px">
                    <div className="w-full flex flex-row justify-between items-start mb-16">
                        <div 
                            className="mt-2 cursor-pointer"
                            onClick={() => {
                                if(step > 1){
                                    setStep(1)
                                }
                            }}
                        >
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

                        <div 
                            className="mt-2 cursor-pointer"
                            onClick={() => {
                                if(step > 2){
                                    setStep(2)
                                }
                            }}
                        >
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

                        <div 
                            className="mt-2 cursor-pointer"
                            onClick={() => {
                                if(step > 3){
                                    setStep(3)
                                }
                            }}
                        >
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

                        <div 
                            className="mt-2 cursor-pointer"
                        >
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
                                    Nume <span className="text-accent-error">*</span>
                                </div>
                                <input
                                    className={`w-full bg-ui-grey border-1.5px border-ui-blueishGrey rounded-md p-4 text-type-dark text-lg-14 ${errors.nume? "errorInput" : "inputFocused"}`}
                                    type="text"
                                    {...register("nume", { required: step == 1 ? true : false})}
                                />
                                {errors.nume?.type === 'required' && 
                                    <div className="text-accent-error text-lg-12 mt-2">
                                        * Introduceți numele Dvs.
                                    </div>
                                }
                                
                            </div>

                            <div className="w-full">
                                <div className="mb-2 text-lg-14 font-medium text-type-manatee">
                                    Prenume <span className="text-accent-error">*</span>
                                </div>
                                <input
                                    className={`w-full bg-ui-grey border-1.5px border-ui-blueishGrey rounded-md p-4 text-type-dark text-lg-14 ${errors.prenume? "errorInput" : "inputFocused"}`}
                                    type="text"
                                    {...register("prenume", { required: step == 1 ? true : false })}
                                />
                                {errors.prenume?.type === 'required' && 
                                    <div className="text-accent-error text-lg-12 mt-2">
                                        * Introduceți prenumele Dvs.
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="w-full flex flex-col md:flex-row justify-between items-start">
                            <div className="w-full mr-6 mb-6 md:mb-0">
                                <div className="mb-2 text-lg-14 font-medium text-type-manatee">
                                    Email <span className="text-accent-error">*</span>
                                </div>
                                <input
                                    className={`w-full bg-ui-grey border-1.5px border-ui-blueishGrey rounded-md p-4 text-type-dark text-lg-14 ${errors.email? "errorInput" : "inputFocused"}`}
                                    type="text"
                                    {...register("email", { required: step == 1 ? true : false })}
                                />
                                {errors.email?.type === 'required' && 
                                    <div className="text-accent-error text-lg-12 mt-2">
                                        * Introduceți poșta electronică
                                    </div>
                                }
                            </div>

                            <div className="w-full">
                                <div className="mb-2 text-lg-14 font-medium text-type-manatee">
                                    Telefon <span className="text-accent-error">*</span>
                                </div>
                                <input
                                    className={`w-full bg-ui-grey border-1.5px border-ui-blueishGrey rounded-md p-4 text-type-dark text-lg-14 ${errors.telefon? "errorInput" : "inputFocused"}`}
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    {...register("telefon", { required: step == 1 ? true : false , minLength: 8})}
                                />
                                {errors.telefon?.type === 'required' && 
                                    <div className="text-accent-error text-lg-12 mt-2">
                                        * Introduceți numărul de telefon
                                    </div>
                                }
                                {errors.telefon?.type === 'minLength' && 
                                    <div className="text-accent-error text-lg-12 mt-2">
                                        * Lungimea minimă a numărului este 8 cifre
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    <div className={`${step == 2 ? "block" : "hidden"} w-full bg-ui-white md:pt-14 px-6 py-10 md:pb-16 md:px-12 mb-12`}>
                        <label className="w-full py-20px border-1.5px border-ui-darkGrey flex flex-row justify-between items-center mb-6 focus-within:text-type-dark text-type-grey transition duration-300 cursor-pointer">
                            {/* <div className="w-4 h-4 flex flex-row justify-center items-center mx-4">
                                <div className="border-ui-blueishGrey rounded-full w-3 h-3 border-2"/>
                            </div> */}
                            <input
                                type="radio"
                                name="livrare"
                                value="preluare_din_oficiu"
                                className="w-3 h-3 border-2 mx-4 border-ui-blueishGrey"
                                {...register("livrare", { required: step == 2 ? true : false })}
                            />
                            <div className="w-full mr-4 text-lg-14">
                                Ridicare din oficiu, str. Ismail 98
                            </div>
                            <div className="w-full text-lg-14 font-medium">
                                gratuit
                            </div>
                        </label>

                        <label className="w-full py-20px border-1.5px border-ui-darkGrey flex flex-row justify-between items-center mb-6 focus-within:text-type-dark text-type-grey transition duration-300 cursor-pointer">
                            {/* <div className="w-4 h-4 flex flex-row justify-center items-center mx-4">
                                <div className="border-ui-blueishGrey rounded-full w-3 h-3 border-2"/>
                            </div> */}
                            <input
                                type="radio"
                                name="livrare"
                                value="livrare_la_usa"
                                className="w-3 h-3 border-2 mx-4 border-ui-blueishGrey"
                                {...register("livrare", { required: step == 2 ? true : false })}
                            />
                            {errors.livrare?.type === 'required' && 
                                <div className="text-accent-error text-lg-12 mt-2">
                                    * Introduceți modul de livrare
                                </div>
                            }
                            <div className="w-full mr-4 text-lg-14">
                                Livrare până la ușă
                            </div>
                            <div className="w-full text-lg-14 font-medium">
                                150 lei
                            </div>
                        </label>

                        {/* <div className="w-full p-3 text-type-manatee flex flex-row justify-between items-center text-lg-14 border-1.5px border-ui-blueishGrey rounded-md mb-4">
                            <div>
                                Oras
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-14px w-14px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div> */}

                        <div className="mb-2 text-lg-14 font-medium text-type-manatee">
                            Oraș <span className="text-accent-error">*</span>
                        </div>
                        <input
                            className={`w-full p-3 text-type-manatee flex flex-row justify-between items-center text-lg-14 border-1.5px border-ui-blueishGrey rounded-md ${errors.oras? "errorInput" : "inputFocused"}`}
                            placeholder="Ex : Chișinău"
                            {...register("oras", { required: step == 2 ? true : false })}
                        />
                        {errors.oras?.type === 'required' && 
                            <div className="text-accent-error text-lg-12 mt-2">
                                * Introduceți orașul Dvs.
                            </div>
                        }

                        <div className="mb-2 text-lg-14 font-medium text-type-manatee mt-4">
                            Adresa <span className="text-accent-error">*</span>
                        </div>
                        <input
                            className={`w-full p-3 text-type-manatee flex flex-row justify-between items-center text-lg-14 border-1.5px border-ui-blueishGrey rounded-md ${errors.adresa? "errorInput" : "inputFocused"}`}
                            placeholder="Ex : str. Calea Moșilor 9/1 etaj. 2"
                            {...register("adresa", { required: step == 2 ? true : false })}
                        />
                        {errors.adresa?.type === 'required' && 
                            <div className="text-accent-error text-lg-12 mt-2">
                                * Introduceți adresa Dvs.
                            </div>
                        }

                    </div>

                    <div className={`${step == 3 ? "block" : "hidden"} w-full bg-ui-white md:pt-14 px-6 py-10 md:pb-16 md:px-12 mb-12`}>
                        <label className="w-full py-20px border-1.5px border-ui-darkGrey flex flex-row justify-start items-center mb-6 text-type-grey focus-within:text-type-dark transition duration-300 cursor-pointer">
                            {/* <div className="w-4 h-4 flex flex-row justify-center items-center mx-4">
                                <div className="border-ui-blueishGrey rounded-full w-3 h-3 border-2"/>
                            </div> */}
                            <input
                                type="radio"
                                name="plata"
                                value="card"
                                className="w-3 h-3 border-2 mx-4 border-ui-blueishGrey"
                                {...register("plata", { required: step == 3 ? true : false })}
                            />
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
                            <div className="flex-grow text-lg-14">
                                Transfer direct
                            </div>
                        </label>

                        <label className="w-full py-20px border-1.5px border-ui-darkGrey flex flex-row justify-start items-center mb-6 text-type-grey focus-within:text-type-dark transition duration-300 cursor-pointer">
                            {/* <div className="w-4 h-4 flex flex-row justify-center items-center mx-4">
                                <div className="border-ui-blueishGrey rounded-full w-3 h-3 border-2"/>
                            </div> */}
                            <input
                                type="radio"
                                name="plata"
                                value="numerar"
                                className="w-3 h-3 border-2 mx-4 border-ui-blueishGrey"
                                {...register("plata", { required: step == 3 ? true : false })}
                            />
                            <div className="h-8 w-8 relative mr-4">
                                <Image
                                    src="/checkout/cash.svg"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="flex-grow text-lg-14">
                                Cash la livrare
                            </div>
                        </label>
                        {errors.plata?.type === 'required' && 
                            <div className="text-accent-error text-lg-12 mt-2">
                                * Introduceți modul de plată
                            </div>
                        }
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
                            let priceSingular = product.price + addOnsPrice
                            let price = priceSingular * product.number
                            priceTotal += price
                            return (
                                <div className="px-8 py-2 border-1.5px border-ui-grey flex flex-row justify-start items-center bg-ui-white">
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
                                            {product.number + " x " + priceSingular + " lei"}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )}
                        <div className="mt-4 w-full text-lg-p mb-6">
                            <div className="w-full bg-ui-white border-1.5px border-ui-grey px-8 py-6 flex flex-row justify-between items-start">
                                <div className="font-medium text-type-dark w-full">
                                    Sub-total
                                </div>
                                <div className="text-type-manatee w-full">
                                    {priceTotal + " lei"}
                                </div>
                            </div>

                            <div className="w-full bg-ui-white border-1.5px border-ui-grey px-8 py-6 flex flex-row justify-between items-start">
                                <div className="font-medium text-type-dark w-full">
                                    Livrare
                                </div>
                                <div className="text-type-manatee w-full">
                                    <div className="mb-2 font-medium">
                                        {
                                            userInfo.livrare == "livrare_la_usa" ?
                                            "livrare - 150 lei"
                                            :
                                            "livrare - 0 lei"
                                        }
                                    </div>
                                    <div>
                                        {
                                            userInfo.livrare == "livrare_la_usa" ?
                                            "Livrare până la ușă"
                                            :
                                            "Preluare din oficiu"
                                        }
                                    </div>
                                    <div>
                                        {
                                            userInfo.livrare == "livrare_la_usa" ?
                                            userInfo.adresa
                                            :
                                            "str. Ismail 98"
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="w-full bg-ui-white border-1.5px border-ui-grey px-8 py-6 flex flex-row justify-between items-start text-accent-accent">
                                <div className="font-medium w-full">
                                    Total
                                </div>
                                <div className="text-type-manatee w-full">
                                    {
                                        userInfo.livrare == "livrare_la_usa" ?
                                        priceTotal +  150 + " lei"
                                        :
                                        priceTotal + "lei"
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="text-sm-h4 md:text-lg-28 text-type-manatee font-bold mb-3 mt-10">
                            Comentariu
                        </div>
                        <div className="text-lg-14 text-type-grey mb-4 font-bold">
                            * Dacă aveți un promo-code, puteți să-l adăugați aici
                        </div>
                        <input
                            type="text"
                            className="w-full bg-ui-grey rounded-lg outline-none p-4 text-type-grey min-h-96px mb-8"
                            placeholder="Mesajul Dvs..."
                            {...register("comentariu")}
                        />

                        <div className="text-lg-p text-type-grey mb-84px">
                            Datele dvs. personale vor fi utilizate pentru a vă procesa comanda, pentru a vă sprijini experiența pe acest site web și în alte scopuri descrise în pagina noastră <span className="text-accent-accent">politică de confidențialitate</span>.
                        </div>
                    </div>
                    
                    <div 
                        className="bg-accent-accent text-ui-white rounded-md text-lg-button font-bold flex flex-row justify-center items-center mx-auto h-52px w-full lg:w-500px cursor-pointer hover:bg-accent-light transition duration-300"
                        onClick={handleSubmit(onSubmit)}
                    >
                        {
                            step == 4 ? "Plasează comanda" : "Continuă"
                        }
                    </div>

                </div>
            </form>
            <form method="POST" target="_blank" ref={formRef} action="https://test.paynet.md/acquiring/getecom">
                <input type="hidden" name="LinkUrlSucces" value="https://www.mirrors.md/"/>
                <input type="hidden" name="LinkUrlCancel" value="https://www.mirrors.md/cos"/>
                <input type="hidden" name="Lang" value="en-US"/>
            </form>
        </div>
    )
}