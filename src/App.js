import { Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AskPage from "./pages/AskPage";
import MapPage from "./pages/MapPage";
import UserPage from "./pages/UserPage";

import ReservationPage from "./pages/ReservationPage";
import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import { isManager, login } from "./modules/auth";

import Amplify from "aws-amplify";
import { config, managerConfig } from "../src/lib/amplifyconfig";
import ChatContainer from "./containers/chat/ChatContainer";

function App() {
  const dispatch = useDispatch();

  const userIconClick = async () => {
    let currentUser;
    await Auth.currentAuthenticatedUser()
      .then((user) => {
        currentUser = user;
      })
      .catch((e) => (currentUser = ""));
    if (currentUser) dispatch(login({ id: currentUser.username }));
    return currentUser;
  };

  useEffect(() => {
    const asyncFunc = async () => {
      let user = await userIconClick();
      if (!user) {
        Amplify.configure(managerConfig);
        user = userIconClick();
        if (!user) Amplify.configure(config);
        else dispatch(isManager());
      }
    };
    asyncFunc();
  }, []);

  return (
    <>
      {<ChatContainer />}
      <Route path="/" exact component={AskPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/map" component={MapPage} />
      <Route path="/user" component={UserPage} />
      <Route path="/reservation/:id" component={ReservationPage} />
    </>
  );
}

export default App;
