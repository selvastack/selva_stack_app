import { ContactForm } from "@/components/ContactForm";
import { CorporateAllies } from "@/components/CorporateAllies";
import { DonationProvider } from "@/components/DonationProvider";
import { DonationSection } from "@/components/DonationSection";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ImpactSection } from "@/components/ImpactSection";
import { ProblemSection } from "@/components/ProblemSection";
import { Programs } from "@/components/Programs";
import { Projects } from "@/components/Projects";
import { Testimonials } from "@/components/Testimonials";
import { Transparency } from "@/components/Transparency";
import { WhatWeDo } from "@/components/WhatWeDo";
import { landingContentRepository } from "@/lib/repositories";

export default async function Home() {
  const content = await landingContentRepository.getLandingContent();

  return (
    <DonationProvider donation={content.donation}>
      <Header navigation={content.navigation} site={content.site} />
      <main>
        <Hero hero={content.hero} site={content.site} />
        <ProblemSection content={content.problems} />
        <WhatWeDo content={content.whatWeDo} />
        <Programs content={content.programs} />
        <ImpactSection content={content.impact} donation={content.donation} />
        <DonationSection contactChannels={content.contactChannels} donation={content.donation} />
        <CorporateAllies contactChannels={content.contactChannels} content={content.corporate} />
        <Transparency content={content.transparency} />
        <Projects content={content.projects} />
        <Testimonials content={content.testimonials} />
        <FAQ content={content.faqs} />
        <ContactForm contactChannels={content.contactChannels} content={content.contact} />
      </main>
      <Footer navigation={content.navigation} site={content.site} />
    </DonationProvider>
  );
}
