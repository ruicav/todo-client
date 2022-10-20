import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { useAuth, ProvideAuth } from "./contexts/auth";

import Login from "./components/Login";
import NewUser from "./components/NewUser";
import Projects from "./components/Projects";

function PrivateRoute({ children, ...rest }) {
  let { token } = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

function App() {
  return (
    <div className="App">
      <ProvideAuth>
        <Router>
          <div>
            <Switch>
              <Route exact path={["/", "/login"]}>
                <Login />
              </Route>
              <Route exact path="/new-user">
                <NewUser />
              </Route>
              <PrivateRoute path="/projects">
                <Projects />
              </PrivateRoute>
            </Switch>
          </div>
        </Router>
      </ProvideAuth>
    </div>
  );
}

export default App;
