/**
 * RadarChart Component
 *
 * This component displays a radar chart using ECharts for React. It fetches data from Contentful
 * and dynamically generates the radar chart based on the fetched data.
 *
 * @component
 * @param {string} space - The Contentful space ID.
 * @param {string} accessToken - The Contentful access token.
 */
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { createClient } from 'contentful';

interface RadarChartProps {
  space: string;
  accessToken: string;
}

const RadarChart: React.FC<RadarChartProps> = ({ space, accessToken }) => {
  const [chartData, setChartData] = useState<any[] | null>(null);

  useEffect(() => {
    // Create a Contentful client using the provided space ID and access token
    const contentfulClient = createClient({
      space: space,
      accessToken: accessToken,
    });

    // Define the Contentful content type ID for your chart data
    const contentTypeId = 'radar';

    // Fetch data from Contentful
    contentfulClient
      .getEntries({ content_type: contentTypeId })
      .then((response) => {
        if (response.items.length > 0) {
          setChartData(response.items);
        }
      })
      .catch((error) => {
        console.error('Error fetching data from Contentful:', error);
      });
  }, [space, accessToken]);

  /**
   * Generate ECharts option for the radar chart based on fetched data.
   *
   * @returns {object} The ECharts option object.
   */
  const getOption = () => {
    if (chartData) {
      return {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          type: 'scroll',
          bottom: 10,
          data: chartData.map((item) => item.fields),
        },
        radar: {
          indicator: [
            { text: 'IE8-', max: 400 },
            { text: 'IE9+', max: 400 },
            { text: 'Safari', max: 400 },
            { text: 'Firefox', max: 400 },
            { text: 'Chrome', max: 400 },
          ],
        },
        series: [
          ...chartData.map((item) => ({
            type: 'radar',
            symbol: 'none',
            lineStyle: {
              width: 1,
            },
            emphasis: {
              areaStyle: {
                color: 'rgba(0,250,0,0.3)',
              },
            },
            data: [item.fields],
            name: item.fields,
          })),
        ],
      };
    }

    return {}; // Return an empty option if data is not loaded yet
  };

  return (
    <div>
      {chartData ? (
        <ReactECharts
          option={getOption()}
          style={{ height: '600px' }}
        />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default RadarChart;
