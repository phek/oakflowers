import React from "react";
import Navbar from "components/Navbar";
import Content from "components/Content/Content.component";
import Container from "components/Container/Container.component";
import Wrapper from "components/Wrapper/Wrapper.component";
import ImageHeader from "components/ImageHeader/ImageHeader.component";
import Heading from "components/Heading";

const images = [
  "/images/nerja/nerja.jpg",
  "/images/nerja/nerja2.jpg",
  "/images/nerja/nerja3.jpg",
  "/images/nerja/nerja4.jpg"
];

const Nerja = () => (
  <>
    <Navbar />
    <Content>
      <Container withBg>
        <ImageHeader images={images} />
        <Wrapper>
          <Heading level={1}>Nerja</Heading>
        </Wrapper>
      </Container>
    </Content>
  </>
);

export default Nerja;
