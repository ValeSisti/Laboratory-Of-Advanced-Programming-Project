import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext<{ [key: string]: any }>({});

interface UserData {
  username: string;
  user_id: string;
  profile_pic: string;
  email: string;
  password: string;
}

export const AuthProvider = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { children } = props;
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data: UserData) => {
    setUser(data);
    return navigate("/homepage/");
  };
  
  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
