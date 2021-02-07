import {useState, useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {withRouter} from 'next/router';
import Layout from '../../components/Layout';
import {listBlogsWithCategoriesAndTags} from '../../actions/blog';
import Card from '../../components/blog/Card';
import {API, DOMAIN, APP_NAME} from '../../config';


const Blogs = ({blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router}) => {
    const showHead = () => (
        <Head>
            <title>THE BLOG | {APP_NAME}</title>
            <meta name="description" content="Blog contenuti tecnologia satira costume arte italian" />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Questo blog puo' contenere tecnologia, satira, costume, coloranti e conservanti | ${APP_NAME}`} />
            <meta property="og:description" content="Blog contenuti tecnologia satira costume arte italian" />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={APP_NAME} />
            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
        </Head>
    );

    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);

    useEffect(() => {
        //getInitialProps();
    }, []);

    const loadMore = () => {
        let toSkip = skip + limit;
        listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLoadedBlogs([...loadedBlogs, ...data.blogs]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
                    Altri articoli
                </button>
            )
        );
    };

    const showAllBlogs = () => {
        return blogs.map((blog, idx) => {
             return (
                <article key={idx}>
                    <Card blog={blog} />
                </article>
            )
        });
    }

    const showAllCategories = () => {
        return categories.map((cat, idx) => {
            return (
                <Link key={idx} href={`categories/${cat.slug}`}>
                    <a className="btn btn-primary mr-1 ml-1 mt-3">{cat.name}</a>
                </Link>
            )
        });
    };

    const showAllTags = () => {
        return tags.map((tag, idx) => {
            return (
                <Link key={idx} href={`tags/${tag.slug}`}>
                    <a className="btn btn-warning mr-1 ml-1 mt-3">{tag.name}</a>
                </Link>
            )
        });
    };

    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, idx) => {
            return (
               <article key={idx}>
                   <Card blog={blog} />
               </article>
           )
       });
    }
    
    return (
        <>
        {showHead()}
        <Layout>
            <main>
                <div className="container-fluid">
                    <header>
                        <div className="col-md-12 pt-3">
                            <h1 className="display-4 font-weight-bold text-center">Articoli</h1>
                        </div>
                        <section>
                            <div className="pb-5 text-center">
                                {showAllCategories()}
                                <br/>
                                {showAllTags()}
                            </div>
                        </section>
                    </header>
                </div>
                <div className="container-fluid">
                    {showAllBlogs()}
                </div>
                <div className="container-fluid">
                    {showLoadedBlogs()}
                </div>
                <div className="text-center pt-5 pb-5">
                    {loadMoreButton()}
                </div>
            </main>
        </Layout>
        </>
    )
};

Blogs.getInitialProps = () => {
    let skip = 0;
    let limit = 10;
    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        if(data.error) {
            console.log(data.error);
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip
            };
        }
    });
}

export default withRouter(Blogs);
