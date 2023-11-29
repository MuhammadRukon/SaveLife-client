import React, { useEffect } from "react";
import Container from "../components/shared/Container";
import Banner from "../components/sections/Banner";
import ContactUs from "../components/sections/ContactUs";
import Featured from "../components/sections/Featured";
import AOS from "aos";
import "aos/dist/aos.css";
const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: "1500",
      delay: "100",
    });
  }, []);
  return (
    <div className="overflow-hidden">
      <div data-aos="zoom-in">
        <Banner />
      </div>
      <Container>
        <div data-aos="fade-left" data-aos-offset="300">
          <Featured />
        </div>
        <div data-aos="fade-right" data-aos-offset="400">
          <ContactUs />
        </div>
      </Container>
    </div>
  );
};

export default Home;
