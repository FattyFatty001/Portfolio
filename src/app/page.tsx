import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { projects } from "@/lib/projects";

// Pick a few tile colors for the angled backdrop marquees.
const [c1, c2, c3] = projects.map((p) => p.color);

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative z-10">
        <Hero />
        <div className="relative pb-16 md:pb-28">
          <Marquee angle={10} top="22%" reverse tint={c1} />
          <Marquee angle={-10} top="52%" tint={c2} />
          <Marquee angle={10} top="82%" reverse tint={c3} />
          <Work />
        </div>
        <Marquee inline color angle={0} size="smplus" saturate={0} reverse />
        <About />
        <Footer />
      </main>
    </>
  );
}
