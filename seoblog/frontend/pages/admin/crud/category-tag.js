import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import CategoryForm from '../../../components/crud/Category';
import TagForm from '../../../components/crud/Tag';

import Link from 'next/link';

const CategoryTag = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Gestisci le categorie e i tags</h2>
                        </div>
                        <div className="col-md-6">
                            <CategoryForm />
                        </div>
                        <div className="col-md-6">
                            <TagForm />
                        </div>
                    </div>
                </div>
            </Admin>
    </Layout>
    )

}

export default CategoryTag;