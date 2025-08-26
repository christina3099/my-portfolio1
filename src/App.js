import React, { useEffect, useRef, useState } from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";

function Navbar() {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(window.scrollY);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setAtTop(y < 8);
          const goingDown = y > lastY.current + 5;
          const goingUp   = y < lastY.current - 5;
          if (goingDown) setVisible(false);
          if (goingUp) setVisible(true);
          lastY.current = y;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${visible ? "" : "nav--hidden"} ${atTop ? "" : "nav--shadow"}`}>
      <div className="container nav__inner">
        <div className="brand">My Portfolio</div>
        <nav className="links">
          <NavLink end to="/" className="nav__link">Home</NavLink>
          <NavLink to="/projects" className="nav__link">Projects</NavLink>
          <NavLink to="/about" className="nav__link">About</NavLink>
          <NavLink to="/resume" className="nav__link">Resume</NavLink>
          <a className="nav__link" href="https://github.com/YOUR_GITHUB" target="_blank" rel="noreferrer">GitHub</a>
          <a className="nav__link" href="https://linkedin.com/in/YOUR_LINKEDIN" target="_blank" rel="noreferrer">LinkedIn</a>
        </nav>
      </div>
    </header>
  );
}

function HomePage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1">Hey, I’m Your Name 👋</h1>
        <p className="lead">
          I build data-driven products and delightful interfaces. Here’s a small selection
          of my work and writing.
        </p>
      </div>
    </section>
  );
}

function ProjectsPage() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="h2">Projects</h2>
        <div className="grid">
          <article className="card">
            <h3 className="h3">Project One</h3>
            <p>Short description of what it does and the impact.</p>
            <div className="row">
              <a className="btn" href="https://github.com/YOUR_GITHUB/your-project" target="_blank" rel="noreferrer">Code</a>
              <a className="btn btn--ghost" href="#" target="_blank" rel="noreferrer">Live</a>
            </div>
          </article>
          <article className="card">
            <h3 className="h3">Project Two</h3>
            <p>Another project highlight. Replace with your content.</p>
            <div className="row">
              <a className="btn" href="#" target="_blank" rel="noreferrer">Code</a>
              <a className="btn btn--ghost" href="#" target="_blank" rel="noreferrer">Live</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="h2">About</h2>
        <p>
          I’m a (your role) focused on (your interests). I enjoy solving real-world problems
          with ML + full-stack engineering and writing about what I learn.
        </p>
      </div>
    </section>
  );
}

function ResumePage() {
  const resumeUrl = `${process.env.PUBLIC_URL}/resume.pdf`; // works on GitHub Pages
  return (
    <section className="section">
      <div className="container">
        <h2 className="h2">Resume</h2>
        <div className="resume-frame">
          <iframe title="Resume" src={resumeUrl} />
        </div>
        <a className="btn" href={resumeUrl} download>
          Download Resume
        </a>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} Your Name</div>
      </footer>
    </HashRouter>
  );
}
