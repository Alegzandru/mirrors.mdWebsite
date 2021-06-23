import { useState } from "react"
import dynamic from 'next/dynamic'
// const emailjs = dynamic(import('emailjs-com'), { ssr: false })
import emailjs from 'emailjs-com';

export default function ContacteForm () {

    const [state, setState] = useState({
        nume: "",
        phone: "",
        message: "",
    })

    const [emailSent, setEmailSent] = useState(0)

    function handleInputChange(e) {
        e.preventDefault();
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setState({ ...state , [name]: value });
    }

    function sendEmail(e) {

        e.preventDefault();

        const templateParams = {
            from_name: state.nume +  " ( Nr. de Telefon : " + state.phone + ")",
            to_name: "Mirrors Md",
            message: state.message
        };

        emailjs
            .send("contact_mirrors", "contact_mirrors_template", templateParams, "user_ZA1vIK4AFiFlHQavVXqcs")
            .then(
                function(response) {
                console.log("SUCCESS!", response.status, response.text);
                },
                function(err) {
                }
            );
        setState({
            nume: "",
            phone: "",
            message: "",
        });

        setEmailSent(true)

    }

    return(
        <form 
            className="w-full px-container-sm md:px-container-md lg:px-304px xl:px-container-xl bg-ui-darkGrey pb-240px"
            onSubmit={sendEmail}
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
                            id="name"
                            name="nume"
                            onChange={handleInputChange}
                            required
                            value={state.nume}
                        />
                    </div>

                    <div className="w-full md:w-auto flex-grow">
                        <div className="text-lg-14 font-medium text-type-manatee mb-2">
                            Nr. de Telefon
                        </div>
                        <input 
                            className="w-full h-12 bg-ui-grey rounded-sm border border-ui-blueishGrey text-type-grey flex flex-row items-center justify-start px-4"
                            type="text" 
                            placeholder="+373 78 787 878"
                            id="phone"
                            name="phone"
                            onChange={handleInputChange}
                            required
                            value={state.phone}
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
                        id="message"
                        name="message"
                        onChange={handleInputChange}
                        required
                        value={state.message} 
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