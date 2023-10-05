"use client"; //This means that by defining a "use client" in a file, all other modules imported into it
/**
 * Dashboard Component
 *
 * This component represents the dashboard page of the application.
 * It displays user information, a navigation bar, and an accordion.
 *
 * @component
 */
import { SignOutButton, UserButton } from "@clerk/nextjs";
import Accordion from "./accordion";

import styles from "./Dashboard.module.scss"; // Import your SCSS styles

/**
 * Dashboard Function
 *
 * This function defines the main dashboard component.
 *
 * @returns {JSX.Element} The rendered dashboard component.
 */
export default function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      {/* Navigation Bar */}
      <header className={styles.navbar}>
        <div className={styles.logo}>ESHKON</div>
        <div className={styles.userControls}>
          {/* User Button */}
          <UserButton afterSignOutUrl="/" showName />
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Welcome Text */}
        <h1 className={styles.welcomeText}>Welcome to Dashboard</h1>

        {/* Accordion */}
        <Accordion />

        {/* Sign Out Button */}
        <SignOutButton />
      </main>
    </div>
  );
}
