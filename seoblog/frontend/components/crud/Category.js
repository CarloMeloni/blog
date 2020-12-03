import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isAuth, getCookie } from '../../actions/auth';
import {create} from '../../actions/category';

const Category = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false
    });

    const {
        name,
        error,
        success,
        categories,
        removed
    } = values;

    const token = getCookie('token');

    const clickSubmit = (e) => {
        e.preventDefault();
        //console.log('create!', name);
        create({name: name}, token)
            .then(data => {
                if(data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({ ...values, error: false, success: true, name: '' })
                }
            })
    }

    const handleChange = (e) => {
        setValues({ ...values, name: e.target.value, error: false, success: false, removed: '' })
    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Nome Categoria</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} required />
            </div>
            <div>
                <button type="submit" className="btn btn-primary">Crea</button>
            </div>
        </form>
    )

    return (
        <Fragment>
            {newCategoryForm()}
        </Fragment>
    )
}

export default Category;