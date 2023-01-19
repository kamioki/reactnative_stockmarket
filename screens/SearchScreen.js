import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Keyboard, Text, TextInput } from "react-native";
import SearchBar from "../components/SearchBar";
import SearchStocks from "../contexts/APIStocks";
import StockList from "../components/StockList";
import { useStocksContext } from "../contexts/StocksContext";
//import { FontAwesome5 } from "@expo/vector-icons";

function filterStocks(data, symbol) {
  let searchData = [];
  if (symbol === "") {
    return (searchData = data);
  } else {
    searchData = data.filter((profile) => {
      return profile.symbol.toLowerCase().includes(symbol.toLowerCase()) || profile.name.toLowerCase().includes(symbol.toLowerCase());
    });
    return searchData;
  }
}

export default function SearchScreen({ navigation }) {
  const { addToWatchlist } = useStocksContext();
  const { loading, rowData, error } = SearchStocks();
  const [symbol, setSymbol] = useState("");
  const stockList = filterStocks(rowData, symbol);
  // useEffect(() => {
  //   getWatchList();
  // }, []);

  if (loading) {
    return (

      <Text style={styles.titleText}>Loading stocks... </Text>

    );
  } else if (error) {
    return (

      <Text style={styles.titleText}>Error... probably the API limit exceeded</Text>

    );
  } else {
    return (
      <SafeAreaView onPress={Keyboard}>
        <View style={styles.container}>
          <SearchBar
            icon={"search"}
            placeholder={"Search stocks..."}
            symbol={symbol}
            setSymbol={setSymbol}
          ></SearchBar>
          <StockList rowData={stockList} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    color: "white",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: "#282828",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#282828",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
    color: "white",
  }
});
