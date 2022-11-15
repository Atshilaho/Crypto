import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const LineGraph = ({ details: { prices } }) => {
  //Convert the date into days
  const convertDdates = (data) => {
    return data.map((d) => {
      return new Date(d[0]).getDate();
    });
  };

  const labels = convertDdates(prices);
  const data = prices.map((price) => price[1]);

  const state = {
    labels,
    datasets: [
      {
        label: "Bitcoin: last 7 days",
        backgroundColor: "rgb(46, 83, 164)",
        borderColor: "#11133a",
        borderWidth: 2,
        lineTension: 0.2,
        fill: true,
        data,
      },
    ],
  };
  return (
    <Line
      data={state}
      options={{
        scales: {
          y: {
            grid: {
              display: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      }}
    />
  );
};

export default LineGraph;
