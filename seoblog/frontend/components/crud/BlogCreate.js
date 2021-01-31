import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { createBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});
import '../../node_modules/react-quill/dist/quill.snow.css';

const BlogCreate = ({ router }) => {
    const blogFromLs = () => {
        if(typeof window === 'undefined') {
            return false;
        }

        if(localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'));
        } else {
            return false;
        }
    };

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [checkedTags, setCheckedTags] = useState([]);
    const [body, setBody] = useState(blogFromLs());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false
    });

    const { error, sizeError, success, formData, title, hidePublishButton } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData(),  });
        initCategories();
        initTags();
    }, [router]);

    const initCategories = () => {
        getCategories()
            .then(data => {
                if(data.err) {
                    setValues({ ...values, error: data.err })
                } else {
                    setCategories(data);
                }
            })
    }

    const initTags = () => {
        getTags()
            .then(data => {
                if(data.err) {
                    setValues({ ...values, error: data.err });
                } else {
                    setTags(data);
                }
            })
    }
    
    const publishBlog = (e) => {
        e.preventDefault();
        //console.log('ready to publish blog!')
        createBlog(formData, token)
            .then(data => {
                if(data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({ ...values, title: '', error: '', success: `l'articolo "${data.title}" e' stato creato.` });
                    setBody('');
                    setCategories([]);
                    setTags([]);
                }
            })
    };

    const handleChange = name => e => {
        //console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' })
    }

    const handleBody = e => {
        //console.log(e);
        setBody(e);
        formData.set('body', e);
        if(typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e));
        }
    }

    const handleToggle = (cat) => () => {
        setValues({ ...values, error: '' });
        const clickedCategory = checkedCategories.indexOf(cat);
        const all = [...checkedCategories];
        if(clickedCategory === -1) {
            all.push(cat);
        } else {
            all.splice(clickedCategory, 1);
        }

        console.log(all);
        setCheckedCategories(all);
        formData.set('categories', all);
    }

    const handleToggleTag = (tag) => () => {
        setValues({ ...values, error: '' });
        const clickedTag = checkedTags.indexOf(tag);
        const all = [...checkedTags];
        if(clickedTag === -1) {
            all.push(tag);
        } else {
            all.splice(clickedTag, 1);
        }

        console.log(all);
        setCheckedTags(all);
        formData.set('tags', all);
    }

    const showCategories = () => {
        return (
            categories && categories.map((cat, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(cat._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{cat.name}</label>
                </li>
            ))
        )
    };

    const showTags = () => {
        return (
            tags && tags.map((tag, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggleTag(tag._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{tag.name}</label>
                </li>
            ))
        )
    };

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{display: success ? '' : 'none'}}>{success}</div>
    );

    const createBlogForm = () => {
        return (
            <form onSubmit={publishBlog}>
                <div className="form-group">
                    <label className="text-muted">Titolo</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                </div>

                <div className="form-group">
                    <ReactQuill 
                        modules={CreateBlog.modules} 
                        formats={CreateBlog.formats} 
                        value={body} 
                        placeholder="Scrivi qualcosa..." 
                        onChange={handleBody} />
                </div>

                <div>
                    <button className="btn btn-primary">Pubblica</button>
                </div>
            </form>
        )
        
    }

    return (
        <div className="container-fluid pb-5">
            <div className="row">
                <div className="col-8">
                    {createBlogForm()}
                    <div className="pt-3">
                        {showError()}
                        {showSuccess()}
                    </div>
                </div>
                <div className="col-4">
                    <div>
                        <div className="form-group pb-2">
                            <h5>Photo</h5>
                            <hr/>
                            <small className="text-muted">Dimensioni max: 1mb</small>
                            <label className="btn btn-outline-info m-3">Carica Immagine
                                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                            </label>
                        </div>
                    </div>
                    <div>
                        <h5>Categorie</h5>
                        <hr/>
                        <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>{showCategories()}</ul>
                    </div>
                    <div>
                        <h5>Tag</h5>
                        <hr/>
                        <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>{showTags()}</ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
let CreateBlog = {};
CreateBlog.modules = {
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
 
CreateBlog.formats = [
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

export default withRouter(BlogCreate);