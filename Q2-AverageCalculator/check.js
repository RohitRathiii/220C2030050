// testApi.js
const axios = require('axios');

// Paste your exact token from Q1 auth here
const YOUR_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNjIzMDAzLCJpYXQiOjE3NDI2MjI3MDMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjU5OTNhZDFhLTEyMGUtNGQ0ZC04ZDk3LTM1OTEyOTcwMWFhNSIsInN1YiI6InJvaGl0LnJhdGhpLjIyY3NlQGJtdS5lZHUuaW4ifSwiY29tcGFueU5hbWUiOiJCTUwgTXVuamFsIFVuaXZlcnNpdHkiLCJjbGllbnRJRCI6IjU5OTNhZDFhLTEyMGUtNGQ0ZC04ZDk3LTM1OTEyOTcwMWFhNSIsImNsaWVudFNlY3JldCI6Im5zT3R3bXh6WUNuSnNscXciLCJvd25lck5hbWUiOiJSb2hpdCBSYXRoaSIsIm93bmVyRW1haWwiOiJyb2hpdC5yYXRoaS4yMmNzZUBibXUuZWR1LmluIiwicm9sbE5vIjoiMjIwQzIwMzAwNTAifQ.LizJ6teBhCwOEishev4SCQfHDuVcaUNxd1w4pSRRWr8";

// Choose one endpoint to test, e.g. primes
const TEST_URL = "http://20.244.56.144/test/primes";

async function testApi() {
  try {
    console.log("Sending GET request to:", TEST_URL);
    const response = await axios.get(TEST_URL, {
      headers: {
        Authorization: `Bearer ${YOUR_TOKEN}`  // Bearer format
      },
      timeout: 3000 // 3 seconds timeout for safety
    });

    console.log("Response status:", response.status);
    console.log("Response data:", response.data);
  } catch (err) {
    if (err.response) {
      console.error("Request failed with status:", err.response.status);
      console.error("Response data:", err.response.data);
    } else {
      console.error("Error:", err.message);
    }
  }
}

testApi();
