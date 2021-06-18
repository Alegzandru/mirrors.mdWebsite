import Link from 'next/link'

export default function Checkout() {
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
            <h2 className="text-lg-h2 text-type-dark font-bold w-full text-center mb-3">
                Înregistrarea comenzii
            </h2>
            <div className="h-px bg-ui-blueishGrey w-full mb-68px"/>
            <div className="px-268px">
                <div className="w-full flex flex-row justify-between items-start">
                    <div>

                    </div>
                </div>
            </div>
        </div>
    )
}