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
    const [buttonClicked, setButtonClicked] = useState(0)
    const [button, setButton] = useState(0)
    const [price, setPrice] = useState(0)
    const [productsPaynet, setProductsPaynet] = useState(0)
    const [agreed, setAgreed] = useState(false)
    const [ExternalID, setExternalID] = useState(0)
    let priceTotal = 0

    const { reset, register, handleSubmit, watch, formState: { errors } } = useForm();

    const router = useRouter()

    const donothing = () => {
    }

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

    function getPriceAddon(addon, size) {
        let price = 0
        if(addon.type == "ml"){
            price = addon.price * (size.height + size.width) * 2 / 1000
        }
        else if(addon.type == "m2"){
            price = addon.price * size.height * size.width / 1000000
        }
        else{
            price = addon.price
        }

        return Math.trunc(price)
    }

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

    const formRef = useRef(null);

    const fillInputs = (PaymentId, ExpiryDate, Signature) => {
        const { elements: inputs } = formRef.current;

        inputs.operation.value = PaymentId;
        inputs.ExpiryDate.value = ExpiryDate;
        inputs.Signature.value = Signature;
        inputs.LinkUrlSuccess.value= `http://localhost:3000/comanda/?status=paid&id=${PaymentId}`
        inputs.LinkUrlCancel.value = `http://localhost:3000/comanda/?status=canceled&id=${PaymentId}`
    }

    useEffect(()=> {
        console.log(agreed)
    }, [agreed])

    useEffect(() => {
        if(buttonClicked == 1){

        let ClientCode = uuidv4()
        let ExpiryDate = "2022-01-01T00:00:00"

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
                            PhoneNumber : userInfo.telefon,
                            email : userInfo.email,
                            Country : "Moldova",
                            City : "Chisinau",
                            Address : userInfo.address
                        },
                        Services : [{
                            Name : "Cumpărarea oglinzilor online",
                            Description : "Cumpararea oglinzilor pe site-ul mirrors.md",
                            Amount : Math.trunc(price * 100),
                            products : productsPaynet
                        }],
                        ExpiryDate : ExpiryDate,
                        SignVersion : "v05",
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
                                    setButtonClicked(2)
                                        
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
    }, [buttonClicked])

    const onSubmit = (data) => {
        setUserInfo({...data})
        setExternalID(Math.floor(Math.random() * Date.now()))
        
        if(step == 4){
            setPopupOpen(1)
            setPopupLoading(1)

            let orders = []
            cart.map((cartProduct, index) => {
                let price = cartProduct.price

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        products : [cartProduct.product],
                        add_ons : cartProduct.addOns,
                        price : price,
                        number : cartProduct.number,
                        size : cartProduct.size
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
                        userInfo.livrare == "livrare_la_usa" ? setPrice(priceTotal + 150) : setPrice(priceTotal)
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
                                comentariu : data.comentariu,
                                paynetid: ExternalID
                            })
                        };
            
                        fetch(`https://mirrors-md-admin.herokuapp.com/clients`, requestOptionsClient)
                            .then(response => response.json())
                            .then(async (strapiData) => {

                                // let ClientCode = uuidv4()
                                // let ExternalID = Math.floor(Math.random() * Date.now())

                                // let ExpiryDate = "2022-01-01T00:00:00"
                                // let secretKey = process.env.NEXT_PUBLIC_PAYNET_SECRET

                                // let signatureRaw = "498"+strapiData.address+"Chisinau"+ClientCode+"Moldova"+strapiData.email+userInfo.prenume+userInfo.nume+strapiData.phone+ExpiryDate+ExternalID+"388417"+"Paynet"+"1"+"Cumpararea oglinzilor pe site-ul mirrors.md"+"Cumpărarea oglinzilor online"

                                let productsPaynet = orders.map((order, index) => {
                                    // signatureRaw += order.number+order.products[0].id+order.products[0].slug+`Produsul ${order.products[0].name}`+order.products[0].category+"Produs"+1+order.products[0].name+order.products[0].price+1
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
                                        // signatureRaw += order.number+order.add_ons[indexAddon].id+order.add_ons[indexAddon].name+`Addon-ul ${order.add_ons[indexAddon].name}`+2+"Add On"+1+order.add_ons[indexAddon].name+order.add_ons[indexAddon].price+1
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

                                setProductsPaynet(productsPaynet)
                                sendMailOwner({
                                    ...strapiData,
                                    orders : orders
                                })
                                sendMailClient({
                                    ...strapiData,
                                    orders: orders
                                })

                                if(strapiData.mod_de_plata == "card"){

                                    setButton(1)
                                    // var details = {
                                    //     'grant_type': 'password',
                                    //     'username': '370455',
                                    //     'password' : process.env.NEXT_PUBLIC_PAYNET_PASSWORD,
                                    //     'merchantcode' : '388417'
                                    // };
                                    
                                    // var formBody = [];
                                    // for (var property in details) {
                                    //   var encodedKey = encodeURIComponent(property);
                                    //   var encodedValue = encodeURIComponent(details[property]);
                                    //   formBody.push(encodedKey + "=" + encodedValue);
                                    // }
                                    // formBody = formBody.join("&");
        
                                    // const authRequestOptions = {
                                    //     method : 'POST',
                                    //     headers : {
                                    //         'Content-Type': 'application/x-www-form-urlencoded',
                                    //         'Accept-Language' : 'ro-RO'
                                    //     },
                                    //     body : formBody
                                    // }

                                    // fetch("https://nameless-shore-75507.herokuapp.com/https://test.paynet.md:4446/auth", authRequestOptions)
                                    //     .then(response => response.json())
                                    //     .then(async (dataAuth) => {

                                    //         const requestOptionsPaynet = {
                                    //             method: 'POST',
                                    //             headers: { 
                                    //                 'Content-Type': 'application/json',
                                    //                 'Authorization' : `Bearer ${dataAuth.access_token}`
                                    //             },
                                    //             body: JSON.stringify({ 
                                    //                 Invoice : ExternalID,
                                    //                 Currency : 498,
                                    //                 MerchantCode : "388417",
                                    //                 Customer : {
                                    //                     Code : ClientCode,
                                    //                     NameFirst : userInfo.prenume,
                                    //                     NameLast : userInfo.nume,
                                    //                     PhoneNumber : strapiData.phone,
                                    //                     email : strapiData.email,
                                    //                     Country : "Moldova",
                                    //                     City : "Chisinau",
                                    //                     Address : strapiData.address
                                    //                 },
                                    //                 Services : [{
                                    //                     Name : "Cumpărarea oglinzilor online",
                                    //                     Description : "Cumpararea oglinzilor pe site-ul mirrors.md",
                                    //                     Amount : Math.trunc(strapiData.pret * 100),
                                    //                     products : productsPaynet
                                    //                 }],
                                    //                 ExpiryDate : ExpiryDate,
                                    //                 SignVersion : "v05",
                                    //                 MoneyType : {
                                    //                     Code : "Paynet"
                                    //                 }
                                    //             })
                                    //         };
                                           
                                    //         try {
                                    //             await fetch("https://nameless-shore-75507.herokuapp.com/https://test.paynet.md:4446/api/payments", requestOptionsPaynet)
                                    //                 .then(response => response.json())
                                    //                 .then(async (data) => {
                                                        
                                    //                     try {
                                    //                         fillInputs(data.PaymentId, data.ExpiryDate, data.Signature);
                                    //                         formRef.current.submit();

                                    //                         setPopupLoading(0)
                                    //                         setPopupDone(1)
                                                            
                                    //                         setTimeout(() => {
                                    //                             setPopupDone(0)
                                    //                             setPopupOpen(0)
                                                                
                                    //                             setTimeout(() => {
                                    //                                 localStorage.setItem('cart', "[]")
                                    //                                 setCart([])
                                    //                                 router.push("/")
                                    //                             }, 200)
                                                                    
                                    //                         }, 1200)
                                                                
                                    //                     }
                                    //                     catch(error){
                                    //                         console.log("Error with redirect : ", error)
                                    //                     }
                                    //                 })
                                    //         } catch (error) {
                                    //             console.log("Error with sending payment : ", error)
                                    //         }
                                    //     })

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

            <div className={`w-288px h-240px bg-ui-white fixed top-checkout-top left-checkout-left flex flex-col items-center justify-center rounded-xl ${popupLoading ? "block" : "hidden"} z-20 px-3`}>
                {
                    button ? 
                        <div className="flex flex-col justify-center items-center relative w-full">
                            <Image
                                src="/branding/paynet1.png"
                                height={108}
                                width={240}
                            ></Image>
                            <button onClick={() => setButtonClicked(buttonClicked + 1)} className={`${button ? "flex" : "hidden"} flex-row justify-center items-center bg-accent-accent rounded-lg text-ui-white font-bold hover:bg-accent-light h-12 w-full transition duration-300 mt-4`}>
                                Plătește comanda
                            </button>
                        </div>
                    :
                        <div>
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
                }
            </div>

            <form className={`w-full h-auto px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pt-128px md:pt-136px lg:pt-234px pb-120px font-Ubuntu bg-ui-darkGrey ${popupOpen ? "filter brightness-50" : ""} transition duration-300`}>

                <div className="flex flex-row justify-start items-center text-lg-14 font-normal text-type-manatee w-auto mb-8 md:mb-12">
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
                    <Link href={lang == "ro" ? "/cos" : "/ru/cos"}>
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
                    {
                        lang == "ro" ?
                        "Înregistrarea comenzii"
                        :
                        "Оформление заказа"
                    }
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
                                {
                                    lang == "ro" ?
                                    "Detalii de contact"
                                    :
                                    "Контактная информация"
                                }
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
                                {
                                    lang == "ro" ?
                                    "Livrarea"
                                    :
                                    "Доставка"
                                }
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
                                {
                                    lang == "ro" ?
                                    "Modalitatea de plată"
                                    :
                                    "Способ оплаты"
                                }
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
                                {
                                    lang == "ro" ?
                                    "Plasarea comenzii"
                                    :
                                    "Размещение заказа"
                                }
                            </div>
                        </div> 

                    </div>

                    <div className={`${step == 1 ? "block" : "hidden"} w-full bg-ui-white md:pt-14 px-6 py-10 md:pb-16 md:px-12 mb-12`}>
                        <div className="w-full flex flex-col md:flex-row justify-between items-start mb-6">
                            <div className="w-full mr-6 mb-6 md:mb-0">
                                <div className="mb-2 text-lg-14 font-medium text-type-manatee">
                                    {
                                        lang == "ro" ?
                                        "Nume"
                                        :
                                        "Фамилия"
                                    }   
                                    <span className="text-accent-error">*</span>
                                </div>
                                <input
                                    className={`w-full bg-ui-grey border-1.5px border-ui-blueishGrey rounded-md p-4 text-type-dark text-lg-14 ${errors.nume? "errorInput" : "inputFocused"}`}
                                    type="text"
                                    {...register("nume", { required: step == 1 ? true : false})}
                                />
                                {errors.nume?.type === 'required' && 
                                    <div className="text-accent-error text-lg-12 mt-2">
                                        {
                                            lang == "ro" ?
                                            "* Introduceți numele Dvs."
                                            :
                                            "* Введите вашу фамилию."
                                        }
                                    </div>
                                }
                                
                            </div>

                            <div className="w-full">
                                <div className="mb-2 text-lg-14 font-medium text-type-manatee"> 
                                    {
                                        lang == "ro" ?
                                        "Prenume"
                                        :
                                        "Имя"
                                    }
                                    <span className="text-accent-error">*</span>
                                </div>
                                <input
                                    className={`w-full bg-ui-grey border-1.5px border-ui-blueishGrey rounded-md p-4 text-type-dark text-lg-14 ${errors.prenume? "errorInput" : "inputFocused"}`}
                                    type="text"
                                    {...register("prenume", { required: step == 1 ? true : false })}
                                />
                                {errors.prenume?.type === 'required' && 
                                    <div className="text-accent-error text-lg-12 mt-2">
                                        {
                                            lang == "ro" ?
                                            "* Introduceți prenumele Dvs."
                                            :
                                            "* Введите свое имя."
                                        }
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="w-full flex flex-col md:flex-row justify-between items-start">
                            <div className="w-full mr-6 mb-6 md:mb-0">
                                <div className="mb-2 text-lg-14 font-medium text-type-manatee">
                                    {
                                        lang == "ro" ?
                                        "Email"
                                        :
                                        "Электронная почта"
                                    }
                                    <span className="text-accent-error">*</span>
                                </div>
                                <input
                                    className={`w-full bg-ui-grey border-1.5px border-ui-blueishGrey rounded-md p-4 text-type-dark text-lg-14 ${errors.email? "errorInput" : "inputFocused"}`}
                                    type="text"
                                    {...register("email", { required: step == 1 ? true : false })}
                                />
                                {errors.email?.type === 'required' && 
                                    <div className="text-accent-error text-lg-12 mt-2">
                                        {
                                            lang == "ro" ?
                                            "* Introduceți poșta electronică"
                                            :
                                            "* Введите адрес электронной почты"
                                        }
                                    </div>
                                }
                            </div>

                            <div className="w-full">
                                <div className="mb-2 text-lg-14 font-medium text-type-manatee"> 
                                    {
                                        lang == "ro" ?
                                        "Telefon"
                                        :
                                        "Телефон"
                                    }
                                    <span className="text-accent-error">*</span>
                                </div>
                                <input
                                    className={`w-full bg-ui-grey border-1.5px border-ui-blueishGrey rounded-md p-4 text-type-dark text-lg-14 ${errors.telefon? "errorInput" : "inputFocused"}`}
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    {...register("telefon", { required: step == 1 ? true : false , minLength: 8})}
                                />
                                {errors.telefon?.type === 'required' && 
                                    <div className="text-accent-error text-lg-12 mt-2">
                                        {
                                            lang == "ro" ?
                                            "* Introduceți numărul de telefon"
                                            :
                                            "* Введите номер телефона"
                                        }
                                    </div>
                                }
                                {errors.telefon?.type === 'minLength' && 
                                    <div className="text-accent-error text-lg-12 mt-2">
                                        {
                                            lang == "ro" ?
                                            "* Lungimea minimă a numărului este 8 cifre"
                                            :
                                            "* Минимальная длина номера - 8 цифр"
                                        }
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
                                {
                                    lang == "ro" ?
                                    "Ridicare din oficiu, str. Ismail 98"
                                    :
                                    "Приём из офиса, улица Измаил 98"
                                }
                            </div>
                            <div className="w-full text-lg-14 font-medium">
                                {
                                    lang == "ro" ?
                                    "gratuit"
                                    :
                                    "бесплатно"
                                }
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
                                    {
                                        lang == "ro" ?
                                        "* Introduceți modul de livrare"
                                        :
                                        "* Введите способ доставки"
                                    }
                                </div>
                            }
                            <div className="w-full mr-4 text-lg-14">
                                {
                                    lang == "ro" ?
                                    "Livrare până la ușă"
                                    :
                                    "Доставка до двери"
                                }
                            </div>
                            <div className="w-full text-lg-14 font-medium">
                                {
                                    lang == "ro" ?
                                    "150 lei"
                                    :
                                    "150 лей"
                                }
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
                            {
                                lang == "ro" ?
                                "Oraș"
                                :
                                "Город"
                            }
                            <span className="text-accent-error">*</span>
                        </div>
                        <input
                            className={`w-full p-3 text-type-manatee flex flex-row justify-between items-center text-lg-14 border-1.5px border-ui-blueishGrey rounded-md ${errors.oras? "errorInput" : "inputFocused"}`}
                            placeholder="Ex : Chișinău"
                            {...register("oras", { required: step == 2 ? true : false })}
                        />
                        {errors.oras?.type === 'required' && 
                            <div className="text-accent-error text-lg-12 mt-2">
                                {
                                    lang == "ro" ?
                                    "* Introduceți orașul Dvs."
                                    :
                                    "* Введите свой город."
                                }
                            </div>
                        }

                        <div className="mb-2 text-lg-14 font-medium text-type-manatee mt-4"> 
                            {
                                lang == "ro" ?
                                "Adresa"
                                :
                                "Адрес"
                            }
                            <span className="text-accent-error">*</span>
                        </div>
                        <input
                            className={`w-full p-3 text-type-manatee flex flex-row justify-between items-center text-lg-14 border-1.5px border-ui-blueishGrey rounded-md ${errors.adresa? "errorInput" : "inputFocused"}`}
                            placeholder="Ex : str. Ismail 98"
                            {...register("adresa", { required: step == 2 ? true : false })}
                        />
                        {errors.adresa?.type === 'required' && 
                            <div className="text-accent-error text-lg-12 mt-2">
                                {
                                    lang == "ro" ?
                                    "* Introduceți adresa Dvs."
                                    :
                                    "* Введите свой адрес."
                                }
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
                                {
                                    lang == "ro" ?
                                    "Transfer direct"
                                    :
                                    "Перевод с карты"
                                }
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
                                {
                                    lang == "ro" ?
                                    "Cash la livrare"
                                    :
                                    "Оплата при доставке"
                                }
                            </div>
                        </label>
                        {errors.plata?.type === 'required' && 
                            <div className="text-accent-error text-lg-12 mt-2">
                                {
                                    lang == "ro" ?
                                    "* Introduceți modul de plată"
                                    :
                                    "* Введите способ оплаты"
                                }
                            </div>
                        }
                    </div>

                    <div className={`${step == 4 ? "block" : "hidden"} w-full`}>
                        <div className="bg-ui-grey w-full px-6 py-14px text-type-manatee text-lg-p font-medium">
                            {
                                lang == "ro" ?
                                "Comanda Dvs"
                                :
                                "Ваш заказ"
                            }
                        </div>
                        {cart.map((product) => {
                            let addOnsPrice = 0
                            product.addOns.forEach((addOn) => {
                                addOnsPrice += getPriceAddon( addOn, product.size )
                            })
                            let priceSingular = Math.trunc(getPrice(product.product, product.size) * ( 1 + coeficientFinder(product.size, product.product))) + addOnsPrice
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
                                            {
                                                lang == "ro" ?
                                                product.product.name
                                                :
                                                product.product.nameru
                                            }
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
                                    {
                                        lang == "ro" ?
                                        "Sub-total"
                                        :
                                        "Промежуточный итог"
                                    }
                                </div>
                                <div className="text-type-manatee w-full">
                                    {
                                        lang == "ro" ?
                                        priceTotal + " lei"
                                        :
                                        priceTotal + " лей"
                                    }
                                </div>
                            </div>

                            <div className="w-full bg-ui-white border-1.5px border-ui-grey px-8 py-6 flex flex-row justify-between items-start">
                                <div className="font-medium text-type-dark w-full">
                                    {
                                        lang == "ro" ?
                                        "Livrare"
                                        :
                                        "Доставка"
                                    }
                                </div>
                                <div className="text-type-manatee w-full">
                                    <div className="mb-2 font-medium">
                                        {
                                            userInfo.livrare == "livrare_la_usa" ?
                                                lang == "ro" ?
                                                "livrare - 150 lei"
                                                :
                                                "доставка - 150 лей"
                                            :
                                                lang == "ro" ?
                                                "livrare - 0 lei"
                                                :
                                                "доставка - 0 лей"
                                        }
                                    </div>
                                    <div>
                                        {
                                            userInfo.livrare == "livrare_la_usa" ?
                                                lang == "ro" ?
                                                "Livrare până la ușă"
                                                :
                                                "Доставка до двери"
                                            :
                                                lang == "ro" ?
                                                "Preluare din oficiu"
                                                :
                                                "Приём из офиса"
                                        }
                                    </div>
                                    <div>
                                        {
                                            userInfo.livrare == "livrare_la_usa" ?
                                                lang == "ro" ?
                                                userInfo.adresa
                                                :
                                                userInfo.adresa
                                            :
                                                lang == "ro" ?
                                                "str. Ismail 98"
                                                :
                                                "улица Исмаил 98"
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="w-full bg-ui-white border-1.5px border-ui-grey px-8 py-6 flex flex-row justify-between items-start text-accent-accent">
                                <div className="font-medium w-full">
                                    {
                                        lang == "ro" ?
                                        "Total"
                                        :
                                        "Итого"
                                    }
                                </div>
                                <div className="text-type-manatee w-full">
                                    {
                                        userInfo.livrare == "livrare_la_usa" ?
                                        priceTotal +  150 + " lei"
                                        :
                                        priceTotal + " lei"
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="text-sm-h4 md:text-lg-28 text-type-manatee font-bold mb-3 mt-10">
                            {
                                lang == "ro" ?
                                "Comentariu"
                                :
                                "Комментарий"
                            }
                        </div>
                        <div className="text-lg-14 text-type-grey mb-4 font-bold">
                            {
                                lang == "ro" ?
                                "* Dacă aveți un promo-code, puteți să-l adăugați aici"
                                :
                                "* Если у вас есть промокод, вы можете добавить его здесь"
                            }
                        </div>
                        <input
                            type="text"
                            className="w-full bg-ui-grey rounded-lg outline-none p-4 text-type-grey min-h-96px mb-8"
                            placeholder="Mesajul Dvs..."
                            {...register("comentariu")}
                        />

                        <div className="text-lg-p text-type-grey mb-84px"> 
                            {
                                lang == "ro" ?
                                "Datele dvs. personale vor fi utilizate pentru a vă procesa comanda, pentru a vă sprijini experiența pe acest site web și în alte scopuri descrise în pagina noastră "
                                :
                                "Ваши личные данные будут использоваться для обработки вашего заказа, для поддержки вашего опыта на этом веб-сайте и для других целей, описанных на нашей странице "
                            }
                            <span className="text-accent-accent">
                                {
                                    lang == "ro" ?
                                    "politică de confidențialitate"
                                    :
                                    "политика конфиденциальности"
                                }
                            </span>.
                        </div>

                        {
                            userInfo.plata == "card" ?
                            <div className="mb-4">
                                <label 
                                    className="text-lg-p text-type-grey cursor-pointer"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setAgreed(!agreed)
                                    }}
                                >
                                    <span>
                                            <input 
                                                type="checkbox" 
                                                className="h-3 w-3 border-2 border-type-grey checked:bg-accent-accent hover:bg-accent-transparent shadow-none outline-none mr-2 transition duration-300 -mt-1" 
                                                name="termeni"
                                                checked={agreed}
                                            />
                                    </span>
                                    {
                                        lang == "ro" ?
                                        "Am citit și sunt deacord cu condițiile enunțiate în "
                                        :
                                        "Я прочитал и согласен с условиями, изложенными в "
                                    }
                                    <Link href={lang == "ro" ? "/termeni" : "/ru/termeni"}>
                                        <a>
                                            <span className="text-accent-accent">
                                                {
                                                    lang == "ro" ?
                                                    " termeni și condiții"
                                                    :
                                                    " условия"
                                                }
                                            </span>.
                                        </a>
                                    </Link>
                                    <span className="text-accent-error">
                                        {" (Obligator)"}
                                    </span>
                                </label>
                            </div>
                            :
                            <div>
                            </div>
                        }
                    </div>
                    
                    <div 
                        className={`${step == 4 ? agreed ? "bg-accent-accent hover:bg-accent-light cursor-pointer" : "bg-ui-blueishGrey" : "bg-accent-accent hover:bg-accent-light cursor-pointer"} text-ui-white rounded-md text-lg-button font-bold flex flex-row justify-center items-center mx-auto h-52px w-full lg:w-500px transition duration-300`}
                        onClick={step == 4 ? agreed ? handleSubmit(onSubmit) : donothing() : handleSubmit(onSubmit)}
                    >
                        {
                            step == 4 ?  
                                lang == "ro" ?
                                "Plasează comanda"
                                :
                                "Оформите заказ"
                            : 
                                lang == "ro" ?
                                "Continuă"
                                :
                                "Продолжить"
                        }
                    </div>

                </div>
            </form>
            <form method="POST" target="_blank" ref={formRef} action="https://test.paynet.md/acquiring/getecom">
                <input type="hidden" name="Lang" value="ro-RO"/>
                <input type="hidden" name="operation" value=""/>
                <input type="hidden" name="ExpiryDate" value=""/>
                <input type="hidden" name="Signature" value=""/>
                <input type="hidden" name="LinkUrlSuccess" value=""/>
                <input type="hidden" name="LinkUrlCancel" value=""/>
            </form>
        </div>
    )
}