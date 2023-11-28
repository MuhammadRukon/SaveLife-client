import React from "react";
import Container from "../components/shared/Container";
import Banner from "../components/sections/Banner";
import ContactUs from "../components/sections/ContactUs";
import Featured from "../components/sections/Featured";

const Home = () => {
  return (
    <>
      <Banner />
      <Container>
        <Featured />
        <ContactUs />
      </Container>
    </>
  );
};

export default Home;
