import Layout from "../components/layout";
import ContacteMap from "../components/contacte/contacteMap"
import ContacteForm from "../components/contacte/contacteForm"

export default function Contacte () {
    return(
        <Layout>
            <ContacteMap></ContacteMap>
            <ContacteForm></ContacteForm>
        </Layout>
    )
}