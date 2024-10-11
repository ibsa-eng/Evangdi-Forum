import { createContext, useState } from "react";

const EditContext = createContext();

// Create a provider component
export const EditProvider = ({ children }) => {
  const [edit, setEdit] = useState(false);

  // Update function (can be called from any component that consumes the context)
  const updateState = (newState) => {
    setEdit(newState);
  };

  return (
    <EditContext.Provider value={{ edit, updateState }}>
      {children}
    </EditContext.Provider>
  );
};

export default EditContext;
