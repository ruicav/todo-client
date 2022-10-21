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
import ProjectList from "./components/ProjectList";
import { ProvideAlert } from "./contexts/alert";

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

function App() {
  return (
    <div className="App">
      <ProvideAlert>
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
                  <ProjectList />
                </PrivateRoute>
              </Switch>
            </div>
          </Router>
        </ProvideAuth>
      </ProvideAlert>
    </div>
  );
}

export default App;
