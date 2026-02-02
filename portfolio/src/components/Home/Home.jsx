import { Link } from "react-router-dom";

import { about } from "../../data/about";
import headshot from "../../assets/headshot.jpg";
import Name from "./Name/Name";
import "./Home.scss";

export default function Home() {
  return (
    <>
      <section className="hero">
        <Name />
      </section>
      <p className="short-bio">{about.shortBio}</p>
      <section className="btn-container">
        <Link className="btn" to="/projects">
          View Projects
        </Link>
        <Link className="btn" to="/about">
          About Me
        </Link>
        <Link className="btn" to="/">
          Download Resume
        </Link>
        <Link className="btn" to="/connect">
          Contact
        </Link>
      </section>
    </>
  );
}
