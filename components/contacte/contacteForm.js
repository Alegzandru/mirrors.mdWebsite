export default function ContacteForm () {
    return(
        <div className="w-full px-container-sm md:px-container-md lg:px-304px bg-ui-darkGrey pb-240px">
            <div className="w-full">
                <h4 className="text-sm-h4 md:text-md-h4 lg:text-lg-h4 font-medium text-type-dark mx-auto text-center font-Ubuntu mb-12">
                    Lăsați-ne un mesaj
                </h4>

                <div className="w-full flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8">
                    <div className="w-full md:w-auto flex-grow md:mr-8 mb-6 md:mb-0">
                        <div className="text-lg-14 font-medium text-type-manatee mb-2">
                            Nume Prenume
                        </div>

                        <input className="w-full h-12 bg-ui-grey rounded-sm border border-ui-blueishGrey text-type-grey flex flex-row items-center justify-start px-4"/>
                    </div>

                    <div className="w-full md:w-auto flex-grow">
                        <div className="text-lg-14 font-medium text-type-manatee mb-2">
                            E-mail
                        </div>
                        <input className="w-full h-12 bg-ui-grey rounded-sm border border-ui-blueishGrey text-type-grey flex flex-row items-center justify-start px-4"/>
                    </div>
                </div>

                <div className="w-full">
                    <div className="text-lg-14 font-medium text-type-manatee mb-2 w-full">
                        Mesajul Dvs
                    </div>
                    <input className="w-full h-160px bg-ui-grey rounded-sm border border-ui-blueishGrey text-type-grey flex flex-row items-center justify-start px-4"/>
                </div>

                <div 
                    className="h-12 w-fullcmd md:w-238px rounded-lg mx-auto bg-accent-transparent font-bold text-lg-button text-accent-accent flex flex-row justify-center items-center mt-40px md:mt-8">
                    Expediază
                </div>
            </div>
        </div>
    )
}