import fetch from 'isomorphic-fetch';
import cookie, { remove } from 'js-cookie';
import { API } from '../config';
import Router from 'next/router';

export const handleResponse = (response) => {
    if(response.status === 401) {
        signout(() => {
            Router.push({
                pathname: '/signin',
                query: {
                    message: "La sessione e' scaduta, per piacere rifai il login."
                }
            })
        })
    } else {
        return;
    }
}

export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err) )
}

export const signin = (user) => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err) )
}

export const signout = (next) => {
    removeCookie('token');
    removeLocalStorage('user');
    next();

    return fetch(`${API}/signout`, {
        method: 'GET'
    })
    .then(res => {
        console.log('signout success!')
    })
    .catch(err => {
        console.log(err);
    }) 
}

//SET and remove COOKIE
export const setCookie = (key, value) => {
    if(process.browser) {
        cookie.set(key, value, {
            expires: 100
        })
    }
}

export const removeCookie = (key) => {
    if(process.browser) {
        cookie.remove(key, {
            expires: 100
        })
    }
}

//GET COOKIE
export const getCookie = (key) => {
    if(process.browser) {
        return cookie.get(key)
    }
}

//LOCALSTORAGE
export const setLocalStorage = (key, value) => {
    if(process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export const removeLocalStorage = (key) => {
    if(process.browser) {
        localStorage.removeItem(key);
    }
}

//AUTHENTITCATE USER BY PASS DATA TO COOKIE AND LOCALSTORAGE
export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
}

export const isAuth = () => {
    if(process.browser) {
        const cookieChecked = getCookie('token');
        if(cookieChecked) {
            if(localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
}

export const updateUser = (user, next) => {
    if(process.browser) {
        if(localStorage.getItem('user')) {
            let auth = JSON.parse(localStorage.getItem('user'));
            auth = user;
            localStorage.setItem('user', JSON.stringify(auth));
            next();
        }
    }
}