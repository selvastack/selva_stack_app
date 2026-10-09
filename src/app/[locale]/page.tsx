import { setRequestLocale } from "next-intl/server";

import { Allies } from "@/components/sections/Allies";
import { Business } from "@/components/sections/Business";
import { Contact } from "@/components/sections/Contact";
import { EcoAlerta } from "@/components/sections/EcoAlerta";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Join } from "@/components/sections/Join";
import { Model } from "@/components/sections/Model";
import { Navbar } from "@/components/sections/Navbar";
import { Products } from "@/components/sections/Products";
import { Programs } from "@/components/sections/Programs";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { Support } from "@/components/sections/Support";
import { Testimonials } from "@/components/sections/Testimonials";
import { Transparency } from "@/components/sections/Transparency";
import { Why } from "@/components/sections/Why";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { RiverScroll } from "@/components/ui/RiverScroll";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <RiverScroll />
      <main>
        <Hero />
        <Stats />
        <Why />
        <Model />
        <Services />
        <EcoAlerta />
        <Products />
        <Programs />
        <Business />
        <Support />
        <Join />
        <Testimonials />
        <Allies />
        <Transparency />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
