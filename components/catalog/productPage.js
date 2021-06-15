import ProductComponent from "./productComponent"
import ProductDescription from "./productDescription"

export default function ProductPage ({deviceType, name, price, images, description, category, options, optionVariants, productData}) {

    // const options = [
    //     "Dimensiuni",
    //     "Foaie de oglinda",
    //     "Instalarea lampilor",
    //     "Oglinda cosmetica cu marire",
    //     "Ceas",
    //     "Cadru",
    //     "Sisteme de incalzire",
    //     "Raft",
    //     "Alte optiuni"
    // ]

    // const optionVariants = [
    //     {
    //         name : "100 x 70 cm",
    //         price : "3826 lei",
    //     },
    //     {
    //         name : "50 x 50 cm",
    //         price : "2294 lei",
    //     },
    //     {
    //         name : "60 x 60 cm",
    //         price : "2685 lei",
    //     },
    //     {
    //         name : "60 x 80 cm",
    //         price : "3064 lei",
    //     },
    //     {
    //         name : "80 x 60 cm",
    //         price : "3124 lei",
    //     },
    //     {
    //         name : "70 x 100 cm",
    //         price : "3737 lei",
    //     }
    // ]

    return (
        <div>
            <ProductComponent 
                deviceType={deviceType} 
                options={options} 
                optionVariants={optionVariants}
                name={name}
                price={price}
                images={images}
                category={category}
                productData={productData}
            />
            <ProductDescription 
                deviceType={deviceType} 
                images={images} 
                options={options} 
                optionVariants={optionVariants}
                name={name}
                description={description}
            />
        </div>
    )
}