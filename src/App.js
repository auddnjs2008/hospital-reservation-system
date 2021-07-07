import { Route } from "react-router-dom";
import AskComponent from "./components/asks/AskComponent";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AskPage from "./pages/AskPage";
import MapPage from "./pages/MapPage";
function App() {
  return (
    <>
      <Route path="/" exact component={AskPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/map" component={MapPage} />
    </>
  );
}

export default App;
