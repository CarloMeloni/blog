import Layout from "../components/Layout";
import Link from "next/link";

const index = () => {
  return (
    <Layout>
      <div className="landing-page">
        <h2 className="display-3 text-center">PAGINA PRINCIPALE DEL BLOG</h2>
      </div>
      <img
        style={{ height: "95vh", width: "100%" }}
        src="/static/images/newspaper.jpg"
      />
      <section className="landing-page__cta my-10">
        <div className="landing-page__cta-item">
          <div className="landing-page__cta-item__img">
            <ion-icon name="chatbox-ellipses"></ion-icon>
          </div>
          <div className="landing-page__cta-item__title">MESSAGE</div>
          <div className="landing-page__cta-item__text">
            <p>
              After learning JavaScript, I’ve focalised my self on React library
              for its lightweight and its quality to split the
              single-page-application in multiple components, where logic
              (Javascript) and JSX templates (still JavaScript but in HTML
              lookslike format) live together.
            </p>
          </div>
        </div>
        <div className="landing-page__cta-item">
          <div className="landing-page__cta-item__img">
            <ion-icon name="book"></ion-icon>
          </div>
          <div className="landing-page__cta-item__title">READ</div>
          <div className="landing-page__cta-item__text">
            <p>
              After learning JavaScript, I’ve focalised my self on React library
              for its lightweight and its quality to split the
              single-page-application in multiple components, where logic
              (Javascript) and JSX templates (still JavaScript but in HTML
              lookslike format) live together.
            </p>
          </div>
        </div>
        <div className="landing-page__cta-item">
          <div className="landing-page__cta-item__img">
            <ion-icon name="logo-rss"></ion-icon>
          </div>
          <div className="landing-page__cta-item__title">CONNECT</div>
          <div className="landing-page__cta-item__text">
            <p>
              After learning JavaScript, I’ve focalised my self on React library
              for its lightweight and its quality to split the
              single-page-application in multiple components, where logic
              (Javascript) and JSX templates (still JavaScript but in HTML
              lookslike format) live together.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default index;
