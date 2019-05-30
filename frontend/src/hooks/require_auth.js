import React, { Component } from "react";
import { connect } from "react-redux";

const LOGIN_PAGE = "/signin";

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!this.props.user) {
        this.props.history.push(LOGIN_PAGE);
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.user) {
        this.props.history.push(LOGIN_PAGE);
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { user: state.auth.user };
  }

  return connect(mapStateToProps)(Authentication);
}
