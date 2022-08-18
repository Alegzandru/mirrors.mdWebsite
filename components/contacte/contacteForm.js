import { useState } from "react"
import dynamic from 'next/dynamic'
import { useForm } from "react-hook-form";

export default function ContacteForm ({lang}) {

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

    const sendMail = async (data) => {
        try {
            await fetch("/api/contact", {
                "method": "POST",
                "headers": { "content-type": "application/json" },
                "body": JSON.stringify(data)
            })
        }
        catch (error) {
        }
    }

    return(
        <form 
            className="w-full px-container-sm md:px-container-md lg:px-304px xl:px-container-xl bg-ui-darkGrey pb-240px"
            onSubmit={handleSubmit(sendMail)}
        >
            <div className="w-full">
                <h4 className="text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium text-type-dark mx-auto text-center font-Ubuntu mb-12">
                    {
                        lang == "ro" ?
                        "Lăsați-ne un mesaj"
                        :
                        lang == "ru" ?
                        "Оставьте нам сообщение"
                        :
                        "Leave us a message"
                    }
                </h4>

                <div className="w-full flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8">
                    <div className="w-full md:w-auto flex-grow md:mr-8 mb-6 md:mb-0">
                        <div className="text-lg-14 font-medium text-type-manatee mb-2">
                            {
                                lang == "ro" ?
                                "Nume Prenume"
                                :
                                lang == "ru" ?
                                "Имя Фамилия"
                                :
                                "Full name"
                            }
                        </div>

                        <input 
                            className="w-full h-12 bg-ui-grey rounded-sm border border-ui-blueishGrey text-type-grey flex flex-row items-center justify-start px-4"
                            type="text" 
                            placeholder="Moraru Constantin"
                            {...register("nume", { required : true})}
                        />
                    </div>

                    <div className="w-full md:w-auto flex-grow">
                        <div className="text-lg-14 font-medium text-type-manatee mb-2">
                            {
                                lang == "ro" ?
                                "Nr. de Telefon"
                                :
                                lang == "ru" ?
                                "Телефонный номер"
                                :
                                "Phone number"
                            }
                        </div>
                        <input 
                            className="w-full h-12 bg-ui-grey rounded-sm border border-ui-blueishGrey text-type-grey flex flex-row items-center justify-start px-4"
                            type="number" 
                            placeholder="+373 78 787 878"
                            {...register("phone", { required : true, minLength: 8})}
                        />
                        {errors.phone?.type === 'minLength' && 
                            <div className="text-accent-error text-lg-12 mt-2">
                                {
                                    lang == "ro" ?
                                    "* Lungimea minimă a numărului este 8 cifre"
                                    :
                                    lang == "ru" ?
                                    "* Минимальная длина номера - 8 цифр"
                                    :
                                    "* Minimum number length - 8 digits"
                                }
                            </div>
                        }
                    </div>
                </div>

                <div className="w-full">
                    <div className="text-lg-14 font-medium text-type-manatee mb-2 w-full">
                        {
                            lang == "ro" ?
                            "Mesajul Dvs"
                            :
                            lang == "ru" ?
                            "Ваше сообщение"
                            :
                            "Your message"
                        }
                    </div>
                    <input 
                        className="w-full h-160px bg-ui-grey rounded-sm border border-ui-blueishGrey text-type-grey flex flex-row items-center justify-start px-4"
                        type="text" 
                        placeholder=""
                        {...register("message", { required : true})}
                    />
                </div>

                <input 
                    className="h-12 w-full md:w-238px rounded-lg mx-auto bg-accent-transparent font-bold text-lg-button text-accent-accent flex flex-row justify-center items-center mt-40px md:mt-8 cursor-pointer"
                    value={lang == "ro" ? "Expediază" : lang == "ru" ? "Послать" : "Send"}
                    type="submit"
                />
            </div>
        </form>
    )
}