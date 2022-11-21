import { useState } from "react";
import Link from "next/link";
import { emailContactForm } from "../../actions/form";

const ContactForm = ({ authorEmail }) => {
  const [values, setValues] = useState({
    message: "",
    name: "",
    email: "",
    sent: false,
    buttonText: "Invio Messaggio",
    success: false,
    error: false,
  });

  const { message, name, email, sent, buttonText, success, error } = values;

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, buttonText: "Invio in corso..." });
    emailContactForm({ name, email, message }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          sent: true,
          name: "",
          email: "",
          message: "",
          buttonText: "Inviato",
          success: data.success,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value,
      error: false,
      success: false,
      buttonText: "Invio messaggio",
    });
  };

  const showSuccessMessage = () =>
    success && (
      <div className="alert alert-info">Grazie per averci contattato</div>
    );

  const showErrorMessage = () => (
    <div
      style={{ display: error ? "block" : "none" }}
      className="alert alert-danger"
    >
      {error}
    </div>
  );

  const contactForm = () => {
    return (
      <form onSubmit={clickSubmit} className="pb-5">
        <div className="form-group">
          <label className="lead">Messaggio</label>
          <textarea
            onChange={handleChange("message")}
            type="text"
            className="form-control"
            value={message}
            required
            rows={10}
          ></textarea>
        </div>
        <div className="form-group">
          <label className="lead">Nome</label>
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            value={name}
            required
          />
        </div>
        <div className="form-group">
          <label className="lead">Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            value={email}
            required
          />
        </div>
        <button className="btn btn-primary">{buttonText}</button>
      </form>
    );
  };

  return (
    <>
      {contactForm()}
      {showErrorMessage()}
      {showSuccessMessage()}
    </>
  );
};

export default ContactForm;
