import { useState } from "react"
import dynamic from 'next/dynamic'
import { useForm } from "react-hook-form";

export default function ContacteForm () {

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

    const [emailSent, setEmailSent] = useState(0)

    return(
        <form 
            className="w-full px-container-sm md:px-container-md lg:px-304px xl:px-container-xl bg-ui-darkGrey pb-240px"
            onSubmit={handleSubmit(sendMail)}
        >
            <div className="w-full">
                <h4 className="text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium text-type-dark mx-auto text-center font-Ubuntu mb-12">
                    Lăsați-ne un mesaj
                </h4>

                <div className="w-full flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8">
                    <div className="w-full md:w-auto flex-grow md:mr-8 mb-6 md:mb-0">
                        <div className="text-lg-14 font-medium text-type-manatee mb-2">
                            Nume Prenume
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
                            Email
                        </div>
                        <input 
                            className="w-full h-12 bg-ui-grey rounded-sm border border-ui-blueishGrey text-type-grey flex flex-row items-center justify-start px-4"
                            type="text" 
                            placeholder="email@gmail.com"
                            {...register("email", { required : true})}
                        />
                    </div>
                </div>

                <div className="w-full">
                    <div className="text-lg-14 font-medium text-type-manatee mb-2 w-full">
                        Mesajul Dvs
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
                    value="Expediază"
                    type="submit"
                />
            </div>
        </form>
    )
}