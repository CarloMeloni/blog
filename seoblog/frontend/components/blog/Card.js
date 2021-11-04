import {API} from '../../config';
import Link from 'next/link';
import renderHtml from 'react-render-html';
import moment from 'moment';

const Card = ({blog}) => {
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

    return (
        <>
            <div className="lead pb-4">
                <header>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a><h2 className="pt-3 pb-3 font-weight-bold">{blog.title}</h2></a>
                    </Link>
                </header>
                <section>
                    <p className="font-weight-bold pt-2 pb-2">
                        Scritto da <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.username}</a></Link> | Pubblicato il {moment(blog.updatedAt).format('DD-MM-YYYY')} alle {moment(blog.updatedAt).format('HH:mm')}
                    </p>
                </section>
                <section>
                    {showBlogCategories(blog)}
                    {showBlogTags(blog)}
                    <br />
                    <br />
                </section>
                <div className="row">
                    <div className="col-md-4">
                        <section>
                            <img 
                                className="img img-fluid" 
                                style={{maxHeight: "auto", width: "100%"}} 
                                src={`${API}/blog/photo/${blog.slug}`} 
                                alt={blog.title} />
                        </section>
                    </div>
                    <div className="col-md-8">
                        <section>
                            <div style={{backgroundColor: "#fff"}} className="pb-3">{blog.excerpt == undefined ? '' : renderHtml(blog.excerpt)}</div>
                            <Link href={`/blogs/${blog.slug}`}>
                                <a className="btn btn-danger pt-2">Leggi l'articolo</a>
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