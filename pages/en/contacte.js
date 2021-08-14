import Layout from "../../components/layout";
import ContacteMap from "../../components/contacte/contacteMap"
import ContacteForm from "../../components/contacte/contacteForm"
import RecentProducts from "../../components/multiPage/recentProducts"

export default function Contacte () {
    return(
        <Layout lang="en">
            <ContacteMap
                lang="en"
            ></ContacteMap>
            <ContacteForm
                lang="en"
            ></ContacteForm>
            <RecentProducts
                lang="en"
            ></RecentProducts>
        </Layout>
    )
}