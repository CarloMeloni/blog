import Head from 'next/head';
import Link from 'next/link';
import {withRouter} from 'next/router';
import Layout from '../../components/Layout';
import {userPublicProfile} from '../../actions/user';
import {API, DOMAIN, APP_NAME} from '../../config';
import moment from 'moment';

const UserProfile = ({user, blogs, query}) => {
    const showHead = () => (
        <Head>
            <title>{user.username} | {APP_NAME}</title>
            <meta name="description" content={`Articolo di ${user.username}`} />
            <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
            <meta property="og:title" content={`${user.username} | ${APP_NAME}`} />
            <meta property="og:description" content={`Articolo di ${user.username}`} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
            <meta property="og:site_name" content={APP_NAME} />
            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
        </Head>
    );

    const showUserBlogs = () => {
        return blogs.map((blog, idx) => {
            return (
                <div className="px-4" key={idx}>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a className="lead">~ {blog.title}</a>
                    </Link>
                    <hr/>
                </div>
            )
        })
    };

    return (
        <>
            {showHead()}
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div class="row">
                                        <div className="col-md-8">
                                            <h5>{user.name}</h5>
                                            <p className="text-muted">Membro dal {moment(user.createdAt).format('DD/MM/YYYY')}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <img 
                                                src={`${API}/user/photo/${user.username}`}
                                                className="img img-fluid img-thumbnail mb-3"
                                                style={{maxHeight: 'auto', maxWidth: '100%'}}
                                                alt="Profilo utente"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="container pb-5">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title bg-primary p-4 text-light">Ultimi articoli di {user.name}</h5>
                                    <br/>
                                    {showUserBlogs()}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                        <div className="card">
                             <div className="card-body">
                                <h5 className="card-title bg-primary p-4 text-light">Scrivi a {user.name}</h5>
                                <br/>
                                <p>contact form</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
};

UserProfile.getInitialProps = ({query}) => {
    return userPublicProfile(query.username).then(data => {
        if(data.error) {
            console.log(data.error)
        } else {
            return {user: data.user, blogs: data.blogs, query}
        }
    })
};

export default UserProfile;