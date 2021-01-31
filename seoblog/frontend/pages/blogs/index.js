import {useState} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import {listBlogsWithCategoriesAndTags} from '../../actions/blog';
import Card from '../../components/blog/Card';


const Blogs = ({blogs, categories, tags, size}) => {

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
    
    return (
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
                    <div className="row">
                        <div className="col-md-12">
                            {showAllBlogs()}
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
};

Blogs.getInitialProps = () => {
    return listBlogsWithCategoriesAndTags().then(data => {
        if(data.error) {
            console.log(data.error);
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                size: data.size
            };
        }
    });
}

export default Blogs;
