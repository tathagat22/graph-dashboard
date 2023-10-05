/**
 * Chart component displays a line chart using ECharts library with data fetched from Contentful.
 *
 * @param {string} spaceId - The Contentful Space ID.
 * @param {string} accessToken - The Contentful Access Token.
 * @returns {JSX.Element} - React component displaying the line chart.
 */
import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { createClient } from "contentful";
import * as echarts from "echarts";
interface ChartProps {
  spaceId: string;
  accessToken: string;
}

const Chart: React.FC<ChartProps> = ({ spaceId, accessToken }) => {
  const [chartData, setChartData] = useState<any[] | null>(null);

  useEffect(() => {
    const contentfulClient = createClient({
      space: spaceId,
      accessToken: accessToken,
    });

    // Define the Contentful content type ID for your chart data
    const contentTypeId = "eChartsChartData";

    // Fetch data from Contentful
    contentfulClient
      .getEntries({ content_type: contentTypeId })
      .then((response) => {
        if (response.items.length > 0) {
          setChartData(
            response.items.map((item: any) => ({
              name: item.fields.name,
              data: item.fields.data,
            }))
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching data from Contentful:", error);
      });
  }, [spaceId, accessToken]);

  const getOption = () => {
    if (chartData) {
      return {
        color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: chartData.map((item) => item.name),
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: chartData.map((item) => ({
          name: item.name,
          type: "line",
          stack: "Total",
          smooth: true,
          lineStyle: {
            width: 0,
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "rgb(128, 255, 165)",
              },
              {
                offset: 1,
                color: "rgb(1, 191, 236)",
              },
            ]),
          },
          emphasis: {
            focus: "series",
          },
          data: item.data,
        })),
      };
    }

    return {}; // Return an empty option if data is not loaded yet
  };

  return (
    <div>
      {chartData ? (
        <ReactECharts option={getOption()} style={{ height: "600px" }} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Chart;
