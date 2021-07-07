import Layout from "../components/layout";
import ContacteMap from "../components/contacte/contacteMap"
import ContacteForm from "../components/contacte/contacteForm"
import RecentProducts from "../components/multiPage/recentProducts"

export default function Contacte () {
    return(
        <Layout lang="ro">
            <ContacteMap
                lang="ro"
            ></ContacteMap>
            <ContacteForm
                lang="ro"
            ></ContacteForm>
            <RecentProducts
                lang="ro"
            ></RecentProducts>
        </Layout>
    )
}