import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import {
  MainScreen
} from "./components"

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
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainScreen} />
        {/* <Route exact path="/register" component={RegisterScreen} />
        <PrivateRoute exact auth={!!id} path="/main" component={MainScreen} /> */}
      </Switch>
    </Router>
  );
};

export default App;
