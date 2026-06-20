import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative z-10">
        <Hero />
        <div className="relative pb-16 md:pb-28">
          <Marquee angle={10} top="22%" />
          <Marquee angle={-10} reverse top="66%" />
          <Work />
        </div>
        <Marquee inline color angle={0} />
        <About />
        <Footer />
      </main>
    </>
  );
}
