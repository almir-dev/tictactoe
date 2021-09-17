import * as React from "react";
import { PropsWithChildren } from "react";
import { LandingPage } from "./LandingPage";
import createHistory from "history/createBrowserHistory";
import Auth from "../service/auth/Auth";
import { Route, Router } from "react-router-dom";
import { ApplicationLoading } from "./ApplicationLoading";
import { ProfilePage } from "./profile/ProfilePage";
import { Box, Typography } from "@mui/material";

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
            return (
              <SecurePage auth={auth}>
                <ProfilePage auth={auth} />
              </SecurePage>
            );
          }}
        />
      </div>
    </Router>
  );
}

interface SecurePageProps {
  /** Authentication service. */
  auth: Auth;
}

function SecurePage({ auth, children }: PropsWithChildren<SecurePageProps>) {
  const isAuthenticated = auth.isAuthenticated();
  if (!isAuthenticated) {
    return <UnauthorizedPage />;
  }

  return <>{children}</>;
}

function UnauthorizedPage() {
  return (
    <Box sx={{ width: 1, height: "100%", justifyContent: "center" }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        You are not authorized.
      </Typography>
    </Box>
  );
}
