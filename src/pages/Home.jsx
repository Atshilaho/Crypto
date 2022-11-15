import React, { useState, useEffect } from "react";
import CoinList from "../components/CoinList";

const Home = () => {
  const [coins, setCoins] = useState([]);
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=10&page=1&sparkline=false";

  useEffect(() => {
    const fetchCoins = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setCoins(data);
    };

    fetchCoins();
  }, []);

  return (
    <div className="home">
      <h3>CryptoLand!</h3>
      <CoinList coins={coins} />
    </div>
  );
};

export default Home;
