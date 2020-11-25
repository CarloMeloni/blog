import Layout from '../components/Layout';
import Link from 'next/link';

const index = () => {
    return (
        <Layout>
        <h2>iNDEX PAGE!</h2>
        <Link href="/signup">
            <a style={{ padding: "20px" }}>
                Registrati
            </a>
        </Link>
        <Link href="/signin">
            <a style={{ padding: "20px" }}>
                Login
            </a>
        </Link>
    </Layout>
    )

}

export default index;