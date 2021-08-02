import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { getTags } from '../../actions/tag';
import { singleBlog, updateBlog } from '../../actions/blog';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../node_modules/react-quill/dist/quill.snow.css';
import {API} from '../../config';

const BlogUpdate = ({ router }) => {
    const [body, setBody] = useState('');

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [checkedTags, setCheckedTags] = useState([]);

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

    const token = getCookie('token');


    useEffect(() => {
        setValues({ ...values, formData: new FormData(), });
        initBlog();
        initCategories();
        initTags();
    }, [router]);

    const initBlog = () => {
        if (router.query.slug) {
            singleBlog(router.query.slug)
                .then(data => {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        console.log('data', data)
                        setValues({ ...values, title: data.title });
                        setBody(data.body)
                        setCategoriesArray(data.categories)
                        setTagsArray(data.tags)
                    }
                });
        }
    };

    const setCategoriesArray = (blogCategories) => {
        let cArr = [];
        blogCategories.map((cat, i) => {
            cArr.push(cat._id)
        })
        console.log('cArr', cArr)

        setCheckedCategories(cArr);
        console.log('checkedCategories', checkedCategories)
    }

    const setTagsArray = (blogTags) => {
        let tArr = [];
        blogTags.map((tag, i) => {
            tArr.push(tag._id)
        })
        console.log('tArr', tArr)

        setCheckedTags(tArr);
        console.log('checkedTags', checkedTags)
    }

    const initCategories = () => {
        getCategories()
            .then(data => {
                if (data.err) {
                    setValues({ ...values, error: data.err })
                } else {
                    setCategories(data);
                }
            })
    }

    const initTags = () => {
        getTags()
            .then(data => {
                if (data.err) {
                    setValues({ ...values, error: data.err });
                } else {
                    setTags(data);
                }
            })
    }

    const handleToggle = (cat) => () => {
        setValues({ ...values, error: '' });
        const clickedCategory = checkedCategories.indexOf(cat);
        const all = [...checkedCategories];
        if (clickedCategory === -1) {
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
        if (clickedTag === -1) {
            all.push(tag);
        } else {
            all.splice(clickedTag, 1);
        }

        console.log(all);
        setCheckedTags(all);
        formData.set('tags', all);
    }

    const findOutCategory = (cat) => {
        const result = checkedCategories.indexOf(cat._id);
        console.log('result', result)
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    }

    const findOutTag = (tag) => {
        const result = checkedTags.indexOf(tag._id);
        console.log('result', result)
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    }

    const showCategories = () => {
        return (
            categories && categories.map((cat, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(cat._id)} checked={findOutCategory(cat)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{cat.name}</label>
                </li>
            ))
        )
    };

    const showTags = () => {
        return (
            tags && tags.map((tag, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggleTag(tag._id)} checked={findOutTag(tag)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{tag.name}</label>
                </li>
            ))
        )
    };

    const handleBody = e => {
        setBody(e);
        formData.set('body', e);
    };

    const editBlog = (e) => {
        e.preventDefault();
        updateBlog(formData, token, router.query.slug).then(data => {
            if(data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, title: '', success: `L'articolo titolato "${data.title}" e' stato aggiornato con successo!` })
                if(isAuth() && isAuth().role === 1) {
                    Router.replace(`/admin`)
                } else if(isAuth() && isAuth().role === 0) {
                    Router.replace(`/user`)
                }
            }
        })
    };

    const handleChange = name => e => {
        //console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' })
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{display: success ? '' : 'none'}}>
            {success}
        </div>
    );

    const updateBlogForm = () => {
        return (
            <form onSubmit={editBlog}>
                <div className="form-group">
                    <label className="text-muted">Titolo</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                </div>

                <div className="form-group">
                    <ReactQuill
                        style={{ backgroundColor: "#fff" }}
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
                    {updateBlogForm()}
                    <div className="pt-3">
                        {showSuccess()}
                        {showError()}
                    </div>
                    {body && (<img src={`${API}/blog/photo/${router.query.slug}`} alt={title} style={{width: '100%'}}/>)}
                </div>
                <div className="col-md-4">
                    <div>
                        <div className="form-group pb-2">
                            <h5>Immagine Articolo</h5>
                            <hr />
                            <small className="text-muted">Dimensioni max: 1mb</small>
                            <label className="btn btn-outline-danger m-3">Carica Immagine
                                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                            </label>
                        </div>
                    </div>
                    <div>
                        <h5>Categorie</h5>
                        <hr />
                        <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>{showCategories()}</ul>
                    </div>
                    <div>
                        <h5>Tag</h5>
                        <hr />
                        <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>{showTags()}</ul>
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