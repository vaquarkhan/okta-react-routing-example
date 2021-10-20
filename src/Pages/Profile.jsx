import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

import { useOktaAuth } from "@okta/okta-react";

import Header from "../Components/Header";

const Profile = () => {
  const { authState, oktaAuth } = useOktaAuth();

  useEffect(() => {
    async function authenticate() {
      if (!authState) return;

      if (!authState.isAuthenticated) {
        await oktaAuth.signInWithRedirect();
      }
    }

    authenticate();
  }, [authState, oktaAuth]);

  if (!authState?.isAuthenticated) {
    return (
      <Container>
        <p>Please wait while we sign you in</p>
      </Container>
    );
  } else {
    return (
      <Container>
        <Header authState={authState} oktaAuth={oktaAuth}></Header>
        <h4>Your profile page</h4>

        <p>Welcome to your profile page </p>
      </Container>
    );
  }
};

export default Profile;
