import React, { useState, useEffect } from "react";
import { ListItem } from "react-native-elements";
import { useStocksContext } from "../contexts/StocksContext";
import { StyleSheet, View, Text, ScrollView, Button, } from "react-native";

export default function StockList(props) {
  let data = props.rowData;
  const { watchlist, addToWatchlist } = useStocksContext();

  const addToClick = (data) => {
    getItem("watchlist");
    if (!watchlist) {
      AsyncStorage.setItem("watchlist", [data]);
      navigation.navigate("Stocks");
    }
    else {
      let flag = true;
      for (let i = 0; i < watchlist.length; i++) {
        if (watchlist[i].click == data.click) {
          flag = false;
        }
      }
      if (flag) {
        watchlist.push(data)
        AsyncStorage.setItem("watchlist", watchlist)

      }
    }
  }

  if (data.length == 0) {
    return (
      <Text style={styles.text}>No such stock in the list...</Text>
    );
  } else {
    return (

      <ScrollView>
        {
          data.map((e, index) => {
            return (

              <View key={index} style={styles.container} onPress={(e) => addToClick(e)}>

                <ListItem containerStyle={styles.listitem}>

                  <ListItem.Content style={[styles.symbol]}>

                    <ListItem.Title style={styles.symbol}>
                      {e.symbol}
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles.name}>
                      {e.name}
                    </ListItem.Subtitle>
                  </ListItem.Content>

                  <Button onPress={() => (addToWatchlist(e.symbol), alert(e.name + " added to your watchlist."))} key={e.symbol}
                    title={"Add to Watchlist"}
                    style={styles.button}
                    color={"green"}
                  />
                </ListItem>
              </View>
            )
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%", color: "white" },
  listitem: {
    backgroundColor: "black",
  },
  name: {
    color: "#808080",
    padding: 0,
    paddingLeft: 2,
  },
  text: {
    color: "white",
    padding: 20,
  },
  symbol: {
    color: "white",
    padding: 2,
  }
});
