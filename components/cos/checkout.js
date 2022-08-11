import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { email } from '../../lib/email';
import { coeficientFinder } from '../../lib/products';
import { getCurrency, getCurrencyString, getPrice, getPriceAddon, isRoDomain } from '../../utils/general';
import { CartContext, PopupContext } from '../context';

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

  const { register, handleSubmit, formState: { errors } } = useForm();

  const router = useRouter()

  const donothing = () => {
  }

  useEffect(() => {
    const withCurrency = async () => {
      const currencyStrapi = await getCurrency()
      setCurrency(currencyStrapi)
    }

    withCurrency()
  }, [] )

  const sendMailOwner = (data) => email.owner(data)

  const sendMailClient = (data) => email.client(data)

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

        const getFinishedProduct = cartProduct.product.finished_products.filter((finished) => (
          cartProduct.size.height === finished.height && cartProduct.size.width === finished.width
        ))[0]

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            products : [cartProduct.product],
            add_ons : cartProduct.addOns,
            price : price,
            number : cartProduct.number,
            size : cartProduct.size,
            text_acrilic: cartProduct.textAcrilic,
            finished_product: getFinishedProduct
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

          if(strapiData.mod_de_plata == "card") {
            const priceViva = roDomain ? Math.round(strapiData.pret / currency) * 100 : strapiData.pret * 100
            try {
              const linkRaw = await fetch("/api/vivawallet", {
                "method": "POST",
                "headers": { "content-type": "application/json" },
                "body": JSON.stringify({
                amount: priceViva,
                fullName: userInfo.nume + ' ' + userInfo.prenume,
                email: userInfo.email,
                })
              })

              const {success, link, errorMessage} = await linkRaw.json()

              if(success){
                setVivaLink(link)
                setButton(1)
              }
              else {
                setVivaError(errorMessage)
              }
            }
            catch(e){
              console.log("Error : ", e)
            }
          }
          else {
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
    else {
      setStep(step+1)
    }
  }

  return (
    <div>
      <div className={`w-288px h-240px bg-ui-white fixed top-checkout-top left-checkout-left flex flex-col items-center justify-center rounded-xl ${popupDone ? "block" : "hidden"} z-20`}>
        <div className="w-224px h-224px">
          <video
            autoPlay loop muted playsInline className="z-10 relative bg-ui-dark w-full h-full outline-none transform scale-105" 
          >
            <source src="/checkout/done.mp4" type="video/mp4"/>
          </video>              
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
            <div className="flex flex-col justify-center items-center relative w-full">
              <Image
                src="/branding/vivawallet.png"
                height={55}
                width={240}
                alt="Vuva logo"
              ></Image>
              <a href={vivaLink} target="_blank" className="w-full" onClick={() => emptyCart()}>
                <button className={`${vivaLink ? "flex" : "hidden"} flex-row justify-center items-center bg-accent-accent rounded-lg text-ui-white font-bold hover:bg-accent-light h-12 w-full transition duration-300 mt-4`}>
                  {
                  lang == "ro" ?
                  "Plătește comanda"
                  :
                  lang == "ru" ?
                  "Оплатить заказ"
                  :
                  "Pay the order"
                  }
                </button>
              </a>
            </div>
          :
            <div className="w-224px h-224px">
              <video
                autoPlay loop muted playsInline className="z-10 relative bg-ui-dark w-full h-full outline-none transform scale-105" 
              >
                <source src="/checkout/loading.mp4" type="video/mp4"/>
              </video>              
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
                  "Coș"
                  :
                  lang == "ru" ?
                  "Корзина"
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
            "Înregistrarea comenzii"
            :
            lang == "ru" ?
            "Оформление заказа"
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
                  "Контактная информация"
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
                  "Доставка"
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
                  "Modalitatea de plată"
                  :
                  lang == "ru" ?
                  "Способ оплаты"
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
                  "Размещение заказа"
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
                    "Фамилия"
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
                      "* Introduceți numele Dvs."
                      :
                      lang == "ru" ?
                      "* Введите вашу фамилию."
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
                    "Имя"
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
                      "* Introduceți prenumele Dvs."
                      :
                      lang == "ru" ?
                      "* Введите свое имя."
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
                    "Электронная почта"
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
                      "* Introduceți poșta electronică"
                      :
                      lang == "ru" ?
                      "* Введите адрес электронной почты"
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
                    "Телефон"
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
                      "* Introduceți numărul de telefon"
                      :
                      lang == "ru" ?
                      "* Введите номер телефона"
                      :
                      "* Insert your phone number"
                    }
                  </div>
                }
                {errors.telefon?.type === 'minLength' && 
                  <div className="text-accent-error text-lg-12 mt-2">
                    {
                      lang == "ro" ?
                      "* Lungimea minimă a numărului este 8 cifre"
                      :
                      lang == "ru" ?
                      "* Минимальная длина номера - 8 цифр"
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
                  "Приём из офиса, улица Измаил 98"
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
                  "бесплатно"
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
                    "* Introduceți modul de livrare"
                    :
                    lang == "ru" ?
                    "* Введите способ доставки"
                    :
                    "* Select a shipping method"
                  }
                </div>
              }
              <div className="w-full mr-4 text-lg-14">
                {
                  lang == "ro" ?
                  "Livrare până la ușă"
                  :
                  lang == "ru" ?
                  "Доставка до двери"
                  :
                  "Delivery to the door"
                }
              </div>
              <div className="w-full text-lg-14 font-medium">
                {
                  lang == "ro" ?
                    "gratuit (în raza Chișinăului)"
                  :
                    lang == "en" ?
                    "free (within Chisinau)"
                  :
                    "бесплатно (по Кишиневу)"
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
                    "* Introduceți modul de livrare"
                    :
                    lang == "ru" ?
                    "* Введите способ доставки"
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
                  "Доставка через Нова Пошта"
                  :
                  "Nova Poshta delivery"
                }
              </div>
              <div className="w-full text-lg-14 font-medium">
                {
                  lang == "ro" || lang == "en" ?
                  "500 lei"
                  :
                  "500 лей"
                }
              </div>
            </label>}

            <div className="mb-2 text-lg-14 font-medium text-type-manatee">
              {
                lang == "ro" ?
                "Oraș"
                :
                lang == "ru" ?
                "Город"
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
                  "* Introduceți orașul Dvs."
                  :
                  lang == "ru" ?
                  "* Введите свой город."
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
                "Адрес"
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
                  "* Introduceți adresa Dvs."
                  :
                  lang == "ru" ?
                  "* Введите свой адрес."
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
                  "Перевод с карты"
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
                  "Оплата при доставке"
                  :
                  "Cash on delivery"
                }
              </div>
            </label>
            {errors.plata?.type === 'required' && 
              <div className="text-accent-error text-lg-12 mt-2">
                {
                  lang == "ro" ?
                  "* Introduceți modul de plată"
                  :
                  lang == "ru" ?
                  "* Введите способ оплаты"
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
                "Ваш заказ" 
                :
                "Your order"
              }
            </div>
            {cart.map((product) => {
              let addOnsPrice = 0
              product.addOns.forEach((addOn) => {
                addOnsPrice += getPriceAddon( addOn, product.size )
              })
              let priceSingular = product.stock ? product.price : Math.round(getPrice(product.product, product.size) * ( 1 + coeficientFinder(product.size, product.product, roDomain))) + addOnsPrice
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
                    "Промежуточный итог"
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
                    "Доставка"
                    :
                    "Delivery"
                  }
                </div>
                <div className="text-type-manatee w-full">
                  <div className="mb-2 font-medium">
                    {
                      userInfo.livrare == "livrare_la_usa" ?
                        lang == "ro" ?
                          "livrare - gratuită"
                          :
                          lang == "ru" ?
                          "доставка - бесплатно"
                          :
                          "delivery - free"
                      :
                      userInfo.livrare == "nova_poshta" ?
                        lang == "ro" ?
                          "livrare - 500 lei"
                          :
                          lang == "ru" ?
                          "доставка - 500 лей"
                          :
                          "delivery - 500 lei"
                      :
                        lang == "ro" ?
                          "livrare - 0 lei"
                          :
                          lang == "ru" ?
                          "доставка - 0 лей"
                          :
                          "delivery - 0 lei"
                    }
                  </div>
                  <div>
                    {
                      userInfo.livrare == "livrare_la_usa" ?
                        lang == "ro" ?
                        "Livrare până la ușă"
                        :
                        lang == "ru" ?
                        "Доставка до двери"
                        :
                        "Delivery to the door"
                      :
                      userInfo.livrare == "nova_poshta" ?
                        lang == "ro" ?
                        "Livrare prin Nova Poshta"
                        :
                        lang == "ru" ?
                        "Доставка через Нова Пошта"
                        :
                        "Nova Poshta delivery"
                      :
                        lang == "ro" ?
                        "Preluare din oficiu"
                        :
                        lang == "ru" ?
                        "Приём из офиса"
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
                        "улица Исмаил 98"
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
                    "Итого"
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
                "Комментарий"
                :
                "Commentary"
              }
            </div>
            <div className="text-lg-14 text-type-grey mb-4 font-bold">
              {
                lang == "ro" ?
                "* Dacă aveți un promo-code, puteți să-l adăugați aici"
                :
                lang == "ru" ?
                "* Если у вас есть промокод, вы можете добавить его здесь"
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
                "Datele dvs. personale vor fi utilizate pentru a vă procesa comanda, pentru a vă sprijini experiența pe acest site web și în alte scopuri descrise în pagina noastră "
                :
                lang == "ru" ?
                "Ваши личные данные будут использоваться для обработки вашего заказа, для поддержки вашего опыта на этом веб-сайте и для других целей, описанных на нашей странице "
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
                    "politică de confidențialitate"
                    :
                    lang == "ru" ?
                    "политика конфиденциальности"
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
                    "Am citit și sunt deacord cu condițiile enunțiate în "
                    :
                    lang == "ru" ?
                    "Я прочитал и согласен с условиями, изложенными в "
                    :
                    "I have read and agree to the conditions set out in "
                  }
                  <Link href={lang == "ro" ? "/termeni" : "/ru/termeni"}>
                    <a>
                      <span className="text-accent-accent">
                        {
                          lang == "ro" ?
                          " termeni și condiții"
                          :
                          lang == "ru" ?
                          " условия"
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
                      " (Обязательнo)"
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
                "Plasează comanda"
                :
                lang == "ru" ?
                "Оформите заказ"
                :
                "Place the order"
              : 
                lang == "ro" ?
                "Continuă"
                :
                lang == "ru" ?
                "Продолжить"
                :
                "Continue"
            }
          </div>

        </div>
      </form>
    </div>
  )
}