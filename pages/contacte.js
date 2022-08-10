import ContacteForm from '../components/contacte/contacteForm';
import ContacteMap from '../components/contacte/contacteMap';
import { HeadWithMeta } from '../components/HeadWithMeta';
import Layout from '../components/layout';
import RecentProducts from '../components/multiPage/recentProducts';

export default function Contacte () {
    return(
        <Layout lang="ro">
            <HeadWithMeta
              title="Contacte | Millory"
              description="Puteti vedea produsele de pe site-ul Millory in showroom-ul nostru de pe strada Ismail 98. Pentru a ne contacta, telefonati la +373 69 482 034."
              img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
              index={true}
            />
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