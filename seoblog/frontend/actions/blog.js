import fetch from "isomorphic-fetch";
import { API } from "../config";
import queryString from "query-string";
import { isAuth, handleResponse } from "./auth";

export const createBlog = (blog, token) => {
  let createBlogEndpoint;

  if (isAuth() && isAuth().role == 1) {
    createBlogEndpoint = `${API}/blog`;
  } else if (isAuth() && isAuth().role == 0) {
    createBlogEndpoint = `${API}/user/blog`;
  }

  return fetch(`${createBlogEndpoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((res) => {
      handleResponse(res);
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
  const data = {
    limit,
    skip,
  };

  return fetch(`${API}/blogs-categories-tags`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const singleBlog = (slug) => {
  return fetch(`${API}/blog/${slug}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const listRelated = (blog) => {
  return fetch(`${API}/blogs/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const list = (username) => {
  let listBlogsEndpoint;

  if (username) {
    listBlogsEndpoint = `${API}/${username}/blogs`;
  } else {
    listBlogsEndpoint = `${API}/blogs`;
  }

  return fetch(`${listBlogsEndpoint}`, {
    method: "GET",
  })
    .then((response) => {
      handleResponse(res);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeBlog = (slug, token) => {
  let deleteBlogEndpoint;

  if (isAuth() && isAuth().role == 1) {
    deleteBlogEndpoint = `${API}/blog/${slug}`;
  } else if (isAuth() && isAuth().role == 0) {
    deleteBlogEndpoint = `${API}/user/blog/${slug}`;
  }

  return fetch(`${deleteBlogEndpoint}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      handleResponse(res);
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const updateBlog = (blog, token, slug) => {
  let updateBlogEndopint;

  if (isAuth() && isAuth().role == 1) {
    updateBlogEndopint = `${API}/blog/${slug}`;
  } else if (isAuth() && isAuth().role == 0) {
    updateBlogEndopint = `${API}/user/blog/${slug}`;
  }
  return fetch(`${updateBlogEndopint}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: blog,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const listSearch = (params) => {
  console.log("params", params);
  let query = queryString.stringify(params);
  console.log("query", query);
  return fetch(`${API}/blogs/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
