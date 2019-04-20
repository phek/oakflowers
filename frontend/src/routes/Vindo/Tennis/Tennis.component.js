import React from "react";
import { connect } from "react-redux";
import Container from "components/Container/Container.component";
import Heading from "components/Heading";
import Text from "components/Text";
import Calendar from "components/Calendar";

const Tennis = ({ authenticated }) => {
  return (
    <>
      <Container withBg>
        <Heading level={1}>Boka tennis</Heading>
        <Text color="text-secondary">
          Intresserad av att spela tennis? Här nedan kan du boka tennisplan.
        </Text>
        <br />
        <br />
        <Calendar />
      </Container>
    </>
  );
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps)(Tennis);
