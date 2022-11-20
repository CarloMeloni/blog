import { useEffect, useState } from "react";
import Link from "next/link";
import renderHtml from "react-render-html";
import { listSearch } from "../../actions/blog";

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: "",
  });

  const { search, results, searched, message } = values;

  const searchSubmit = (e) => {
    e.preventDefault();
    listSearch({ search }).then((data) => {
      setValues({
        ...values,
        results: data,
        searched: true,
        message:
          data.length === 1
            ? `Ho trovato un articolo`
            : `Ho trovato ${data.length} articoli.`,
      });
    });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: [],
    });
  };

  const searchedBlogs = (results = []) => {
    return (
      <div className="jumbotron bg-white">
        {message && <p className="pt-4 text-muted font-italic">{message}</p>}
        {results.map((b, i) => {
          return (
            <div key={i}>
              <Link href={`/blogs/${b.slug}`}>
                <a className="text-primary">~ {b.title}</a>
              </Link>
              <hr />
            </div>
          );
        })}
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <div className="row">
        <div className="col-md-8">
          <input
            type="search"
            className="form-control"
            placeholder="Cerca un articolo"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <button className="btn btn-block btn-outline-primary" type="submit">
            Cerca
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="pt-3 pb-5">{searchForm()}</div>
      {searched && (
        <div style={{ marginTop: "-120px", marginBottom: "-80px" }}>
          {searchedBlogs(results)}
        </div>
      )}
    </div>
  );
};

export default Search;
