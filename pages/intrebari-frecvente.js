import Layout from "../components/layout";
import IntrebariFrecventeComponent from "../components/faq/intrebariFrecventeComponent.js"
import RecentProducts from "../components/multiPage/recentProducts"


export default function IntrebariFrecvente () {
    return (
        <Layout>
            <IntrebariFrecventeComponent></IntrebariFrecventeComponent>
            <RecentProducts></RecentProducts>
        </Layout>
    )
}