/* eslint-disable no-unused-vars */
const dotenv = require("dotenv");
dotenv.config();
const NODE_PORT = process.env.NODE_PORT;
const express = require("express");
const app = express();
const cors = require("cors");
const redis = require("redis");
const cookieParser = require("cookie-parser");
var request = require("request");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(cookieParser());

let authCode = "";
app.get("/", (req, res) => {
  // console.log(req.query.code);
  authCode = req.query.code;
  // console.log("authCode:", authCode);

  //---------------------------------------------------------------------------------------------------------------

  var request = require("request");
  var options = {
    method: "POST",
    url: "https://www.linkedin.com/oauth/v2/accessToken",
    headers: {
      Authorization: "Bearer " + authCode,
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie:
        'bcookie="v=2&c821c3fc-9cd1-4ce7-84f3-7a21e0021180"; lang=v=2&lang=en-us; lidc="b=VB09:s=V:r=V:a=V:p=V:g=4008:u=654:x=1:i=1656656285:t=1656728375:v=2:sig=AQF4zTNF8iPHxLiv_sovrwdjKSdtkVkS"; JSESSIONID=ajax:7207333032549868490; PLAY_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImZsb3dUcmFja2luZ0lkIjoiN0JJZW1SUzBUYjJJUmFFT1djbC94UT09In0sIm5iZiI6MTY1NjY1MzgwMCwiaWF0IjoxNjU2NjUzODAwfQ.NSOa_sMHFHVEf86-IBeF5C-z-alGoe-skdnAXIvXrTM; bscookie="v=1&2022063012221209e06736-d040-485b-84fa-7efb999fdb24AQEFFxYqrf0B29PeIepKjm3Fg66XSRxw"',
    },
    form: {
      grant_type: "authorization_code",
      code: authCode,
      client_id: process.env.linkedIn_Client_Id,
      client_secret: process.env.linkedIn_Client_Secret,
      redirect_uri: "http://localhost:3001",
    },
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    let accessToken = JSON.parse(response.body).access_token;

    var options = {
      method: "GET",
      url: "https://api.linkedin.com/v2/me",
      headers: {
        Authorization: "Bearer " + accessToken,
        Cookie:
          'lidc="b=VB09:s=V:r=V:a=V:p=V:g=4008:u=654:x=1:i=1656654308:t=1656728375:v=2:sig=AQF8qi_vxCzkBB5z-v2fRXBF4qz4NIj2"; bcookie="v=2&cae9af60-cdd4-40c8-8135-73b200a76504"; lang=v=2&lang=en-us; lidc="b=VB09:s=V:r=V:a=V:p=V:g=4008:u=654:x=1:i=1656654294:t=1656728375:v=2:sig=AQGMElHtUfrCJDaSkX4OlEKf7Bc_pgh6"',
      },
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      let payload = JSON.parse(response.body);
      console.log(payload);
      res.send(payload);
    });
  });

  //--------------------------------------------------------------------------------------------------------------
});

app.listen(NODE_PORT, () => {
  console.log(`Server is running on port ${NODE_PORT}`);
});
