import React from "react";
import Content from "components/Content/Content.component";
import Container from "components/Container/Container.component";
import Wrapper from "components/Wrapper/Wrapper.component";
import Heading from "components/Heading";
import Text from "components/Text";
import Navbar from "components/Navbar/Navbar.component";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className={styles.imgWrapper}>
        <Content>
          <Container>
            <Wrapper>
              <div className={styles.box}>
                <Wrapper>
                  <Heading level={1}>Hemsida under konstruktion</Heading>
                  <Text color="text-secondary">
                    Sidan är under uppbyggnad och därmed kan du mötas av bland
                    annat toma sidor och oklar funktionalitet.
                  </Text>
                </Wrapper>
              </div>
            </Wrapper>
          </Container>
        </Content>
      </div>
    </>
  );
};

export default Home;
