import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { MainScreen, LoginScreen, RegisterScreen } from "./components";

const PrivateRoute = ({ component: Component, path, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
};

const App = () => {
  const { token } = useSelector(state => state);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <PrivateRoute
          exact
          path="/main"
          component={MainScreen}
          auth={!!token}
        />
        {/* <Route exact path="/register" component={RegisterScreen} />
        <PrivateRoute exact auth={!!id} path="/main" component={MainScreen} /> */}
      </Switch>
    </Router>
  );
};

export default App;
