import TermeniSiConditii from "../../components/termeni/termeniSiConditii";
import Layout from "../../components/layout"
import { HeadWithMeta } from "../../components/HeadWithMeta";

export default function Termeni (){
    return(
        <Layout lang="ru">
            <HeadWithMeta
              title="Условия пользования | Millora"
              description=""
              img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
              index={false}
            />
            <TermeniSiConditii
                lang="ru"
            ></TermeniSiConditii>
        </Layout>
    )
}