export default function Paper (props) {
    return (
        <div className="w-full bg-ui-grey py-40px px-8 md:p-16 mb-40px">
            {props.children}
        </div>
    )
}