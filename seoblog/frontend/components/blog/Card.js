import {API} from '../../config';
import Link from 'next/link';
import renderHtml from 'react-render-html';
import moment from 'moment';

const Card = ({blog}) => {
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
            <div className="lead pb-4">
                <header>
                    <Link href={`/blog/${blog.slug}`}>
                        <a><h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2></a>
                    </Link>
                </header>
                <section>
                    <p className="mark pt-2 pb-2">
                        Scritto da {blog.postedBy.name} | Pubblicato il {moment(blog.updatedAt).format('DD-MM-YYYY')}
                    </p>
                </section>
                <section>
                    {showBlogCategories(blog)}
                    {showBlogTags(blog)}
                    <br />
                    <br />
                </section>
                <div className="row">
                    <div className="col-md-4">image</div>
                    <div className="col-md-8">
                        <section>
                            <div className="pb-3">{blog.excerpt == undefined ? '' : renderHtml(blog.excerpt)}</div>
                            <Link href={`/blog/${blog.slug}`}>
                                <a className="btn btn-primary pt-2">Leggi l'articolo</a>
                            </Link>
                        </section>
                    </div>
                </div>
            </div>
            <hr/>
        </>
    )
}

export default Card;