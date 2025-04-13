import { createContext, useReducer } from "react";

export const VendorsContext = createContext();

export const vendorsReducer = (state, action) => {
  switch (action.type) {
    case "SET_VENDORS":
      return {
        vendors: action.payload,
      };
    case "CREATE_VENDOR":
      return {
        vendors: [action.payload, ...state.vendors],
      };
    case "DELETE_VENDOR":
      return {
        vendors: state.vendors.filter((v) => v._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const VendorsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(vendorsReducer, {
    vendors: null,
  });

  return (
    <VendorsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </VendorsContext.Provider>
  );
};
