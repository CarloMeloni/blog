import {useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {withRouter} from 'next/router';
import Layout from '../../components/Layout';
import {singleBlog, listRelated} from '../../actions/blog';
import {API, DOMAIN, APP_NAME} from '../../config';
import renderHtml from 'react-render-html';
import moment from 'moment';
import SmallCard from '../../components/blog/SmallCard';

const SingleBlog = ({blog, query}) => {
    const [related, setRelated] = useState([]);

    const loadRelated = () => {
        listRelated({blog}).then((data) => {
            if(data.error) {
                console.log(data.error);
            } else {
                setRelated(data);
            }
        });
    } ;

    useEffect(() => {
        loadRelated();
    }, []);

    const showHead = () => (
        <Head>
            <title>{blog.title} | {APP_NAME}</title>
            <meta name="description" content={blog.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`{blog.title} ${APP_NAME}`} />
            <meta property="og:description" content={blog.mdesc} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:site_name" content={APP_NAME} />
            <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:type" content="image/jpg" />
        </Head>
    );

    const showBlogCategories = (blog) => {
        return blog.categories.map((cat, idx) => (
            <Link key={idx} href={`/categories/${cat.slug}`}>
                <a className="btn btn-outline-danger mr-1 ml-1 mt-3">{cat.name}</a>
            </Link>
        ));
    };

    const showBlogTags = (blog) => {
        return blog.tags.map((tag, idx) => (
            <Link key={idx} href={`/tags/${tag.slug}`}>
                <a className="btn btn-warning mr-1 ml-1 mt-3">{tag.name}</a>
            </Link>
        ));
    };

    const showRelatedBlogs = () => {
        return related.map((blog, idx) => {
            return (
                <div className="col-md-4" key={idx}>
                    <article>
                        <SmallCard blog={blog} />
                    </article>
                </div>
            )
        });
    };

    return (
        <>
            {showHead()}
            <Layout>
                <main>
                    <article>
                        <div className="container-fluid">
                            
                                <section>
                                        <div className="row" style={{marginTop: "-30px"}}>
                                            <img src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} className="img img-fluid" style={{width: "100%", maxHeight: "500px", objectFit: "cover"}} />
                                        </div>
                                </section>
                                <section>
                                    <div className="container">
                                        <h2 className="display-3 pb-3 pt-3 text-center font-weight-bold">{blog.title}</h2>
                                        <p className="lead mt-3 font-weight-bold">
                                            Scritto da {blog.postedBy.name} | Pubblicato il {moment(blog.updatedAt).format('DD-MM-YYYY')} alle {moment(blog.updatedAt).format('HH:mm')}
                                        </p>
                                        <div className="pb-3">
                                            {showBlogCategories(blog)}
                                            {showBlogTags(blog)}
                                            <br />
                                            <br />
                                            </div>
                                    </div>
                                </section>
                            
                        </div>

                        <div className="container">
                            <section>
                                <div className="col-md-12 lead">{renderHtml(blog.body)}</div>
                            </section>
                        </div>

                        <div className="container pb-5">
                            <h4 className="text-center pt-5 pb-5">Articoli correlati</h4>
                            <hr/>
                            <div className="row">
                                {showRelatedBlogs()}
                            </div>
                        </div>

                        <div className="container pb-5">
                            <p>Mostra i commenti</p>
                        </div>
                    </article>
                </main>
            </Layout>
        </>
    )
};

SingleBlog.getInitialProps = ({query}) => {
    return singleBlog(query.slug)
        .then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                return {blog: data, query}
            }
        })
};

export default withRouter(SingleBlog);