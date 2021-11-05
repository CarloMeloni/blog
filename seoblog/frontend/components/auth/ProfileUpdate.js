import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import {getCookie, isAuth} from '../../actions/auth';
import {getProfile, update} from '../../actions/user';

const ProfileUpdate = () => {
    const [values, setValues] = useState({
        username: '',
        name: '',
        email: '',
        password: '',
        about: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        userData: ''
    });

    const token = getCookie('token');
    const {username, name, email, password, about, error, success, loading, photo, userData} = values;

    const init = () => {
        getProfile(token).then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({
                    username: data.username,
                    name: data.name,
                    email: data.email,
                    about: data.about,
                })
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        let userFormData = new FormData()
        userFormData.set(name, value);
        setValues({ ...values, [name]: value, userData: userFormData, error: false, success: false })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setValues({...values, loading: true});
        update(token, userData).then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success: false, loading: false})
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    about: data.about,
                    success: true,
                    error: false,
                    loading: false
                })
            }
        })
    }

    const profileUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="btn btn-outline-danger m-3">Immagine del profilo
                    <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Username</label>
                <input onChange={handleChange('username')} type="text" value={username} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Nome</label>
                <input onChange={handleChange('name')} type="text" value={name} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} type="email" value={email} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">About</label>
                <textarea onChange={handleChange('about')} type="text" value={about} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" value={password} className="form-control" />
            </div>
            <div>
                <button type="submit" className="btn btn-primary">Aggiorna</button>
            </div>
        </form>
    );

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">IMAGE</div>
                    <div className="col-md-8">{profileUpdateForm()}</div>
                </div>
            </div>
        </>
    )
}

export default ProfileUpdate;