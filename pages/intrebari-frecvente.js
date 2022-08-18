import Layout from "../components/layout";
import IntrebariFrecventeComponent from "../components/faq/intrebariFrecventeComponent.js"
import RecentProducts from "../components/multiPage/recentProducts"
import { HeadWithMeta } from "../components/HeadWithMeta";


export default function IntrebariFrecvente () {
    return (
        <Layout lang="ro">
            <HeadWithMeta
              title="Intrebari frecvente | Millory"
              description="Aici adresam intrebarile care apar des in timpul unei comenzi pe site-ul Millory."
              img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
              index={true}
            />
            <IntrebariFrecventeComponent
                lang="ro"
            ></IntrebariFrecventeComponent>
            <RecentProducts
                lang="ro"
            ></RecentProducts>
        </Layout>
    )
}