import * as React from "react";
import { IUser } from "../types";
import { Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AskPage from "./pages/AskPage";
import MapPage from "./pages/MapPage";
import UserPage from "./pages/UserPage";

import ReservationPage from "./pages/ReservationPage";
import { useCallback, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import { isManager, login } from "./modules/auth";

import Amplify from "aws-amplify";
import { config, managerConfig } from "./lib/amplifyconfig";
import ChatContainer from "./containers/chat/ChatContainer";
import ReviewPage from "./pages/ReviewPage";
import { useState } from "react";

function App() {
  const dispatch = useDispatch();
  const [manager, setManager] = useState(false);

  const userIconClick = useCallback(async () => {
    let currentUser: IUser | "";
    await Auth.currentAuthenticatedUser()
      .then((user) => {
        currentUser = user;
      })
      .catch((e) => (currentUser = ""));
    if (currentUser!) dispatch(login({ id: currentUser.username }));
    return currentUser!;
  }, [dispatch]);

  useEffect(() => {
    const asyncFunc = async () => {
      let user = await userIconClick();
      if (!user) {
        Amplify.configure(managerConfig);
        user = await userIconClick();
        if (!user) Amplify.configure(config);
        else {
          dispatch(
            isManager({ hospital: user.attributes["custom:hospital_name"] })
          );
          setManager(true);
        }
      }
    };
    asyncFunc();
  }, [dispatch, userIconClick]);

  return (
    <>
      <ChatContainer />
      {!manager ? (
        <>
          <Route path="/" exact component={AskPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/map" component={MapPage} />
          <Route path="/user" component={UserPage} />
          <Route path="/reservation/:id" component={ReservationPage} />
          <Route path="/review/:id" component={ReviewPage} />
        </>
      ) : (
        <>
          <Route path="/" exact component={UserPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </>
      )}
    </>
  );
}

export default App;
