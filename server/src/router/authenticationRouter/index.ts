import express, { Request, Response } from "express";
import { isEmpty } from "lodash";
import { IsAuthenticated } from "@shared/types";
import {
  generateSpotifyAuthUrl,
  getSpotifyAccessToken,
  calculateExpiration,
  getSpotifyProfile,
} from "../../utils";

export const authenticationRouter = express.Router();

authenticationRouter.get(
  "/is-authenticated",
  async (request: Request, response: Response) => {
    try {
      // shorthand
      const s = request.session;

      const isAuthenticated = s.isAuthenticated;
      const rightNowInMs = Date.now();
      const isExpired = rightNowInMs > (s.expirationDateInMs ?? 0);

      if (!isAuthenticated || isExpired) {
        console.group("NOT AUTHENTICATED or IS EXPIRED");
        console.log(s.accessTokenData);
        console.groupEnd();

        const isNotAuthenticated: IsAuthenticated = {
          authenticated: false,
          user: null,
        };

        return response.status(200).send(isNotAuthenticated);
      }

      return response.status(200).send(isAuthenticated);
    } catch (error) {
      console.group("/is-authenticated");
      console.log(error);
      console.groupEnd();

      const _response: IsAuthenticated = { authenticated: false, user: null };
      return response.status(200).send(_response);
    }
  }
);

authenticationRouter.get(
  "/get-spotify-auth-url",
  function (_request, response) {
    response.send(generateSpotifyAuthUrl());
  }
);

authenticationRouter.get("/callback", async (request, response) => {
  const { code } = request.query;

  if (isEmpty(code)) throw new Error("invalid credentials");

  try {
    const accessTokenData = await getSpotifyAccessToken(code.toString());
    console.log({ accessTokenData });

    /**
     * calculate expiration
     */
    const tokenSeconds = accessTokenData.expires_in;
    console.log({ tokenSeconds });

    const expirationDateInMs = calculateExpiration(tokenSeconds);
    console.log({ expirationDateInMs });

    /**
     * get profile
     */
    const user = await getSpotifyProfile(accessTokenData.access_token);
    console.log({ user });

    const isAuthenticated: IsAuthenticated = {
      authenticated: true,
      user,
    };
    console.log({ isAuthenticated });

    if (!isEmpty(accessTokenData)) {
      request.session.accessTokenData = accessTokenData;
      request.session.expirationDateInMs = expirationDateInMs;
      request.session.isAuthenticated = isAuthenticated;
      return response.redirect("/");
    }

    console.log(">>> access token is empty");
    return response.redirect("/auth/logout");
  } catch (error) {
    console.group("/callback");
    console.log(error);
    console.groupEnd();
    return response.redirect("/");
  }
});

authenticationRouter.get("/logout", function (request, response) {
  console.info(">>> LOGGING OUT");
  request.session.accessTokenData = null;
  return response.redirect("/");
});
