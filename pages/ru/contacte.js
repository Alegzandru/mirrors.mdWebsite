import Layout from "../../components/layout";
import ContacteMap from "../../components/contacte/contacteMap"
import ContacteForm from "../../components/contacte/contacteForm"
import RecentProducts from "../../components/multiPage/recentProducts"
import { HeadWithMeta } from "../../components/HeadWithMeta";

export default function Contacte () {
    return(
        <Layout lang="ru">
            <HeadWithMeta
              title="Контакты | Millora"
              description="Вы можете увидеть продукцию на сайте Millora в нашем выставочном зале на Ismail 98. Чтобы связаться с нами, позвоните по телефону +373 69 482 034."
              img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
              index={true}
            />
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