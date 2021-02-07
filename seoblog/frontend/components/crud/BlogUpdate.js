import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { singleBlog, updateBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});
import '../../node_modules/react-quill/dist/quill.snow.css';

const BlogUpdate = ({router}) => {
    const [body, setBody] = useState('');
    const [values, setValues] = useState({
        error: '',
        success: '',
        formData: '',
        title: '',
    });

    const {
        title,
        error,
        success,
        formData,
    } = values;


    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initBlog();
    }, [router]);

    const initBlog = () => {
        if(router.query.slug) {
            singleBlog(router.query.slug)
                .then(data => {
                    if(data.error) {
                        console.log(data.error);
                    } else {
                        setValues({ ...values, title: data.title});
                        setBody(data.body)
                    }
                });
        }
    };

    const handleBody = e => {
        setBody(e);
        formData.set('body', e);
    };

    const editBlog = () => {
        console.log('Updated blog!!')
    };

    const handleChange = name => e => {
        //console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' })
    }

    const updateBlogForm = () => {
        return (
            <form onSubmit={editBlog}>
                <div className="form-group">
                    <label className="text-muted">Titolo</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                </div>

                <div className="form-group">
                    <ReactQuill 
                        style={{backgroundColor: "#fff"}}
                        modules={updateBlogg.modules} 
                        formats={updateBlogg.formats} 
                        value={body} 
                        placeholder="Scrivi qualcosa..." 
                        onChange={handleBody} />
                </div>

                <div>
                    <button className="btn btn-danger">Aggiorna</button>
                </div>
            </form>
        )
    }

    return (
        <div className="container-fluid pb-5">
            <div className="row">
                <div className="col-8">
                    <div className="pt-3">
                        {updateBlogForm()}
                    </div>
                </div>
                <div className="col-4">
                    <div>
                        <div className="form-group pb-2">
                        <h5>Immagine Articolo</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

let updateBlogg = {};
updateBlogg.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
};
 
updateBlogg.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
];

export default withRouter(BlogUpdate);