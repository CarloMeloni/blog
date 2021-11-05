import {API} from '../../config';
import Link from 'next/link';
import renderHtml from 'react-render-html';
import moment from 'moment';

const SmallCard = ({blog}) => {

    return (
            <div className="card" style={{ border: "3px solid #ccc", borderRadius: "30px", maxHeight: "40rem"}}>
                <section>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a>
                        <img 
                            className="img img-fluid" 
                            style={{maxHeight: "auto", width: "100%"}} 
                            src={`${API}/blog/photo/${blog.slug}`} 
                            alt={blog.title} />
                        </a>
                    </Link>
                </section>

                <div className="card-body">
                    <section>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a>
                                <h5 className="card-title">
                                    {blog.title.substr(0, 30)} ...
                                </h5>
                            </a>
                        </Link>
                        <p className="card-text">{renderHtml(blog.excerpt.substr(0, 150))}...</p>
                    </section>
                </div>

                <div className="card-body">
                    Scritto il {moment(blog.updatedAt).format('DD-MM-YYYY')} da{' '}
                    <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.username}</a></Link>
                </div>

            </div>
    )
}

export default SmallCard;