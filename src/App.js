import { Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AskPage from "./pages/AskPage";
import MapPage from "./pages/MapPage";
import UserPage from "./pages/UserPage";

import ReservationPage from "./pages/ReservationPage";

function App() {
  return (
    <>
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
