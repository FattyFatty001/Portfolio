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

        {/* Work section with angled backdrop marquees */}
        <div className="relative pb-16 md:pb-28">
          <Marquee angle={10} top="22%" reverse tint={c1} />
          <Marquee angle={-10} top="52%" tint={c2} />
          <Marquee angle={10} top="82%" reverse tint={c3} />
          <Work />
        </div>

        {/* Game cover marquee — OLIPOP-style color-blocked band */}
        <Marquee inline color angle={0} size="smplus" saturate={0.15} reverse />

        {/* About section */}
        <About />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
