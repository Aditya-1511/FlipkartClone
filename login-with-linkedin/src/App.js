import React from "react";
import "./App.css";

import { useLinkedIn } from "react-linkedin-login-oauth2";

function LinkedInPage() {
  const { linkedInLogin } = useLinkedIn({
    clientId: "77wjqnimw0vcw8",
    redirectUri: `http://localhost:3001`,
    onSuccess: (code) => {
      console.log(code);
    },
    scope: "r_emailaddress r_liteprofile w_member_social",
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="card">
      <h1>
        <em>Click on the button to login using LinkedIn</em>{" "}
      </h1>
      <img
        onClick={linkedInLogin}
        src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
        alt="Sign in with Linked In"
        style={{ maxWidth: "50px", cursor: "pointer" }}
      />
    </div>
  );
}

export default LinkedInPage;
