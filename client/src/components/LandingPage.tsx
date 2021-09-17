import React from "react";
import Auth from "../service/auth/Auth";
import { MenuBar } from "./menu/Menu";

export interface LandingPageProps {
  /** Authentication service. */
  auth: Auth;
}

export function LandingPage({ auth }: LandingPageProps) {
  return <MenuBar auth={auth} />;
}
