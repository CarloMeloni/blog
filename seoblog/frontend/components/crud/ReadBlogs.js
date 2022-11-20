import Link from "next/link";
import { useState, useEffect } from "react";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";
import moment from "moment";

const ReadBlogs = ({ username }) => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");
  const token = getCookie("token");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list(username).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  const deleteBlog = (slug) => {
    removeBlog(slug, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage("L'articolo e' stato rimosso");
        loadBlogs();
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Sei sicuro di voler eliminare l'articolo?");
    if (answer) {
      deleteBlog(slug);
    }
  };

  const showUpdateButton = (slug) => {
    if (isAuth() && isAuth().role === 0) {
      return (
        <Link href={`/user/crud/${slug}`}>
          <a className="ml-2 btn btn-sm btn-warning">Modifica</a>
        </Link>
      );
    } else if (isAuth() && isAuth().role === 1) {
      return (
        <Link href={`/admin/crud/${slug}`}>
          <a className="ml-2 btn btn-sm btn-warning">Modifica</a>
        </Link>
      );
    }
  };

  const showAllBlogs = () => {
    return blogs.map((blog, idx) => (
      <div key={idx} className="mt-5">
        <h3>{blog.title}</h3>
        <p className="mark">
          Scritto da {blog.postedBy.name} | Pubblicato il{" "}
          {moment(blog.updatedAt).format("DD/MM/YYYY")} alle{" "}
          {moment(blog.updatedAt).format("hh:mm:ss")}
        </p>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => deleteConfirm(blog.slug)}
        >
          Elimina
        </button>
        {showUpdateButton(blog.slug)}
      </div>
    ));
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          {message && <div className="alert alert-warning">{message}</div>}
          {showAllBlogs()}
        </div>
      </div>
    </>
  );
};

export default ReadBlogs;
