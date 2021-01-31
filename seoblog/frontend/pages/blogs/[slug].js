import {useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import {singleBlog} from '../../actions/blog';
import {API, DOMAIN, APP_NAME} from '../../config';
import renderHtml from 'react-render-html';
import moment from 'moment';

const SingleBlog = ({blog}) => {
    const showBlogCategories = (blog) => {
        return blog.categories.map((cat, idx) => (
            <Link key={idx} href={`/categories/${cat.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{cat.name}</a>
            </Link>
        ));
    };

    const showBlogTags = (blog) => {
        return blog.tags.map((tag, idx) => (
            <Link key={idx} href={`/tags/${tag.slug}`}>
                <a className="btn btn-outline-warning mr-1 ml-1 mt-3">{tag.name}</a>
            </Link>
        ));
    };

    return (
        <>
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
                                <p className="lead mt-3 mark">
                                    Scritto da {blog.postedBy.name} | Pubblicato il {moment(blog.updatedAt).format('DD-MM-YYYY')} alle {moment(blog.updatedAt).format('HH:mm')}
                                </p>
                                <div className="pb-3">
                                    {showBlogCategories(blog)}
                                    {showBlogTags(blog)}
                                    <br />
                                    <br />
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
                            <p>Mostra gli articoli simili a questo</p>
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
                return {blog: data}
            }
        })
};

export default SingleBlog;