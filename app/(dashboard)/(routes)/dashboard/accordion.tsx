/**
 * Accordion component displays a set of tabs that can be expanded or collapsed to show different charts.
 * Each tab corresponds to a specific chart type, such as Stacked Bar Chart, Radar Chart, and Gradient Stacked Chart.
 * The component allows the user to click on a tab to toggle its visibility and display the associated chart.
 *
 * @returns {JSX.Element} - React component displaying the accordion of tabs and charts.
 */
import React, { useState } from "react";
import "./accordion.scss"; // Import your SCSS file for styling
import StackedBarChart from "./stackedbar";
import RadarChart from "./stacked3d";
import Chart from "./gradient";


const Accordion: React.FC = () => {
  // Define state to track the active tab
  const [activeTab, setActiveTab] = useState<number | null>(null);

  /**
   * Handle tab click event by toggling the active tab.
   *
   * @param {number} tabNumber - The tab number that was clicked.
   */
  const handleTabClick = (tabNumber: number) => {
    setActiveTab(activeTab === tabNumber ? null : tabNumber);
  };

  /**
   * Check if a tab is active and return a CSS class based on its state.
   *
   * @param {number} tabNumber - The tab number to check.
   * @returns {string} - The CSS class for the tab based on its state.
   */
  const isTabActive = (tabNumber: number) =>
    activeTab === tabNumber ? "active" : "";

  // Define Contentful Space ID and Access Token for data retrieval
  const  contentfulSpaceId = "ejd0c9s0hrhv";
  const contentfulAccessToken = "McxP3ShpZI0ugQisxMgKnS5IrmD4Q7jCusRdrb75dPM";

  return (
    <div className="accordion">
      {/* Tab 1: Stacked Bar Chart */}
      <div
        className={`tab ${isTabActive(1)}`}
        onClick={() => handleTabClick(1)}
      >
        Stacked Bar Chart
      </div>
      <div className={`tab-content ${isTabActive(1)}`}>
        <StackedBarChart
          contentfulSpaceId={contentfulSpaceId}
          contentfulAccessToken={contentfulAccessToken}
        />
      </div>

      {/* Tab 2: Radar Chart */}
      <div
        className={`tab ${isTabActive(2)}`}
        onClick={() => handleTabClick(2)}
      >
        Radar Chart
      </div>
      <div className={`tab-content ${isTabActive(2)}`}>
        <RadarChart
          space={contentfulSpaceId}
          accessToken={contentfulAccessToken}
        />
      </div>

      {/* Tab 3: Gradient Stacked Chart */}
      <div
        className={`tab ${isTabActive(3)}`}
        onClick={() => handleTabClick(3)}
      >
        Gradient Stacked Chart
      </div>
      <div className={`tab-content ${isTabActive(3)}`}>
        <Chart
          spaceId={contentfulSpaceId}
          accessToken={contentfulAccessToken}
        />
      </div>
    </div>
  );
};

export default Accordion;
