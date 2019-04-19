import React from "react";
import { connect } from "react-redux";
import styles from "./Home.module.scss";
import Container from "components/Container/Container.component";
import Content from "components/Content/Content.component";

const Home = ({ authenticated }) => {
  return (
    <div className={styles.imgWrapper}>
      <Content>
        <Container>
          <div className={styles.box}>
            <h1>Test heading</h1>
            <p>Test description to the heading</p>
            <div>{authenticated ? "Inloggad" : "Ej inloggad"}</div>
          </div>
        </Container>
      </Content>
    </div>
  );
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps)(Home);
