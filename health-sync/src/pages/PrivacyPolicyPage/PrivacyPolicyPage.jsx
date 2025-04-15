import React from "react";
import "./PrivacyPolicyPage.css";
export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy">
      <h1 className="header">Privacy Policy</h1>
      <p>
        At HealthSync, we are committed to protecting your personal data and
        respecting your privacy rights in accordance with the General Data
        Protection Regulation (GDPR) and other applicable data privacy laws.
        <br />
        Your personal data will be stored securely and will not be shared with
        third parties without your consent.
      </p>
      <h2>1. What data we collect?</h2>
      <p>
        We may collect the following personal data when you use the HealthSync
        system:
      </p>
      <ul>
        <li>Your name and email address (for authentication purposes)</li>
        <li>Authentication codes and login timestamps</li>
        <li>
          System usage logs, including actions such as login attempts, failed
          logins, patient data edits, and patient additions.
        </li>
      </ul>
      <h2>2. Why do we collect your data?</h2>
      <p>We collect and use your data solely to:</p>
      <ul>
        <li>Enable and secure your login process.</li>
        <li>
          Support critical system functionalities within the HealthSync medical
          platform.
        </li>
        <li>
          Monitor usage patterns to enhance system performance and usability
          (see Analytics section below).
        </li>
      </ul>
      <p>
        We do not sell, rent, or share your personal data with third parties
        without your explicit consent.
      </p>
      <h2>3.Use of Google Analytics</h2>
      <p>
        We use Google Analytics 4 (GA4) to better understand how users interact
        with our system and improve their experience.
      </p>
      <h2>4. Your rights under GDPR</h2>
      <p>
        As a user of HealthSync, you have the right to: Access the personal data
        we hold about you Request correction or deletion of your data Withdraw
        consent to data collection at any time File a complaint with a data
        protection authority.
      </p>
      <h2>5. Contact Us</h2>
      <p>
        If you have questions or requests regarding your privacy or this policy,
        please contact us at: 📧 yali@@healthsync.com
      </p>
    </div>
  );
}
