import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import Header from "./Components/Header/Header";
import Homepage from "./Screens/Homepage/Homepage";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Sidebar from "./Components/Sidebar/Sidebar";
import CreateProject from "./Screens/CreateProject/CreateProject";
import MemberRequest from "./Screens/MemberRequest";

function App() {
  const role = useSelector((state) =>
    state.userLogin.userInfo ? state.userLogin.userInfo.role : ""
  );
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Header />
            <Homepage />
          </Route>
          <Route path='/home'>
            <Header />
            <Homepage />
          </Route>
          <Route path="/login">
            <Header />
            <LoginScreen />
          </Route>
          <Route path="/register">
            <Header />
            <RegisterScreen />
          </Route>
          <ProtectedRoute path='/dashboard'>
            <Sidebar />
          </ProtectedRoute>
        </Switch>
      </Router>
    </>
  );
}

export default App;
