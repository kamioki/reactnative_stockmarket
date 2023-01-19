import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StocksContext = React.createContext();

export const StocksProvider = ({ children }) => {
  const [state, setState] = useState([]);

  return (
    <StocksContext.Provider value={[state, setState]}>
      {children}
    </StocksContext.Provider>
  );
};

export const useStocksContext = () => {
  const [state, setState] = useContext(StocksContext);
  function addToWatchlist(newSymbol) {
    setState((x) => [...x, newSymbol]);
    AsyncStorage.setItem("async_watchlist", JSON.stringify(state));
  }
  let _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("async_watchlist");

      if (value !== null) {

        setState(JSON.parse(value));
      }

    } catch (error) {
    }
  };

  useEffect(() => {
    _retrieveData();
  }, []);
  return {
    ServerURL: 'http://localhost:3001',
    watchList: state,
    addToWatchlist
    /*, removeFromWatchlist*/
  };
};


