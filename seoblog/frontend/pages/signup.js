import Layout from '../components/Layout';
import Link from 'next/link';

const Signup = () => {
    return (
        <Layout>
        <h2>Signup PAGE!</h2>
        <Link href="/">
            <a>
                Home
            </a>
        </Link>
    </Layout>
    )

}

export default Signup;