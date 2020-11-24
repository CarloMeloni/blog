import React, {useState} from 'react';

const SignupComponent = () => {
    const [values, setValues] = useState({
        name: 'carlo',
        email: 'carlo@example.it',
        password: '12345678',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const {
        name,
        email,
        password,
        error,
        loading,
        message,
        showForm
    } = values;

    const handleChange = name => (e) => {
        setValues({ ...values, error: false, [name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.table({
            name,
            email,
            password,
            error,
            loading,
            message,
            showForm
        })
    }

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input value={name} onChange={handleChange('name')} type="text" className="form-group" placeholder="Il tuo nome" />
                </div>
                <div className="form-group">
                    <input value={email} onChange={handleChange('email')} type="email" className="form-group" placeholder="La tua email" />
                </div>
                <div className="form-group">
                    <input value={password} onChange={handleChange('password')} type="password" className="form-group" placeholder="Inserisci la password" />
                </div>
                <div>
                    <button className="btn btn-primary">Registrati</button>
                </div>
            </form>
        )
    }

    return (
        <React.Fragment>
            {signupForm()}
        </React.Fragment>
        
    )
}

export default SignupComponent;