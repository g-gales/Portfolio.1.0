import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import "./App.scss";

function Projects() {
  return <h1>Projects</h1>;
}

function About() {
  return <h1>About</h1>;
}

function Connect() {
  return <h1>Connect</h1>;
}

function App() {
  return (
    <main className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </main>
  );
}

export default App;
