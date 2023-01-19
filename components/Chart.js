import { SafeAreaView, View, Dimensions, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import { LineChart } from "react-native-chart-kit";
import { useEffect, useState } from "react";

export default function getPriceData(symbol) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = "YOURAPI";

    async function getHistory(symbol) {

        let res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol.symbol}&apikey=${API_KEY}`);
        let data = await res.json();
        let priceHis = data['Time Series (Daily)']
        let dates = Object.keys(priceHis).map(key => ({ key, value: priceHis[key] }));
        return dates.map((date, i) => {
            return {
                date: (dates[i].key),
                open: dates[i].value['1. open'],
                high: dates[i].value['2. high'],
                low: dates[i].value['3. low'],
                close: dates[i].value['4. close'],
            };
        })
    }

    const [rowData, setRowData] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                setRowData(await getHistory(symbol));
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        })();
    }, []);

    if (loading) {
        return (
            <SafeAreaView>
                <Text style={styles.message}>Loading...</Text>
            </SafeAreaView>
        );
    } else if (error) {
        return (
            <SafeAreaView>
                <Text style={styles.message}>Error... probably the API limit exceeded.</Text>
            </SafeAreaView>
        );
    } else {
        //let labelData = rowData.map(dates => dates.date).reverse();
        let priceData = rowData.map(price => price.close).reverse();
        const latestOpen = rowData[rowData.length - 1].open;
        const latestClose = rowData[rowData.length - 1].close;
        const latestHigh = rowData[rowData.length - 1].high;
        const latestLow = rowData[rowData.length - 1].low;

        //console.log(labelData)

        return (
            <View>
                <LineChart
                    data={{
                        datasets: [{ data: priceData }]
                    }}
                    withDots={false}
                    width={Dimensions.get("window").width} // from react-native
                    height={200}
                    yAxisLabel="$"
                    yAxisInterval={1}
                    chartConfig={{
                        backgroundColor: "#aaa",
                        decimalPlaces: 1, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(105, 255, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 1,
                    }}
                />
                <View style={styles.dataContainer}>
                    <View>
                        <Text style={styles.dataText}> Latest Open: ${latestOpen} </Text>
                        <Text style={styles.dataText}> Latest Close: ${latestClose}</Text>
                    </View>
                    <Divider orientation="vertical" height={"100%"} width={0.5} />
                    <View>
                        <Text style={styles.dataText}> Latest Day High: ${latestHigh} </Text>
                        <Text style={styles.dataText}> Latest Day Low : ${latestLow} </Text>
                    </View>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    message: {
        fontSize: 30,
        color: "grey",
        padding: 10,
    },
    dataText: {
        fontSize: 14,
        color: "grey",
    },
    dataContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 10,
        marginBottom: 15,
    },
});
