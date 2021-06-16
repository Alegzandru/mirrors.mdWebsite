import Dropdown from "./Dropdown"

export default function FilterPopup (props) {
    return (
        <div 
            className={`w-full min-h-screen bg-ui-white relative top-0 left-0 z-30 ${props.openFilters ? "block" : "hidden"} px-container-sm md:px-container-md pt-32 pb-8`}
            style={{
                minHeight : "100vh"
            }}
        >
            <div 
                className="ml-auto w-40px h-40px"
                onClick={() => props.setOpenFilters(!props.openFilters)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-40px w-40px text-type-grey" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>

            <h3 className="text-md-h3 text-type-dark mb-8 font-bold">
                Filtre
            </h3>

            <form onSubmit={props.handleSubmit(props.onSubmit)} className="w-full">
                <div className="w-full">
                    {props.optiuni.map((option, index)=>
                        <Dropdown 
                            key={index} 
                            name={option}
                            filterOptions={
                                props.category[0].filters.filter((filter) => {
                                if(filter.name == option){
                                    return true
                                }
                                else{
                                    return false
                                }
                            })}
                            register={props.register}
                            active={props.activeFilters[index].active}
                        ></Dropdown>
                    )}

                    <div className="flex flex-row justify-between items-center h-12 mt-8 text-lg-14 font-medium">
                        <input 
                            className="h-full w-full mr-2 rounded-lg border border-1.5px border-ui-blueishGrey flex flex-row justify-center items-center text-type-grey"
                            type="submit"
                            value="Resetează"
                            onClick={() => {
                                props.reset()
                                props.setOpenFilters(!props.openFilters)
                            }}
                        />

                        <input 
                            className="h-full w-full mr-2 rounded-lg border border-1.5px border-ui-blueishGrey flex flex-row justify-center items-center text-ui-white bg-accent-accent"
                            type="submit"
                            value="Aplică"
                            onClick={() => {
                                props.setOpenFilters(!props.openFilters)
                            }}
                        />
                    </div>
                    
                </div>
            </form>
        </div>
    )
}