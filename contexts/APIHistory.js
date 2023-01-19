import { useEffect, useState } from "react";

export default function GetPriceHistory() {

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    }, []); return {
        loading,
        rowData,
        error,
    };
}
