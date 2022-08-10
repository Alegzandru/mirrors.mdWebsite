import Layout from "../components/layout";
import CosProducts from "../components/cos/cosProducts.js"
import CosTotal from "../components/cos/cosTotal.js"
import { HeadWithMeta } from "../components/HeadWithMeta";

export default function Cos () {
    return(
        <Layout lang="ro">
            <HeadWithMeta
              title="Cos | Millory"
              description=""
              img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
              index={false}
            />
            <CosProducts
                lang="ro"
            ></CosProducts>
            <CosTotal
                lang="ro"
            ></CosTotal>
        </Layout>
    )
}