import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState("")
  const [data, setData] = useState({
    level: 2,
    name: "Jorge Benitez",
    tickets: 10,
  })

  return (
    <UserContext.Provider value={{ ...data, token, setToken}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
