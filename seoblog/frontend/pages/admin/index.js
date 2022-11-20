import Layout from "../../components/Layout";
import Admin from "../../components/auth/Admin";
import Link from "next/link";

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2>ADMIN DASHBOARD</h2>
            </div>
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/crud/category-tag">
                    <a>Crea Categoria</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/admin/crud/category-tag">
                    <a>Crea Tag</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <a href="/admin/crud/blog">Crea Articolo</a>
                </li>
                <li className="list-group-item">
                  <Link href="/admin/crud/blogs">
                    <a>Aggiorna/elimina articoli</a>
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link href="/user/update">
                    <a>Aggiorna il tuo profilo</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-8">RIGHT</div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
