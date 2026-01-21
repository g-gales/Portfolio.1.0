import { Link } from "react-router-dom";

import { about } from "../../data/about";
import headshot from "../../assets/headshot.jpg";
import "./Home.scss";

export default function Home() {
  return (
    <>
      <section className="home-head">
        <img className="headshot" src={headshot} alt="Headshot photo"></img>
        <h1>{about.name}</h1>
      </section>
      <section>
        <p>{about.shortBio}</p>
      </section>
      <section>
        <Link to="/projects">View Projects</Link>
        <Link to="/about">About Me</Link>
        <Link to="/">Download Resume</Link>
        <Link to="/connect">Contact</Link>
      </section>
    </>
  );
}
