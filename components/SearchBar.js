import { StyleSheet, View, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function SearchBar(props) {
  return (
    <View style={styles.container}>
      <FontAwesome5
        name="search-dollar"
        size={20}
        color="white"
        style={{ marginLeft: 1 }}
      />
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        value={props.symbol}
        onChangeText={props.setSymbol}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",
  },
  input: {
    width: "90%",
    fontSize: 20,
    marginLeft: 10,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    color: "white",
  },
});
