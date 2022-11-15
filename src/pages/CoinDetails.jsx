import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LineGraph from "../components/Line";
const CoinDetails = () => {
  //Get the coin id from the url param
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [coinMarket, setCoinMarket] = useState(null);

  const fetchCoin = async () => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    const data = await response.json();
    return data;
  };

  const fetchCoinDetails = async () => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=zar&days=7&interval=daily`);
    const data = await response.json();
    return data;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        //Fetching coin details and market data in parallel
        const res = await Promise.all([await fetchCoin(), await fetchCoinDetails()]);

        setCoin(res[0]);
        setCoinMarket(res[1]);
      } catch (error) {
        console.log(error); //Could handle the errors better?
      }
    };
    fetchData();
  }, []);

  //While the data is still fetching...
  if (!coin || !coinMarket) {
    return (
      <div className="coin__container">
        <h1 style={{ color: "#fff" }}>Loading...</h1>
      </div>
    );
  }
  const positive = coin.market_data.price_change_percentage_24h < 0 ? true : false;
  return (
    <div className="coin__container">
      <Link to="/">Back to Coins</Link>
      <div className="coin__details">
        <img src={coin.image.small} alt="" />
        <div className="coin__content">
          <h2>{coin.name}</h2>
          <small dangerouslySetInnerHTML={{ __html: coin.description.en.slice(0, 250) + "..." }}></small>
          <p className="rank">Rank #{coin.market_cap_rank}</p>
        </div>
      </div>
      <div className="cards">
        <div className="card">
          <h4>Price</h4>
          <p>R{coin.market_data.current_price.zar?.toLocaleString()}</p>
        </div>
        <div className="card">
          <h4>Market Cap</h4>
          <p>R{coin.market_data.market_cap.zar?.toLocaleString()}</p>
        </div>

        <div className="card">
          <h4>Supply</h4>
          <p>{coin.market_data.total_supply?.toLocaleString() ?? "N/A"}</p>
        </div>
        <div className="card">
          <h4>24h Performance(%)</h4>
          <p className={positive ? "negative" : "positive"}>{coin.market_data.price_change_percentage_24h}%</p>
        </div>
      </div>
      <div className="coin__graph">
        <LineGraph details={coinMarket} />
      </div>
    </div>
  );
};

export default CoinDetails;
