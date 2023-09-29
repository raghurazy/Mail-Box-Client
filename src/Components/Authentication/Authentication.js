import React, { useState } from "react";
import Card from "../UI/Card";

import classes from "./Authentication.module.css";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const Authentication = () => {
    
    const [isLoginVisible, setIsLoginVisible] = useState(true);


    const switchHandler = () => {
        setIsLoginVisible(!isLoginVisible);
    }

  return (
    <section className={classes.auth}>
      <Card>
        {!isLoginVisible&& <SignUp />}
        {isLoginVisible && <LogIn />}

        <div>
          <p>
            {!isLoginVisible ? "Already have an account?" : "Create new account." }<button onClick={switchHandler}>{!isLoginVisible ? "Log In" : "Sign up"}</button>
          </p>
        </div>
      </Card>
    </section>
  );
};

export default Authentication;