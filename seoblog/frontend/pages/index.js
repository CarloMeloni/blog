import Layout from '../components/Layout';
import Link from 'next/link';

const index = () => {
    return (
        <Layout>
            <h2 className="display-3 text-center">PAGINA PRINCIPALE DEL BLOG</h2>
        <img style={{height: "95vh", width: "100%"}} src="/static/images/newspaper.jpg" />
    </Layout>
    )

}

export default index;