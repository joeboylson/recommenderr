import Header from "../Header";
import { WithChildren } from "../../types";
import { createContext } from "react";
import { useAuthenticatedUser } from "../../hooks/useAuthenticatedUser";
import { IsAuthenticated } from "@shared/types";
import styled from "styled-components";

const StyledAuthenticatedWrapper = styled("div")`
  display: grid;
  grid-template-rows: 36px 1fr;
  grid-template-columns: 1fr;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

interface UserContextType {
  authenticatedUser?: IsAuthenticated;
}

export const UserContext = createContext<UserContextType>({
  authenticatedUser: undefined,
});

export default function AuthenticatedWrapper({ children }: WithChildren) {
  const { authenticatedUser, loading } = useAuthenticatedUser();

  if (loading) return <p>Loading...</p>;

  return (
    <StyledAuthenticatedWrapper id="auth-wrapper">
      <UserContext.Provider value={{ authenticatedUser }}>
        <Header />
        {children}
      </UserContext.Provider>
    </StyledAuthenticatedWrapper>
  );
}
