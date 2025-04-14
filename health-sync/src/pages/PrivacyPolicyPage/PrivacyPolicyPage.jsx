import React from "react";
import "./PrivacyPolicyPage.css"
export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy">
       <h1>Privacy Policy</h1>
      <p>
        This is the privacy policy of HealthSync. We take your privacy seriously.
        <br />
        Your personal data will be stored securely and will not be shared with third parties without your consent.
      </p>
      <h2>What data we collect</h2>
      <ul>
        <li>Your name and email address</li>
        <li>Authentication code</li>
        <li>System usage logs</li>
      </ul>
      <h2>How we use your data</h2>
      <p>Only to support your login and medical functionalities inside the HealthSync system.</p>
      <p>We comply with the GDPR and all relevant data privacy regulations.</p>
    </div>
  );
}