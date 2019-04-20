import React from "react";
import { connect } from "react-redux";
import Container from "components/Container/Container.component";
import Content from "components/Content/Content.component";
import Heading from "components/Heading";
import Text from "components/Text";
import Navbar from "components/Navbar/Navbar.component";
import styles from "./Home.module.scss";

const Home = ({ authenticated }) => {
  return (
    <>
      <Navbar />
      <div className={styles.imgWrapper}>
        <Content>
          <Container>
            <div className={styles.box}>
              <Heading level={1}>Hemsida under konstruktion</Heading>
              <Text color="text-secondary">
                Sidan är under uppbyggnad och därmed kan du mötas av bland annat
                toma sidor och oklar funktionalitet.
              </Text>
            </div>
          </Container>
        </Content>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps)(Home);
