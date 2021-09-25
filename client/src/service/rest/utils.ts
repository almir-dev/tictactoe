import { auth } from "../../components/App";

/**
 * Creates config for api requests.
 */
export function getApiConfig() {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.idToken}`,
    },
  };
}
