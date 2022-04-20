import Layout from "../../components/layout";
import IntrebariFrecventeComponent from "../../components/faq/intrebariFrecventeComponent.js"
import RecentProducts from "../../components/multiPage/recentProducts"
import { HeadWithMeta } from "../../components/HeadWithMeta";


export default function IntrebariFrecvente () {
    return (
        <Layout lang="ru">
            <HeadWithMeta
              title="Частые вопросы | Millora"
              description="Здесь мы отвечаем на вопросы, которые часто возникают при заказе на сайте Millora."
              img="https://res.cloudinary.com/dbh1vgas3/image/upload/v1629027820/logoMirrors2_rzmtcv.jpg"
              index={true}
            />
            <IntrebariFrecventeComponent
                lang="ru"
            ></IntrebariFrecventeComponent>
            <RecentProducts
                lang="ru"
            ></RecentProducts>
        </Layout>
    )
}