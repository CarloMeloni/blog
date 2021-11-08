import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string'
import {isAuth} from './auth';

export const createBlog = (blog, token) => {
    let createBlogEndopint;

    if(isAuth() && isAuth().role == 1) {
        createBlogEndopint = `${API}/blog`
    } else if(isAuth() && isAuth().role == 0) {
        createBlogEndopint = `${API}/user/blog`
    }
    
    return fetch(`${createBlogEndopint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err) )
}

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
    const data = {
        limit, skip
    };

    return fetch(`${API}/blogs-categories-tags`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err) )
};

export const singleBlog = slug => {
    return fetch(`${API}/blog/${slug}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
};

export const listRelated = (blog) => {
    return fetch(`${API}/blogs/related`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blog)
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err) )
};

export const list = (username) => {
    let listBlogsEndopint;

    if(username) {
        listBlogsEndopint = `${API}/${username}/blogs`
    } else {
        listBlogsEndopint = `${API}/blogs`
    }

    return fetch(`${listBlogsEndopint}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
};

export const removeBlog = (slug, token) => {
    let deleteBlogEndopint;

    if(isAuth() && isAuth().role == 1) {
        deleteBlogEndopint = `${API}/blog/${slug}`
    } else if(isAuth() && isAuth().role == 0) {
        deleteBlogEndopint = `${API}/user/blog/${slug}`
    }

    return fetch(`${deleteBlogEndopint}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err) )
};

export const updateBlog = (blog, token, slug) => {
    let updateBlogEndopint;

    if(isAuth() && isAuth().role == 1) {
        updateBlogEndopint = `${API}/blog/${slug}`
    } else if(isAuth() && isAuth().role == 0) {
        updateBlogEndopint = `${API}/user/blog/${slug}`
    }
    return fetch(`${updateBlogEndopint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: blog
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err) )
}

export const listSearch = (params) => {
    console.log('params', params)
    let query = queryString.stringify(params);
    console.log('query', query)
    return fetch(`${API}/blogs/search?${query}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
};