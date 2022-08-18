import Layout from "../../components/layout";
import IntrebariFrecventeComponent from "../../components/faq/intrebariFrecventeComponent.js"
import RecentProducts from "../../components/multiPage/recentProducts"
import { HeadWithMeta } from "../../components/HeadWithMeta";


export default function IntrebariFrecvente () {
    return (
        <Layout lang="en">
            <HeadWithMeta
              title="FAQ | Millory"
              description="Here we address the questions that often arise during an order on the Millory website."
              img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
              index={true}
            />
            <IntrebariFrecventeComponent
                lang="en"
            ></IntrebariFrecventeComponent>
            <RecentProducts
                lang="en"
            ></RecentProducts>
        </Layout>
    )
}