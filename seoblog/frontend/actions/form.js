import fetch from "isomorphic-fetch";
import { API } from "../config";

export const emailContactForm = (data) => {
  let emailEndPoint;

  if (data.authorEmail) {
    emailEndPoint = `${API}/contact-blog-author`;
  } else {
    emailEndPoint = `${API}/user/blog`;
  }

  return fetch(`${emailEndPoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": `application/json`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      handleResponse(res);
      return res.json();
    })
    .catch((err) => console.log(err));
};
