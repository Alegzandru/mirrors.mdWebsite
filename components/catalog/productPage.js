import ProductComponent from "./productComponent"
import ProductDescription from "./productDescription"

export default function ProductPage ({deviceType}) {

    const images = [
        "/mainPage/popularProducts/Copy of  Veronica.png",
        "/mainPage/popularProducts/Copy of Acacia.png",
        "/mainPage/popularProducts/Copy of Adina Alumin.png",
        "/mainPage/popularProducts/Copy of Afina.png",
        "/mainPage/popularProducts/Copy of Alexandra.png",
        "/mainPage/popularProducts/Copy of Alexandrina (1).png",
        "/mainPage/popularProducts/Copy of  Veronica.png",
        "/mainPage/popularProducts/Copy of Acacia.png",
        "/mainPage/popularProducts/Copy of Adina Alumin.png",
        "/mainPage/popularProducts/Copy of Afina.png",
        "/mainPage/popularProducts/Copy of Alexandra.png",
        "/mainPage/popularProducts/Copy of Alexandrina (1).png",
    ];

    const options = [
        "Dimensiuni",
        "Foaie de oglinda",
        "Instalarea lampilor",
        "Oglinda cosmetica cu marire",
        "Ceas",
        "Cadru",
        "Sisteme de incalzire",
        "Raft",
        "Alte optiuni"
    ]

    const optionVariants = [
        {
            name : "100 x 70 cm",
            price : "3826 lei",
        },
        {
            name : "50 x 50 cm",
            price : "2294 lei",
        },
        {
            name : "60 x 60 cm",
            price : "2685 lei",
        },
        {
            name : "60 x 80 cm",
            price : "3064 lei",
        },
        {
            name : "80 x 60 cm",
            price : "3124 lei",
        },
        {
            name : "70 x 100 cm",
            price : "3737 lei",
        }
    ]

    return (
        <div>
            <ProductComponent deviceType={deviceType} images={images} options={options} optionVariants={optionVariants}/>
            <ProductDescription deviceType={deviceType} images={images} options={options} optionVariants={optionVariants}/>
        </div>
    )
}