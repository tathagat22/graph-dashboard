import Link from "next/link";
import "./landing.scss";
import { SignedIn, SignedOut } from "@clerk/nextjs";

/**
 * LandingPage component displays a landing page for your Chart App.
 * It provides buttons for login, registration, and visiting the dashboard.
 */
const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-content">
        {/* Page heading */}
        <h1 className="landing-heading">Welcome to Your Chart App</h1>
        
        {/* Page description */}
        <p className="landing-text">
          Explore and visualize data with beautiful charts.
        </p>

        <div className="landing-buttons">
          {/* Conditionally render login and register buttons when user is signed out */}
          <SignedOut>
            {/* Link to the login page */}
            <Link href="/sign-in">
              <div className="button-login">Login</div>
            </Link>
            {/* Link to the registration page */}
            <Link href="/sign-up">
              <div className="button-register">Register</div>
            </Link>
          </SignedOut>

          {/* Conditionally render the dashboard button when user is signed in */}
          <SignedIn>
            {/* Link to the dashboard page */}
            <Link href="/dashboard">
              <div className="button-register">Dashboard</div>
            </Link>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
