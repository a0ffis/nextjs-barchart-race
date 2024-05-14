"use client";
import React, { useRef, useEffect, useState } from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { clear } from "console";

export default function Home() {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [data, setData] = React.useState<any>(null);
  const [nbr, setNbr] = React.useState(12);

  const [currentYear, setCurrentYear] = React.useState(1950);
  const [startYear, setStartYear] = React.useState(1950);
  const [endYear, setEndYear] = React.useState(2021);
  //
  useEffect(() => {
    const fetchData = async () => {
      // const response = await fetch(
      //   "https://demo-live-data.highcharts.com/population.json",
      // );

      const response = await fetch(
        `${process.env.API_ENDPOINT}:${process.env.API_PORT}/get_population`,
      );
      // const response = await fetch("/api/get_population");
      const chartData = await response.json();
      setData(chartData.results);
    };
    fetchData();
  }, []);
  console.log(process.env);

  function getData(year) {
    const output = Object.entries(data ?? [])
      .map((country) => {
        const [countryName, countryData] = country;
        return [countryName, Number(countryData[year])];
      })
      .sort((a, b) => b[1] - a[1]);
    console.log([output[0], output.slice(1, nbr)]);
    return [output[0], output.slice(1, nbr)];
  }

  function getSubtitle() {
    if (!data) {
      return "Loading data...";
    }
    const population = (getData(currentYear)[0][1] / 1000000000).toFixed(2);
    return `<span style="font-size: 80px">${currentYear}</span>
          <br>
          <span style="font-size: 22px">
              Total: <b>: ${population}</b> billion
          </span>`;
  }

  const options: Highcharts.Options = {
    chart: {
      animation: {
        duration: 500,
      },
      marginRight: 50,
    },
    title: {
      text: "World population by country",
      align: "left",
    },
    subtitle: {
      useHTML: true,
      text: getSubtitle(),
      floating: true,
      align: "right",
      verticalAlign: "middle",
      y: 150,
      x: -100,
    },

    legend: {
      enabled: false,
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      opposite: true,
      tickPixelInterval: 150,
      title: {
        text: null,
      },
    },
    plotOptions: {
      series: {
        animation: false,
        groupPadding: 0,
        pointPadding: 0.1,
        borderWidth: 0,
        colorByPoint: true,
        dataSorting: {
          enabled: true,
          matchByName: true,
        },
        type: "bar",
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        type: "bar",
        name: currentYear,
        data: getData(currentYear)[1],
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 550,
          },
          chartOptions: {
            xAxis: {
              visible: false,
            },
            subtitle: {
              x: 0,
            },
            plotOptions: {
              series: {
                dataLabels: [
                  {
                    enabled: true,
                    y: 8,
                  },
                  {
                    enabled: true,
                    format: "{point.name}",
                    y: -8,
                    style: {
                      fontWeight: "normal",
                      opacity: 0.7,
                    },
                  },
                ],
              },
            },
          },
        },
      ],
    },
  };

  const [playStatus, setPlayStatus] = useState(true);

  useEffect(() => {
    if (playStatus) {
      var interval = setInterval(() => {
        update(1);
      }, 500);
      if (currentYear == endYear) {
        setPlayStatus(false);
        clearInterval(interval);
      }
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playStatus, currentYear]);

  function play() {
    setPlayStatus(true);

    if (currentYear == endYear) {
      setCurrentYear(startYear);
      options.series[0].data = getData(startYear)[1];
      options.subtitle.text = getSubtitle();
    }
  }

  function pause() {
    setPlayStatus(false);
  }

  function update(increment) {
    if (increment) {
      setCurrentYear((prev) => prev + increment);
    }

    options.subtitle.text = getSubtitle();
    options.series[0].data = getData(currentYear)[1];
  }
  return (
    <>
      {!data ? (
        "Loading data..."
      ) : (
        <div className="p-4">
          <div className="text-center">
            <button
              className="border border-blue-500 rounded px-4 py-1 bg-blue-500 text-white mb-2"
              onClick={() => {
                if (playStatus) pause();
                else play();
              }}
            >
              {!playStatus ? "Play" : "Pause"}
            </button>
          </div>
          <input
            type="range"
            className="w-full"
            value={currentYear}
            min={startYear}
            max={endYear}
            onChange={(e) => {
              options.series[0].data = getData(e.currentTarget.value)[1];
              options.subtitle.text = getSubtitle();
              setCurrentYear(Number(e.currentTarget.value));
            }}
          />
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
          />
        </div>
      )}
      <pre>
        {process.env.NODE_ENV}
        <br />
        HOST : {process.env.DB_HOST}
        <br />
        USER : {process.env.DB_USER}
        <br />
        PASS : {process.env.DB_PASSWORD}
        {/* <br /> */}
        {/* API : {process.env.API_ENDPOINT} */}
      </pre>
    </>
  );
}
