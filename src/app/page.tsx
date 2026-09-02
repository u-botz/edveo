import styles from "./page.module.css";
import SiteNavbar from "./components/SiteNavbar";
import SiteFooter from "./components/SiteFooter";
import WhatsAppFloat from "./components/WhatsAppFloat";
import CtaBanner from "./components/CtaBanner";
import HeroSection from "./components/HeroSection";
import StatsBand from "./components/home/StatsBand";
import ReplacesMarquee from "./components/home/ReplacesMarquee";
import PricingTeaser from "./components/home/PricingTeaser";
import ComparisonBento from "./components/home/ComparisonBento";
import Testimonials from "./components/home/Testimonials";
import FeatureGrid from "./components/home/FeatureGrid";
import FaqAccordion from "./components/home/FaqAccordion";
import { COMPANY_WHATSAPP_URL } from "@/lib/companyPublicInfo";

/*
  Section rhythm follows webinar.gg: a dark hero that resolves to the page
  ground, then alternating blue-biased washes with uniform 80px vertical
  padding, closing on the CTA and a light footer. Grounds are declared by each
  section via home.module.css so the sequence stays readable here.

    hero      dark → white
    stats     #FFFFFF
    marquee   #FFFFFF
    pricing   #E6F0FE
    compare   #F8FAFF
    quotes    #FFFFFF
    features  #E6F0FF
    faq       #F8FBFF
    cta       #FFFFFF (dark card)
    footer    #F8FBFF
*/

export default function Home() {
  return (
    <main className={styles.main}>
      <SiteNavbar activePage="home" />

      {/* Hero — dark gradient resolving to the page ground */}
      <HeroSection />

      <StatsBand />
      <ReplacesMarquee />
      <PricingTeaser />
      <ComparisonBento />
      <Testimonials />
      <FeatureGrid />
      <FaqAccordion />

      <CtaBanner
        headline="Still managing fees on Excel and attendance in a register?"
        accentSub="Join 5 Kerala coaching institutes already running on Edveo. Free to start. No setup fees. Live in 5 minutes."
        primaryLabel="Get a free demo →"
        secondaryLabel="Talk to an Expert"
        secondaryHref={COMPANY_WHATSAPP_URL}
        trustItems={["Free forever", "No credit card required", "Data stored in India", "Cancel anytime"]}
      />

      <SiteFooter />
      <WhatsAppFloat />
    </main>
  );
}
