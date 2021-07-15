import { Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AskPage from "./pages/AskPage";
import MapPage from "./pages/MapPage";
import UserPage from "./pages/UserPage";
import { useEffect } from "react";
import userPool from "./lib/awsconfig";
import { useDispatch } from "react-redux";
import { loaded } from "./modules/auth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const currentUser = userPool.getCurrentUser();

    if (currentUser) {
      dispatch(loaded(currentUser.username));
    }
  }, []);
  return (
    <>
      <Route path="/" exact component={AskPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/map" component={MapPage} />
      <Route path="/user" component={UserPage} />
    </>
  );
}

export default App;
