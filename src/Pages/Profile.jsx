import React from "react";
import { Container } from "react-bootstrap";

import { useOktaAuth } from "@okta/okta-react";

import Header from "../Components/Header";

const Profile = () => {
  const { authState, oktaAuth } = useOktaAuth();

  if (!authState?.isAuthenticated) {
    oktaAuth.signInWithRedirect();

    return (
      <Container>
        <p>Please wait while we sign you in</p>
      </Container>
    );
  }

  return (
    <Container>
      <Header authState={authState} oktaAuth={oktaAuth}></Header>
      <h4>Your profile page</h4>

      <p>Welcome to your profile page </p>
    </Container>
  );
};

export default Profile;
