import CursorGlow from "./components/CursorGlow";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Guestbook from "./components/Guestbook";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative isolate min-h-screen bg-bg text-ink">
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Guestbook />
      </main>
      <Footer />
    </div>
  );
}
