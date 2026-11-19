import Hero from "../components/homepage/Hero";
import HowFixMateWorks from "../components/homepage/HowFixMateWorks";
import PopularCategories from "../components/homepage/category/PopularCategories";
import WhyChooseUs from "../components/homepage/WhyChooseUs";

const Homepage = () => {
  return (
    <main>
      <Hero />
      <HowFixMateWorks />
      <WhyChooseUs />
      <PopularCategories />
    </main>
  );
};

export default Homepage;
