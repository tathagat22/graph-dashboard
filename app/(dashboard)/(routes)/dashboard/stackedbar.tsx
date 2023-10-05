/**
 * StackedBarChart component displays a stacked bar chart using ECharts library.
 * It fetches data from Contentful based on the provided Space ID and Access Token
 * and renders the chart when data is available.
 *
 * @param {string} contentfulSpaceId - The Contentful Space ID.
 * @param {string} contentfulAccessToken - The Contentful Access Token.
 * @returns {JSX.Element} - React component displaying the stacked bar chart.
 */
import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

import { createClient } from "contentful";
// Define the props interface for the StackedBarChart component
interface StackedBarChartProps {
  contentfulSpaceId: string;
  contentfulAccessToken: string;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({
  contentfulSpaceId,
  contentfulAccessToken,
}) => {
  const [chartData, setChartData] = useState<any[] | null>(null);

  useEffect(() => {
    // Create a Contentful client using the provided Space ID and Access Token
    const client = createClient({
      space: contentfulSpaceId,
      accessToken: contentfulAccessToken,
    });
    // Define the Contentful content type ID for the chart data (change 'label' to your content type ID)
    client
      .getEntries({ content_type: "label" }) // Replace 'yourContentType' with your actual content type ID
      .then((response) => {
        console.log(response);
        // Extract and format data from the Contentful response
        const data = response.items.map((item: any) => ({
          label: item.fields.label,
          category1: item.fields.categ1,
          category2: item.fields.categ2,
          category3: item.fields.categ3,
        }));

        // Set the data as the state
        setChartData(data);
      })
      .catch((error) => {
        console.error("Error fetching data from Contentful", error);
      });
  }, [contentfulSpaceId, contentfulAccessToken]);

  // Define the ECharts chart option
  const getChartOption = (data: any) => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        data: ["Category 1", "Category 2", "Category 3"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: data.map((item: any) => item.label),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Category 1",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: data.map((item: any) => item.category1),
        },
        {
          name: "Category 2",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: data.map((item: any) => item.category2),
        },
        {
          name: "Category 3",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: data.map((item: any) => item.category3),
        },
      ],
    };
  };

  // Render the chart with the fetched data
  return chartData ? (
    <div>
      <ReactECharts
        option={getChartOption(chartData)}
        style={{ height: "400px" }}
      />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default StackedBarChart;
