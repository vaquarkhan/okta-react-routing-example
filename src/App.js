import React from "react";
import "./App.css";

import { Router, Route } from "wouter";

import { Security, LoginCallback } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";

import Home from "./Pages/Home";
import Profile from "./Pages/Profile";

import "bootstrap/dist/css/bootstrap.min.css";

const issuer = process.env.REACT_APP_OKTA_ISSUER;
const clientId = process.env.REACT_APP_OKTA_CLIENTID;
const redirect = process.env.REACT_APP_OKTA_APP_BASE_URL + "/callback";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.oktaAuth = new OktaAuth({
      issuer: issuer,
      clientId: clientId,
      redirectUri: redirect,
    });

    this.restoreOriginalUri = async (_oktaAuth, originalUri) => {
      window.location.replace(
        toRelativeUrl(originalUri || "/", window.location.origin)
      );
    };
  }

  render() {
    return (
      <Router>
        <Security
          oktaAuth={this.oktaAuth}
          restoreOriginalUri={this.restoreOriginalUri}
        >
          <Route path="/" component={Home} />
          <Route path="/callback" component={LoginCallback} />
          <Route path="/Profile" component={Profile} />
        </Security>
      </Router>
    );
  }
}

export default App;
