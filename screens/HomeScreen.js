import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, ImageBackground, ScrollView } from 'react-native';

export default function HomeScreen({ route }) {
  const [state, setState] = useState();

  return (
    <ScrollView style={styles.container} >

      <ImageBackground
        source={require('../assets/images/home_back.jpg')}
        style={styles.bgimg}
      />

      <Text style={styles.title}>Welcome to Stock App</Text>
      <Text style={styles.text}>This app provides NASDAQ 100 companies' stock information. Create your own watchlist and check price history instantly!
        {"\n"} {"\n"} {"\n"}
        {"\n"} {"\n"}
        1. First, click 'Search Stocks' in the bottom menu to view all the available companies' list (NASDAQ 100).</Text>
      <Image style={styles.image} source={require('../assets/images/search.png')} />
      <Text style={styles.text}>
        2. Then, search companies by name or symbol. Click 'Add to watchlist' bottom and create your own stock list.</Text>
      <Image style={styles.image} source={require('../assets/images/chart.png')} />
      <Text style={styles.text}>
        3. Click 'Stocks Info' in the bottom menu to see created watchlist and check the price history. When you click the company's symbol, price history and the detailed information will pop-up.
      </Text>
      <Text style={styles.title}>
        Enjoy! {"\n"} {"\n"} {"\n"}</Text>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    //justifyContent: 'center',
    textAlign: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#ccc",
    fontSize: 15,
    padding: 20,

  },
  image: {
    width: 300,
    height: 480,
    alignSelf: 'center',
    margin: 20,
    borderWidth: 5,
    borderColor: "#333",
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 30,
    //alignItems: "center",
    marginTop: "10%",
    //width: "100%",
  },
  bgimg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute"
  }
});