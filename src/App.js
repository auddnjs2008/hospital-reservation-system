import { Route } from "react-router-dom";
import AskComponent from "./components/asks/AskComponent";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AskPage from "./pages/AskPage";
import MapPage from "./pages/MapPage";
import AwsAuthForm from "./components/auth/AwsAuthForm";
function App() {
  return (
    <>
      <Route path="/" exact component={AskPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/map" component={MapPage} />
      <Route path="/test" component={AwsAuthForm} />
    </>
  );
}

export default App;
