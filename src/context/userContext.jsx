import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Renamed to 'user' for clarity
const [isLoading, setIsLoading] = useState(false);

const [allPlans, setAllPlans] = useState();
const login = (userData) => {
  console.log("Setting user data", userData);
  setUser(userData);
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("email");
  localStorage.removeItem("selectedPlan");
  localStorage.removeItem("allPlans");
  setUser(null);
};

return (
  <UserContext.Provider
    value={{
      user,
      login,
      logout,
      isLoading,
      setIsLoading,
      allPlans,
      setAllPlans,
    }}
  >
    {children}
  </UserContext.Provider>
);
};

export default UserProvider;
