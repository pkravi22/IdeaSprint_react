import { createContext, useContext } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const Login = (res) => {
    console.log(res);
  };
  return (
    <UserContext.Provider value={{ Login }}>{children}</UserContext.Provider>
  );
};
export default UserProvider;
