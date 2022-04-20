import Layout from "../../components/layout";
import ContacteMap from "../../components/contacte/contacteMap"
import ContacteForm from "../../components/contacte/contacteForm"
import RecentProducts from "../../components/multiPage/recentProducts"
import { HeadWithMeta } from "../../components/HeadWithMeta";

export default function Contacte () {
    return(
        <Layout lang="en">
            <HeadWithMeta
              title="Contacts | Millora"
              description="You can see the products from the Millora website in our showroom on Ismail 98 street. To contact us, call +373 69 482 034."
              img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
              index={true}
            />
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