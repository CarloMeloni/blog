import Layout from '../components/Layout';
import Link from 'next/link';

const index = () => {
    return (
        <Layout>
        <h2>iNDEX PAGE!</h2>
        <Link href="/signup">
            <a>Registrati!</a>
        </Link>
    </Layout>
    )

}

export default index;