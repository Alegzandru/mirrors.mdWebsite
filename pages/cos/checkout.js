import Checkout from "../../components/cos/checkout"
import { HeadWithMeta } from "../../components/HeadWithMeta"
import Layout from "../../components/layout"

export default function CheckoutPage(){
    return (
        <Layout lang="ro">
            <HeadWithMeta
              title="Checkout | Millory"
              description=""
              img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
              index={false}
            />
            <Checkout lang="ro"></Checkout>
        </Layout>
    )
}