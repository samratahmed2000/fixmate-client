import HeroIntroduction from "@/app/components/homepage/about/HeroIntroduction";
import KeyPillars from "../../components/homepage/about/KeyPillars";
import OurServicesDetails from "@/app/components/homepage/about/OurServicesDetails";
import BenefitsToJoinUs from "@/app/components/homepage/about/BenefitsToJoinUs";

const AboutPage = () => {
  return (
    <div className="flex flex-col">
      {/* 1. Hero / Introduction Section */}
      <HeroIntroduction />

      {/* 2. Key Pillars / Keywords as Cards */}
      <KeyPillars />

      {/* 3. Our Services Details (What We Do: Customers vs Technicians) */}
      <OurServicesDetails />

      {/* 4. Benefits To Join With Us */}
      <BenefitsToJoinUs />
    </div>
  );
};

export default AboutPage;
