import React from "react";
import { connect } from "react-redux";
import Container from "components/Container/Container.component";
import Wrapper from "components/Wrapper/Wrapper.component";
import ImageHeader from "components/ImageHeader/ImageHeader.component";
import Heading from "components/Heading";
import Text from "components/Text";
import Calendar from "components/Calendar";

const Tennis = ({ user }) => {
  return (
    <>
      <Container withBg>
        <ImageHeader images={['/images/tennis.jpg']} />
        <Wrapper>
          <Heading level={1}>{user ? "Boka tennis" : "Tennis schema"}</Heading>
          {user && (
            <Text color="text-secondary">
              Intresserad av att spela tennis? Här nedan kan du boka tennisplan.
            </Text>
          )}
          <br />
          <br />
          <Calendar />
        </Wrapper>
      </Container>
    </>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Tennis);
