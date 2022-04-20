import Layout from "../../components/layout";
import CosProducts from "../../components/cos/cosProducts.js"
import CosTotal from "../../components/cos/cosTotal.js"
import { HeadWithMeta } from "../../components/HeadWithMeta";

export default function Cos () {
    return(
        <Layout lang="en">
            <HeadWithMeta
              title="Cart | Millora"
              description=""
              img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
              index={false}
            />
            <CosProducts
                lang="en"
            ></CosProducts>
            <CosTotal
                lang="en"
            ></CosTotal>
        </Layout>
    )
}