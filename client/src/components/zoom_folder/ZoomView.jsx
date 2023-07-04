import React from "react";
import "../../assets/css/App.css";

import { useEffect, Fragment } from "react";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
import axios from "axios";
function ZoomView(props) {
  const client = ZoomMtgEmbedded.createClient();

  var authEndpoint = "http://localhost:8000/zoomAuth";
  var sdkKey = "sQbY9NS_QcWUnaT43UJZOw";
  var meetingNumber = "899 5065 6834";
  var passWord = "";
  var role = 0;
  var userName = "React";
  var userEmail = "fa19-bse-004@cuilahore.edu.pk";
  var registrantToken = "";
  var zakToken = "";

  const apiKey = "sQbY9NS_QcWUnaT43UJZOw";
  const apiSecret = "sw7zOZ6KXrnvk3yiCzN5kosa6k9qa7Yf";
  const payload = {
    iss: apiKey,
    exp: Math.floor(Date.now() / 1000) + 60, // Expiration time in seconds (e.g., 1 minute)
  };
  //   const token = jwt.sign(payload, apiSecret);

  //   console.log(token);

  //
  //   const userId = "USER_ID"; // Replace with the actual user ID
  //   const jwtToken = token; // Replace with the actual JWT token

  //   const createMeeting = async () => {
  //     try {
  //       const response = await axios.post(
  //         `https://api.zoom.us/v2/users/${userId}/meetings`,
  //         {
  //           topic: "Meeting Topic",
  //           type: 1, // Instant meeting
  //           duration: 60, // Meeting duration in minutes
  //           // Add other desired meeting properties
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${jwtToken}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );

  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error.response.data);
  //     }
  //   };

  //   createMeeting();

  //

  //2

  const getUserID = async (email) => {
    try {
      const response = await fetch(
        "https://api.zoom.us/v2/users?email=" + encodeURIComponent(email),
        {
          method: "GET",
          mode: "no-cors",
        }
      )
        .then((response) => {
          // Handle the response here
          console.log(response);
        })
        .catch((error) => {
          // Handle any errors that occur during the request
          console.error(error);
        });

      // Extract the userID from the response
      const { users } = response.data;
      if (users.length > 0) {
        const userID = users[0].id;
        return userID;
      } else {
        console.log("User not found.");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving user:", error.response.data);
      return null;
    }
  };

  // Provide your access token and the user's email
  const accessToken = "ikX4QBCyQsiphWQE_nJuaw";
  //   const userEmail = "fa19-bse-004@cuilahore.edu.pk";

  // Call the function to retrieve the userID
  const userID = getUserID("fa19-bse-004@cuilahore.edu.pk");
  console.log("User ID:", userID);

  //2

  function getSignature(e) {
    e.preventDefault();

    fetch(authEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response.signature);
        startMeeting(response.signature);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function startMeeting(signature) {
    let meetingSDKElement = document.getElementById("meetingSDKElement");

    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: "en-US",
      customize: {
        meetingInfo: [
          "topic",
          "host",
          "mn",
          "pwd",
          "telPwd",
          "invite",
          "participant",
          "dc",
          "enctype",
        ],
        toolbar: {
          buttons: [
            {
              text: "Custom Button",
              className: "CustomButton",
              onClick: () => {
                console.log("custom button");
              },
            },
          ],
        },
      },
    });

    client.join({
      signature: signature,
      sdkKey: sdkKey,
      meetingNumber: meetingNumber,
      password: passWord,
      userName: userName,
      userEmail: userEmail,
      tk: registrantToken,
      zak: zakToken,
    });
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting SDK Sample React</h1>

        {/* For Component View */}
        <div id="meetingSDKElement">
          <p>Hi</p>
          {/* Zoom Meeting SDK Component View Rendered Here */}
        </div>

        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default ZoomView;
