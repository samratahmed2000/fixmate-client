import Hero from "../components/homepage/Hero";
import HowFixMateWorks from "../components/homepage/HowFixMateWorks";
import PopularCategories from "../components/homepage/category/PopularCategories";
import WhyChooseUs from "../components/homepage/WhyChooseUs";
import FeaturedService from "../components/homepage/featured-service/FeaturedService";
import CustomerHomepageSection from "../components/homepage/CustomerHomepageSection";
import HideForAdminAndTechnician from "../components/homepage/HideForAdminAndTechnician";

const Homepage = () => {
  return (
    <main>
      <Hero />
      <HideForAdminAndTechnician>
        <FeaturedService />
      </HideForAdminAndTechnician>
      <HowFixMateWorks />
      <WhyChooseUs />
      <CustomerHomepageSection>
        <PopularCategories />
      </CustomerHomepageSection>
    </main>
  );
};

export default Homepage;
