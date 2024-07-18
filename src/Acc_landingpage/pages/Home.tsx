import AboutSection from "../components/sections/About";
import HeroOne from "../components/sections/HeroOne";
import LatestPostsSection from "../components/sections/LatestPosts";
import ServicesSection from "../components/sections/Services";
import TeamSection from "../components/sections/Team";
import PartnersSlider from "../components/sliders/Partners";
import TestimonialSlider from "../components/sliders/Testimonial";

export default function Home() {
  return (
    <div>
      <HeroOne/>
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <TestimonialSlider />
      <PartnersSlider />
      <LatestPostsSection />
    </div>
  )
}
