import Hero from "../components/homepage/Hero";
import HowFixMateWorks from "../components/homepage/HowFixMateWorks";
import PopularCategories from "../components/homepage/category/PopularCategories";
import WhyChooseUs from "../components/homepage/WhyChooseUs";
import FeaturedService from "../components/homepage/featured-service/FeaturedService";

const Homepage = () => {
  return (
    <main>
      <Hero />
      <FeaturedService />
      <HowFixMateWorks />
      <WhyChooseUs />
      <PopularCategories />
    </main>
  );
};

export default Homepage;
