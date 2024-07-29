import { createContext, useEffect, useState } from "react";
import {
  signup as signupService,
  login as loginService,
  logout as logoutService,
  getLoggedInUser,
} from "../services/authentication";
import { useLocation, useNavigate } from "react-router-dom";
import { LogoutDialog } from "../components/LogoutDialog";

export const Context = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoadingUser(true);
    getLoggedInUser()
      .then(setUser)
      .finally(() => {
        setIsLoadingUser(false);
      });
  }, []);

  function signup(email, password) {
    return signupService(email, password).then((user) => {
      setUser(user);
      navigate(location.state?.location ?? "/");
    });
  }

  function login(email, password) {
    return loginService(email, password).then((user) => {
      setUser(user);
      navigate(location.state?.location ?? "/");
    });
  }

  function logout() {
    setIsLogoutModalOpen(true);
    return logoutService()
      .then(() => {
        setUser(undefined);
      })
      .finally(() => setIsLogoutModalOpen(false));
  }

  return (
    <Context.Provider
      value={{
        user,
        isLoadingUser,
        signup,
        logout,
        login,
        isLoggedIn: user != null,
      }}
    >
      {children}
      <LogoutDialog
        isOpen={isLogoutModalOpen}
        onOpenChange={setIsLogoutModalOpen}
      />
    </Context.Provider>
  );
}
