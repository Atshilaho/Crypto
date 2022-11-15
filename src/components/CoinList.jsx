import React from "react";
import { Link } from "react-router-dom";

const CoinList = ({ coins }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Price</th>
          <th>24hr</th>
          <th>Perfomance(%)</th>
        </tr>
      </thead>
      <tbody>
        {coins?.length !== 0 &&
          coins.map((coin, index) => {
            const positive = coin.price_change_percentage_24h < 0 ? true : false;
            return (
              <tr>
                <td>{++index} </td>
                <td className="coin__name">
                  <img src={coin.image} />
                  <Link to={`/coins/${coin.id}`}>{coin.name}</Link>
                </td>
                <td>R{coin.current_price}</td>
                <td>{coin.price_change_24h.toFixed(5)} </td>
                <td className={positive ? "negative" : "positive"}>{coin.price_change_percentage_24h.toFixed(5)}%</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default CoinList;
