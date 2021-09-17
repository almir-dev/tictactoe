import * as React from "react";
import { LandingPage } from "./LandingPage";
import createHistory from "history/createBrowserHistory";
import Auth from "../service/auth/Auth";
import { Route, Router } from "react-router-dom";
import { ApplicationLoading } from "./ApplicationLoading";
import { ProfilePage } from "./profile/ProfilePage";

const history = createHistory();
const auth = new Auth(history);

const handleAuthentication = (props: any) => {
  const location = props.location;
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export function App() {
  return (
    <Router history={history}>
      <div>
        <Route
          path={"/callback"}
          render={(props) => {
            handleAuthentication(props);
            return <ApplicationLoading />;
          }}
        />
        <Route
          render={(props) => {
            return <LandingPage auth={auth} {...props} />;
          }}
        />
        <Route
          path={"/profile"}
          render={() => {
            return <ProfilePage />;
          }}
        />
      </div>
    </Router>
  );
}
