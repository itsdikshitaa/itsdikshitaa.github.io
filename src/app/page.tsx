import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Learning from "@/components/Learning";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import NetworkBackground from "@/components/NetworkBackground";

export default function Home() {
  return (
    <>
      <NetworkBackground />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Learning />
        <Resume />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
