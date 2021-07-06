import Layout from "../../components/layout";
import ContacteMap from "../../components/contacte/contacteMap"
import ContacteForm from "../../components/contacte/contacteForm"
import RecentProducts from "../../components/multiPage/recentProducts"

export default function Contacte () {
    return(
        <Layout>
            <ContacteMap
                lang="ru"
            ></ContacteMap>
            <ContacteForm
                lang="ru"
            ></ContacteForm>
            <RecentProducts
                lang="ru"
            ></RecentProducts>
        </Layout>
    )
}