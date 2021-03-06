import Lottie from 'lottie-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { getCurrency, getCurrencyString, getPrice, isRoDomain } from '../../utils/general';
import { CartContext, PopupContext } from '../context';
import done from './done.json';
import loading from './loading.json';
import { getPriceAddon } from '../../utils/general';

var md5 = require('md5');
// const ExternalId = (Math.floor(Math.random() * Date.now()))
let PaymentId = 0
let ExpiryDate = ""
let Signature = ""

export default function Checkout({lang}) {

    const roDomain = isRoDomain()

    const [step , setStep] = useState(1)
    const {cart, setCart} = useContext(CartContext)
    const [userInfo, setUserInfo] = useState({})
    const [popupLoading, setPopupLoading] = useState()
    const [popupDone, setPopupDone] = useState()
    const {popupOpen, setPopupOpen} = useContext(PopupContext)
    const [buttonClicked, setButtonClicked] = useState(0)
    const [button, setButton] = useState(0)
    const [price, setPrice] = useState(0)
    const [agreed, setAgreed] = useState(false)
    const [vivaLink, setVivaLink] = useState('')
    const [vivaError, setVivaError] = useState('')
    
    const [currency, setCurrency] = useState(4)
    let priceTotal = 0

    const { reset, register, handleSubmit, watch, formState: { errors } } = useForm();

    const router = useRouter()

    const donothing = () => {
    }

    useEffect(async () => {
      const currencyStrapi = await getCurrency()
      setCurrency(currencyStrapi)
    }, [])

    const sendMailOwner = async (data) => {
        try {
            await fetch("/api/owner", {
                "method": "POST",
                "headers": { "content-type": "application/json" },
                "body": JSON.stringify(data)
            })
        } 
        catch (error) {
            console.log(error)
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
            console.log(error)
        }
    }

    const coeficientFinder = (size, product) => {
      if(roDomain){
        if(size.width < product.medium_size && size.height < product.medium_size){
          return product.smallcoeficient_ro
        }
        else if(size.width < product.big_size && size.height < product.big_size) {
            return product.mediumcoeficient_ro
        }
        else{
            return product.bigcoeficient_ro
        }
      } else{
        if(size.width < product.medium_size && size.height < product.medium_size){
            return product.smallcoeficient
        }
        else if(size.width < product.big_size && size.height < product.big_size) {
            return product.mediumcoeficient
        }
        else{
            return product.bigcoeficient
        }
      }
    }

    const formRef = useRef(null);

    const fillInputs = (PaymentId, ExpiryDate, Signature) => {
        const { elements: inputs } = formRef.current;

        inputs.operation.value = PaymentId;
        inputs.ExpiryDate.value = ExpiryDate;
        inputs.Signature.value = Signature;
        inputs.LinkUrlSuccess.value= "https://www.mirrors.md/"
        inputs.LinkUrlCancel.value = "https://www.mirrors.md/cos"
    }

    const emptyCart = () => {
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

    const redirectCall = async() => {
        try {
          fillInputs(PaymentId, ExpiryDate, Signature);
          formRef.current.submit();
          emptyCart()    
        }
        catch(error){
            console.log("Error with redirect : ", error)
        }
    }

    const onSubmit = async (data) => {
        setUserInfo({...data})
        
        if(step == 4){
            setPopupOpen(1)
            setPopupLoading(1)

            let orders = []
            cart.map(async (cartProduct, index) => {
                let price = cartProduct.price

                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        products : [cartProduct.product],
                        add_ons : cartProduct.addOns,
                        price : price,
                        number : cartProduct.number,
                        size : cartProduct.size,
                        text_acrilic: cartProduct.textAcrilic
                    })
                }
                
                const response1 = await fetch(`https://mirrors-md-admin.herokuapp.com/orders`, requestOptions)
                const dataInside = await response1.json()
                orders.push(
                    {
                        ...dataInside,
                        image : dataInside.products[0].image.length === 0 ? "/product/placeholder.png" : dataInside.products[0].image[0].formats.small.url
                    }
                )
                  if(index == cart.length -1 ){
                    let ExternalId = Math.floor(Math.random() * Date.now())

                    userInfo.livrare == "nova_poshta" ? setPrice(priceTotal + 500) : setPrice(priceTotal)
                    const requestOptionsClient = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            name : data.nume + " " + data.prenume,
                            phone : data.telefon,
                            address : data.adresa,
                            email : data.email,
                            pret : userInfo.livrare == "nova_poshta" ? priceTotal + 500 : priceTotal,
                            mod_de_plata : data.plata,
                            mod_de_livrare : data.livrare,
                            orders : orders,
                            comentariu : data.comentariu,
                            paynetid: ExternalId,
                            country: roDomain ? 'Romania' : 'Moldova'
                        })
                    };
        
                    const response2 = await fetch(`https://mirrors-md-admin.herokuapp.com/clients`, requestOptionsClient)
                    const strapiData = await response2.json()

                    let ClientCode = uuidv4()                    

                    let ExpiryDate = "2022-01-01T00:00:00"

                    let productsPaynet = orders.map((order, index) => {
                        return({
                            Amount : Math.round(order.number * order.products[0].price * 100),
                            Barcode : order.products[0].id,
                            Code : order.products[0].slug,
                            Description : `Produsul ${order.products[0].name}`,
                            GroupId : order.products[0].category,
                            GroupName : "Produs",
                            LineNo : 1,
                            Name : order.products[0].name,
                            Quantity : Math.round(order.number),
                            UnitPrice : Math.round(order.products[0].price * 100),
                            UnitProduct : 1
                        })
                    })
                            
                    orders.map((order, index) => {
                        order.add_ons.map((addOn, indexAddon) => {
                            productsPaynet.push({
                                Amount : Math.round(order.number * order.products[0].price * 100),
                                Barcode : order.add_ons[indexAddon].id,
                                Code : order.add_ons[indexAddon].name,
                                Description : `Addon-ul ${order.add_ons[indexAddon].name}`,
                                GroupId : 2,
                                GroupName : "Add On",
                                LineNo : 1,
                                Name : order.add_ons[indexAddon].name,
                                Quantity : Math.round(order.number),
                                UnitPrice : Math.round(order.products[0].price * 100),
                                UnitProduct : 1
                            })
                        })
                    })

                    sendMailOwner({
                        ...strapiData,
                        orders : orders,
                        country: roDomain ? 'Romania' : 'Moldova'
                    })
                    sendMailClient({
                        ...strapiData,
                        orders: orders,
                        country: roDomain ? 'Romania' : 'Moldova'
                    })

                    if(strapiData.mod_de_plata == "card"){

                      if(roDomain){
                        try {
                            const linkRaw = await fetch("/api/vivawallet", {
                              "method": "POST",
                              "headers": { "content-type": "application/json" },
                              "body": JSON.stringify({
                                amount: Math.round(strapiData.pret / currency) * 100,
                                fullName: userInfo.nume + ' ' + userInfo.prenume,
                                email: userInfo.email,
                              })
                            })

                            const {success, link, errorMessage} = await linkRaw.json()

                            if(success){
                              setVivaLink(link)
                              setButton(1)
                            }
                            else{
                              setVivaError(errorMessage)
                            }
                        }
                        catch(e){
                            console.log("Error : ", e)
                        }
                      }
                      else {
                          var details = {
                              'grant_type': 'password',
                              'username': '723112',
                              'password' : process.env.NEXT_PUBLIC_PAYNET_PASSWORD,
                              'merchantcode' : '944726'
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

                          const response3 = await fetch("https://nameless-shore-75507.herokuapp.com/https://paynet.md:4448/auth", authRequestOptions)
                          const dataAuth = await response3.json()
                              const requestOptionsPaynet = {
                                  method: 'POST',
                                  headers: { 
                                      'Content-Type': 'application/json',
                                      'Authorization' : `Bearer ${dataAuth.access_token}`
                                  },
                                  body: JSON.stringify({ 
                                      Invoice : ExternalId,
                                      Currency : 498,
                                      MerchantCode : "944726",
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
                                          Name : "Cump??rarea oglinzilor online",
                                          Description : "Cumpararea oglinzilor pe site-ul mirrors.md",
                                          Amount : Math.round(strapiData.pret * 100),
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
                                const response4 = await fetch("https://nameless-shore-75507.herokuapp.com/https://paynet.md:4448/api/payments", requestOptionsPaynet)
                                const dataPayment = await response4.json()
                                PaymentId = dataPayment.PaymentId
                                ExpiryDate = dataPayment.ExpiryDate
                                Signature = dataPayment.Signature

                                setButton(1)
                              }
                              catch(e){
                                  console.log("Error : ", e)
                              }
                          }
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
                    }
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
                        "Comanda a fost procesat??. Vei fi telefonat in cel mai scurt timp posibil"
                        :
                        lang == "ru" ?
                        "?????????? ??????????????????. ?????? ???????????????? ?? ?????????????????? ??????????"
                        :
                        "Your order was processed. You will be called as soon as possible."
                    }
                </div>
            </div>

            <div className={`w-288px h-240px bg-ui-white fixed top-checkout-top left-checkout-left flex flex-col items-center justify-center rounded-xl ${popupLoading ? "block" : "hidden"} z-20 px-3`}>
                {
                  vivaError ?
                    <div className="w-240px text-lg-17 md:text-md-p lg:text-lg-p text-accent-error text-center">
                      {vivaError}                    
                    </div>
                    :
                    button ?
                        roDomain ? 
                        <div className="flex flex-col justify-center items-center relative w-full">
                            <Image
                                src="/branding/vivawallet.png"
                                height={55}
                                width={240}
                                alt="Paynet logo"
                            ></Image>
                            <a href={vivaLink} target="_blank" className="w-full" onClick={() => emptyCart()}>
                              <button className={`${vivaLink ? "flex" : "hidden"} flex-row justify-center items-center bg-accent-accent rounded-lg text-ui-white font-bold hover:bg-accent-light h-12 w-full transition duration-300 mt-4`}>
                                  {
                                    lang == "ro" ?
                                    "Pl??te??te comanda"
                                    :
                                    lang == "ru" ?
                                    "???????????????? ??????????"
                                    :
                                    "Pay the order"
                                  }
                              </button>
                            </a>
                        </div>
                        :
                        <div className="flex flex-col justify-center items-center relative w-full">
                            <Image
                                src="/branding/paynet1.png"
                                height={108}
                                width={240}
                                alt="Paynet logo"
                            ></Image>
                            <button onClick={() => redirectCall()} className={`${button ? "flex" : "hidden"} flex-row justify-center items-center bg-accent-accent rounded-lg text-ui-white font-bold hover:bg-accent-light h-12 w-full transition duration-300 mt-4`}>
                                {
                                  lang == "ro" ?
                                  "Pl??te??te comanda"
                                  :
                                  lang == "ru" ?
                                  "???????????????? ??????????"
                                  :
                                  "Pay the order"
                                }
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
                                    "Comanda se proceseaz??"
                                    :
                                    lang == "ru" ?
                                    "?????????? ????????????????????????????"
                                    :
                                    "Your order is being processed"
                                }
                            </div>
                        </div>
                }
            </div>

            <form className={`w-full h-auto px-container-sm md:px-container-md lg:px-container-lg xl:px-container-xl pt-128px md:pt-136px lg:pt-234px pb-120px font-Ubuntu bg-ui-darkGrey ${popupOpen ? "filter brightness-50" : ""} transition duration-300`}>

                <div className="flex flex-row justify-start items-center text-lg-14 font-normal text-type-manatee w-auto mb-8 md:mb-12">
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
                                    "Pagina principal??"
                                    :
                                    lang == "ru" ?
                                    "?????????????? ????????????????"
                                    :
                                    "Homepage"
                                }
                            </span>
                        </a>
                    </Link>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <Link href={
                      lang == "ro" ? 
                      "/cos" 
                      : 
                      lang == "ru" ?
                      "/ru/cos"
                      :
                      "/en/cos"
                    }>
                        <a>
                            <span className="mr-1 hover:underline transition duration-300">
                                {
                                    lang == "ro" ?
                                    "Co??"
                                    :
                                    lang == "ru" ?
                                    "??????????????"
                                    :
                                    "Cart"
                                }
                            </span>
                        </a>
                    </Link>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span>
                        {
                            "Checkout"
                        }
                    </span>
                </div>
                <h2 className="text-sm-h2 md:text-md-h2 lg:text-lg-h2 text-type-dark font-bold w-full text-center mb-3">
                    {
                        lang == "ro" ?
                        "??nregistrarea comenzii"
                        :
                        lang == "ru" ?
                        "???????????????????? ????????????"
                        :
                        "Order registration"
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
                                    lang == "ru" ?
                                    "???????????????????? ????????????????????"
                                    :
                                    "Contact details"
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
                                    lang == "ru" ?
                                    "????????????????"
                                    :
                                    "Delivery"
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
                                    "Modalitatea de plat??"
                                    :
                                    lang == "ru" ?
                                    "???????????? ????????????"
                                    :
                                    "Payment method"
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
                                    lang == "ru" ?
                                    "???????????????????? ????????????"
                                    :
                                    "Order placement"
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
                                        lang == "ru" ?
                                        "??????????????"
                                        :
                                        "Last name"
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
                                            "* Introduce??i numele Dvs."
                                            :
                                            lang == "ru" ?
                                            "* ?????????????? ???????? ??????????????."
                                            :
                                            "* Insert you last name"
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
                                        lang == "ru" ?
                                        "??????"
                                        :
                                        "First name"
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
                                            "* Introduce??i prenumele Dvs."
                                            :
                                            lang == "ru" ?
                                            "* ?????????????? ???????? ??????."
                                            :
                                            "* Insert your first name"
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
                                        lang == "ru" ?
                                        "?????????????????????? ??????????"
                                        :
                                        "Email"
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
                                            "* Introduce??i po??ta electronic??"
                                            :
                                            lang == "ru" ?
                                            "* ?????????????? ?????????? ?????????????????????? ??????????"
                                            :
                                            "* Insert your email"
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
                                        lang == "ru" ?
                                        "??????????????"
                                        :
                                        "Phone number"
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
                                            "* Introduce??i num??rul de telefon"
                                            :
                                            lang == "ru" ?
                                            "* ?????????????? ?????????? ????????????????"
                                            :
                                            "* Insert your phone number"
                                        }
                                    </div>
                                }
                                {errors.telefon?.type === 'minLength' && 
                                    <div className="text-accent-error text-lg-12 mt-2">
                                        {
                                            lang == "ro" ?
                                            "* Lungimea minim?? a num??rului este 8 cifre"
                                            :
                                            lang == "ru" ?
                                            "* ?????????????????????? ?????????? ???????????? - 8 ????????"
                                            :
                                            "* Minimum phone number length - 8 digits"
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    <div className={`${step == 2 ? "block" : "hidden"} w-full bg-ui-white md:pt-14 px-6 py-10 md:pb-16 md:px-12 mb-12`}>
                        {!roDomain && <label className="w-full py-20px border-1.5px border-ui-darkGrey flex flex-row justify-between items-center mb-6 focus-within:text-type-dark text-type-grey transition duration-300 cursor-pointer">
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
                                    lang == "ru" ?
                                    "?????????? ???? ??????????, ?????????? ???????????? 98"
                                    :
                                    "Pick-up from office, Ismail 98 street"
                                }
                            </div>
                            <div className="w-full text-lg-14 font-medium">
                                {
                                    lang == "ro" ?
                                    "gratuit"
                                    :
                                    lang == "ru" ?
                                    "??????????????????"
                                    :
                                    "free"
                                }
                            </div>
                        </label>}

                        <label className="w-full py-20px border-1.5px border-ui-darkGrey flex flex-row justify-between items-center mb-6 focus-within:text-type-dark text-type-grey transition duration-300 cursor-pointer">
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
                                        "* Introduce??i modul de livrare"
                                        :
                                        lang == "ru" ?
                                        "* ?????????????? ???????????? ????????????????"
                                        :
                                        "* Select a shipping method"
                                    }
                                </div>
                            }
                            <div className="w-full mr-4 text-lg-14">
                                {
                                    lang == "ro" ?
                                    "Livrare p??n?? la u????"
                                    :
                                    lang == "ru" ?
                                    "???????????????? ???? ??????????"
                                    :
                                    "Delivery to the door"
                                }
                            </div>
                            <div className="w-full text-lg-14 font-medium">
                                {
                                    lang == "ro" ?
                                      "gratuit (??n raza Chi??in??ului)"
                                    :
                                      lang == "en" ?
                                      "free (within Chisinau)"
                                    :
                                      "?????????????????? (???? ????????????????)"
                                }
                            </div>
                        </label>

                        {!roDomain && <label className="w-full py-20px border-1.5px border-ui-darkGrey flex flex-row justify-between items-center mb-6 focus-within:text-type-dark text-type-grey transition duration-300 cursor-pointer">
                            <input
                                type="radio"
                                name="livrare"
                                value="nova_poshta"
                                className="w-3 h-3 border-2 mx-4 border-ui-blueishGrey"
                                {...register("livrare", { required: step == 2 ? true : false })}
                            />
                            {errors.livrare?.type === 'required' && 
                                <div className="text-accent-error text-lg-12 mt-2">
                                    {
                                        lang == "ro" ?
                                        "* Introduce??i modul de livrare"
                                        :
                                        lang == "ru" ?
                                        "* ?????????????? ???????????? ????????????????"
                                        :
                                        "* Select a shipping method"
                                    }
                                </div>
                            }
                            <div className="w-full mr-4 text-lg-14">
                                {
                                    lang == "ro" ?
                                    "Livrare prin Nova Poshta"
                                    :
                                    lang == "ru" ?
                                    "???????????????? ?????????? ???????? ??????????"
                                    :
                                    "Nova Poshta delivery"
                                }
                            </div>
                            <div className="w-full text-lg-14 font-medium">
                                {
                                    lang == "ro" || lang == "en" ?
                                    "500 lei"
                                    :
                                    "500 ??????"
                                }
                            </div>
                        </label>}

                        <div className="mb-2 text-lg-14 font-medium text-type-manatee">
                            {
                                lang == "ro" ?
                                "Ora??"
                                :
                                lang == "ru" ?
                                "??????????"
                                :
                                "City"
                            }
                            <span className="text-accent-error">*</span>
                        </div>
                        <input
                            className={`w-full p-3 text-type-manatee flex flex-row justify-between items-center text-lg-14 border-1.5px border-ui-blueishGrey rounded-md ${errors.oras? "errorInput" : "inputFocused"}`}
                            {...register("oras", { required: step == 2 ? true : false })}
                        />
                        {errors.oras?.type === 'required' && 
                            <div className="text-accent-error text-lg-12 mt-2">
                                {
                                    lang == "ro" ?
                                    "* Introduce??i ora??ul Dvs."
                                    :
                                    lang == "ru" ?
                                    "* ?????????????? ???????? ??????????."
                                    :
                                    "* Insert a city"
                                }
                            </div>
                        }

                        <div className="mb-2 text-lg-14 font-medium text-type-manatee mt-4"> 
                            {
                                lang == "ro" ?
                                "Adresa"
                                :
                                lang == "ru" ?
                                "??????????"
                                :
                                "Address"
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
                                    "* Introduce??i adresa Dvs."
                                    :
                                    lang == "ru" ?
                                    "* ?????????????? ???????? ??????????."
                                    :
                                    "* Insert your address"
                                }
                            </div>
                        }

                    </div>

                    <div className={`${step == 3 ? "block" : "hidden"} w-full bg-ui-white md:pt-14 px-6 py-10 md:pb-16 md:px-12 mb-12`}>
                        <label className="w-full py-20px border-1.5px border-ui-darkGrey flex flex-row justify-start items-center mb-6 text-type-grey focus-within:text-type-dark transition duration-300 cursor-pointer">
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
                                    alt="VISA"
                                />
                            </div>
                            <div className="h-8 w-10 relative mr-4">
                                <Image
                                    src="/checkout/mastercard.svg"
                                    layout="fill"
                                    objectFit="cover"
                                    alt="MASTERCARD"
                                />
                            </div>
                            <div className="flex-grow text-lg-14">
                                {
                                    lang == "ro" ?
                                    "Transfer direct"
                                    :
                                    lang == "ru" ?
                                    "?????????????? ?? ??????????"
                                    :
                                    "Direct transfer"
                                }
                            </div>
                        </label>

                        <label className="w-full py-20px border-1.5px border-ui-darkGrey flex flex-row justify-start items-center mb-6 text-type-grey focus-within:text-type-dark transition duration-300 cursor-pointer">
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
                                    alt="Cash"
                                />
                            </div>
                            <div className="flex-grow text-lg-14">
                                {
                                    lang == "ro" ?
                                    "Cash la livrare"
                                    :
                                    lang == "ru" ?
                                    "???????????? ?????? ????????????????"
                                    :
                                    "Cash on delivery"
                                }
                            </div>
                        </label>
                        {errors.plata?.type === 'required' && 
                            <div className="text-accent-error text-lg-12 mt-2">
                                {
                                    lang == "ro" ?
                                    "* Introduce??i modul de plat??"
                                    :
                                    lang == "ru" ?
                                    "* ?????????????? ???????????? ????????????"
                                    :
                                    "* Insert a payment method"
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
                                lang == "ru" ?
                                "?????? ??????????" 
                                :
                                "Your order"
                            }
                        </div>
                        {cart.map((product) => {
                            let addOnsPrice = 0
                            product.addOns.forEach((addOn) => {
                                addOnsPrice += getPriceAddon( addOn, product.size )
                            })
                            let priceSingular = Math.round(getPrice(product.product, product.size) * ( 1 + coeficientFinder(product.size, product.product))) + addOnsPrice
                            let price = priceSingular * product.number
                            priceTotal += price
                            return (
                                <div className="px-8 py-2 border-1.5px border-ui-grey flex flex-row justify-start items-center bg-ui-white">
                                    <div className="w-20 h-20 relative mr-4">
                                        <Image
                                            src={product.product.image.length === 0 ? "/product/placeholder.png" : product.product.image[0].formats.small.url}
                                            layout="fill"
                                            objectFit="cover"
                                            alt={product.product.name}
                                        />
                                    </div>
                                    <div className="">
                                        <div className="text-lg-17 text-type-dark mb-10px font-medium">
                                            {
                                                lang == "ro" ?
                                                product.product.name
                                                :
                                                lang == "ru" ?
                                                product.product.nameru
                                                :
                                                product.product.nameen
                                            }
                                        </div>
                                        <div className="text-lg-14 text-accent-accent">
                                            { 
                                              roDomain ?
                                                currency === 4 ?
                                                  product.number + " x " + '...' :
                                                  product.number + " x " + Math.round(priceSingular / currency) + getCurrencyString(lang, roDomain)
                                              :
                                              product.number + " x " + priceSingular + getCurrencyString(lang, roDomain)
                                            }
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
                                        lang == "ro" || lang == "en"?
                                        "Sub-total"
                                        :
                                        "?????????????????????????? ????????"
                                    }
                                </div>
                                <div className="text-type-manatee w-full">
                                    {
                                      roDomain ?
                                      currency === 4 ?
                                        '...' :
                                        Math.round(priceTotal / currency) + getCurrencyString(lang, roDomain)
                                      :
                                        priceTotal + getCurrencyString(lang, roDomain)
                                    }
                                </div>
                            </div>

                            <div className="w-full bg-ui-white border-1.5px border-ui-grey px-8 py-6 flex flex-row justify-between items-start">
                                <div className="font-medium text-type-dark w-full">
                                    {
                                        lang == "ro" ?
                                        "Livrare"
                                        :
                                        lang == "ru" ?
                                        "????????????????"
                                        :
                                        "Delivery"
                                    }
                                </div>
                                <div className="text-type-manatee w-full">
                                    <div className="mb-2 font-medium">
                                        {
                                            userInfo.livrare == "livrare_la_usa" ?
                                                lang == "ro" ?
                                                  "livrare - gratuit??"
                                                  :
                                                  lang == "ru" ?
                                                  "???????????????? - ??????????????????"
                                                  :
                                                  "delivery - free"
                                            :
                                            userInfo.livrare == "nova_poshta" ?
                                                lang == "ro" ?
                                                  "livrare - 500 lei"
                                                  :
                                                  lang == "ru" ?
                                                  "???????????????? - 500 ??????"
                                                  :
                                                  "delivery - 500 lei"
                                            :
                                                lang == "ro" ?
                                                  "livrare - 0 lei"
                                                  :
                                                  lang == "ru" ?
                                                  "???????????????? - 0 ??????"
                                                  :
                                                  "delivery - 0 lei"
                                        }
                                    </div>
                                    <div>
                                        {
                                            userInfo.livrare == "livrare_la_usa" ?
                                                lang == "ro" ?
                                                "Livrare p??n?? la u????"
                                                :
                                                lang == "ru" ?
                                                "???????????????? ???? ??????????"
                                                :
                                                "Delivery to the door"
                                            :
                                            userInfo.livrare == "nova_poshta" ?
                                                lang == "ro" ?
                                                "Livrare prin Nova Poshta"
                                                :
                                                lang == "ru" ?
                                                "???????????????? ?????????? ???????? ??????????"
                                                :
                                                "Nova Poshta delivery"
                                            :
                                                lang == "ro" ?
                                                "Preluare din oficiu"
                                                :
                                                lang == "ru" ?
                                                "?????????? ???? ??????????"
                                                :
                                                "Pickup from the office"
                                        }
                                    </div>
                                    <div>
                                        {
                                            userInfo.livrare == "livrare_la_usa" || userInfo.livrare == "nova_poshta" ?
                                                userInfo.address
                                            :
                                                lang == "ro" ?
                                                "str. Ismail 98"
                                                :
                                                lang == "ru" ?
                                                "?????????? ???????????? 98"
                                                :
                                                "Ismail 98 street"
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
                                        lang == "ru" ?
                                        "??????????"
                                        :
                                        "Total"
                                    }
                                </div>
                                <div className="text-type-manatee w-full">
                                    {
                                        userInfo.livrare == "livrare_la_usa" ?
                                          roDomain ?
                                            currency === 4 ?
                                            '...'
                                            :
                                            Math.round(priceTotal / currency)
                                          :
                                          priceTotal
                                        :
                                        userInfo.livrare == "nova_poshta" ?
                                        priceTotal + 500
                                        :
                                        priceTotal
                                    }
                                    {
                                        getCurrencyString(lang, roDomain)
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="text-sm-h4 md:text-lg-28 text-type-manatee font-bold mb-3 mt-10">
                            {
                                lang == "ro" ?
                                "Comentariu"
                                :
                                lang == "ru" ?
                                "??????????????????????"
                                :
                                "Commentary"
                            }
                        </div>
                        <div className="text-lg-14 text-type-grey mb-4 font-bold">
                            {
                                lang == "ro" ?
                                "* Dac?? ave??i un promo-code, pute??i s??-l ad??uga??i aici"
                                :
                                lang == "ru" ?
                                "* ???????? ?? ?????? ???????? ????????????????, ???? ???????????? ???????????????? ?????? ??????????"
                                :
                                "* If you have a promocode, you can insert it here"
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
                                "Datele dvs. personale vor fi utilizate pentru a v?? procesa comanda, pentru a v?? sprijini experien??a pe acest site web ??i ??n alte scopuri descrise ??n pagina noastr?? "
                                :
                                lang == "ru" ?
                                "???????? ???????????? ???????????? ?????????? ???????????????????????????? ?????? ?????????????????? ???????????? ????????????, ?????? ?????????????????? ???????????? ?????????? ???? ???????? ??????-?????????? ?? ?????? ???????????? ??????????, ?????????????????? ???? ?????????? ???????????????? "
                                :
                                "Your personal data will be used to process your order, to support your experience on this website and for other purposes described on our "
                            }
                            <Link href={
                              lang == "ro" ? 
                              "/termeni"
                              :
                              lang == "ru"?
                              "/ru/termeni"
                              :
                              "/en/termeni"
                            }>
                              <a>
                                <span className="text-accent-accent">
                                    {
                                        lang == "ro" ?
                                        "politic?? de confiden??ialitate"
                                        :
                                        lang == "ru" ?
                                        "???????????????? ????????????????????????????????????"
                                        :
                                        "terms and conditions page"
                                    }
                                </span>.
                              </a>
                            </Link>
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
                                        "Am citit ??i sunt deacord cu condi??iile enun??iate ??n "
                                        :
                                        lang == "ru" ?
                                        "?? ???????????????? ?? ???????????????? ?? ??????????????????, ?????????????????????? ?? "
                                        :
                                        "I have read and agree to the conditions set out in "
                                    }
                                    <Link href={lang == "ro" ? "/termeni" : "/ru/termeni"}>
                                        <a>
                                            <span className="text-accent-accent">
                                                {
                                                    lang == "ro" ?
                                                    " termeni ??i condi??ii"
                                                    :
                                                    lang == "ru" ?
                                                    " ??????????????"
                                                    :
                                                    " terms and conditions"
                                                }
                                            </span>.
                                        </a>
                                    </Link>
                                    <span className="text-accent-error">
                                        {
                                            lang == "ro" ?
                                            " (Obligatoriu)"
                                            :        
                                            lang == "ru" ?                                    
                                            " (????????????????????o)"
                                            :
                                            " (Compulsory)"
                                        }
                                    </span>
                                </label>
                            </div>
                            :
                            <div>
                            </div>
                        }
                    </div>
                    
                    <div 
                        className={`${step == 4 ? agreed || userInfo.plata === "numerar" ? "bg-accent-accent hover:bg-accent-light cursor-pointer" : "bg-ui-blueishGrey" : "bg-accent-accent hover:bg-accent-light cursor-pointer"} text-ui-white rounded-md text-lg-button font-bold flex flex-row justify-center items-center mx-auto h-52px w-full lg:w-500px transition duration-300`}
                        onClick={step == 4 ? agreed || userInfo.plata === "numerar" ? handleSubmit(onSubmit) : donothing() : handleSubmit(onSubmit)}
                    >
                        {
                            step == 4 ?  
                                lang == "ro" ?
                                "Plaseaz?? comanda"
                                :
                                lang == "ru" ?
                                "???????????????? ??????????"
                                :
                                "Place the order"
                            : 
                                lang == "ro" ?
                                "Continu??"
                                :
                                lang == "ru" ?
                                "????????????????????"
                                :
                                "Continue"
                        }
                    </div>

                </div>
            </form>
            <form method="POST" target="_blank" ref={formRef} action="https://paynet.md/acquiring/getecom">
                <input type="hidden" name="Lang" value={lang == "ro" ? "ro-RO" : lang == "ru" ? "ru-RU" : "en-US"}/>
                <input type="hidden" name="operation" value=""/>
                <input type="hidden" name="ExpiryDate" value=""/>
                <input type="hidden" name="Signature" value=""/>
                <input type="hidden" name="LinkUrlSuccess" value=""/>
                <input type="hidden" name="LinkUrlCancel" value=""/>
            </form>
        </div>
    )
}