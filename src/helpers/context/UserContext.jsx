import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [level, setLevel] = useState(2);
  const [name, setName] = useState("Jorge Benitez");
  const [tickets, setTickets] = useState(10);

  /* Aqui tem a requisição com os dados do usuário  */
  /* Por enquarto, está mockado  */

  return (
    <UserContext.Provider value={{ level, name, tickets }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
