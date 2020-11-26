import React, {useState, useEffect} from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
import Router from 'next/router'; 

const SigninComponent = () => {
    const [values, setValues] = useState({
        email: 'carlo@example.it',
        password: '12345678',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const {
        email,
        password,
        error,
        loading,
        message,
        showForm
    } = values;

    useEffect(() => {
        isAuth() && Router.push(`/`)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false });
        const user = { email, password};

        signin(user)
            .then(data => {
                if(data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    //SAVE USER TOKEN TO COOKIE
                    //SAVE USER INFO TO LOCALSTORAGE
                    //AUTHENTICATE USER
                    authenticate(data, () => {
                        Router.push('/');
                    })
                }
            }) 
    }
    
    const handleChange = name => (e) => {
        setValues({ ...values, error: false, [name]: e.target.value });
    }

    const showLoading = () => (loading ? <div className="alert alert-info">Caricamento</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder="La tua email" />
                </div>
                <div className="form-group">
                    <input value={password} onChange={handleChange('password')} type="password" className="form-control" placeholder="Inserisci la password" />
                </div>
                <div>
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
        )
    }

    return (
        <React.Fragment>
            {showError()}
            {showMessage()}
            {showLoading()}
            {showForm && signinForm()}
        </React.Fragment>
        
    )
}

export default SigninComponent;