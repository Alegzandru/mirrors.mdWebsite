import ProductComponent from "./productComponent"
import ProductDescription from "./productDescription"
import RecentProducts from "../multiPage/recentProducts"

export default function ProductPage ({deviceType, name, price, images, description, category, options, optionVariants, productData, optionsRaw}) {

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
                optionsRaw={optionsRaw}
            />
            <ProductDescription 
                deviceType={deviceType} 
                images={images} 
                options={options} 
                optionVariants={optionVariants}
                name={name}
                description={description}
            />
            <RecentProducts>
            </RecentProducts>
        </div>
    )
}