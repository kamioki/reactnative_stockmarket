import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';
import { useStocksContext } from '../contexts/StocksContext';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import Chart from "../components/Chart";

export default function StocksScreen() {

  const [symbol, setSymbol] = useState("");
  const { watchList } = useStocksContext();

  function WatchListItem({ item }) {
    return (
      <View style={styles.rowBox}>
        <Text style={styles.textColorBox}
          onPress={() => {
            openModal();
            setSymbol(item);
          }}>
          {item}
        </Text>
      </View>
    )
  }
  useEffect(() => {
  }, [watchList]);

  const openModal = () => { bottomSheetModalRef.current.present(); }
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['60%'], []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <FlatList
          style={{ height: "100%" }}
          data={watchList}
          renderItem={({ item }) => WatchListItem({ item })}
        />
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.chartTitle}>Stock chart (Daily) of {symbol}</Text>
          <Chart symbol={symbol} />
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({

  textColor: {
    color: "white",
  },
  textColorBox: {
    color: "white",
    flex: 1,
    backgroundColor: "black",
  },
  bottonStyle1: {
    margin: 10,
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "blue",
  },
  textColorBox: {
    color: "white",
    flex: 1,
    backgroundColor: "black",
  },
  contentContainer: {
    backgroundColor: "black",
    color: "white",
  },

  chartTitle: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
    margin: 15,
  },
  rowBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderColor: "grey",
    borderBottomWidth: 2,
    padding: 3,
    paddingLeft: 10,
    margin: 3,
  },
});