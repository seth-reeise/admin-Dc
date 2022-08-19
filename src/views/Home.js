import React, { Fragment } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import CustomerSearch from "../components/CustomerSearch/CustomerSearch";

const Home = () => {
    const {
        isAuthenticated,
        loginWithRedirect
    } = useAuth0();
    
    if (!isAuthenticated) {
      loginWithRedirect().then(r => {
      })
    } else {
      return (
      isAuthenticated && (
        <Fragment>
            <CustomerSearch />
      </Fragment>
      )
    );
}
  
}
export default Home;
