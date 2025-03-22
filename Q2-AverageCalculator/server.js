const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNjIzNDUyLCJpYXQiOjE3NDI2MjMxNTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjU5OTNhZDFhLTEyMGUtNGQ0ZC04ZDk3LTM1OTEyOTcwMWFhNSIsInN1YiI6InJvaGl0LnJhdGhpLjIyY3NlQGJtdS5lZHUuaW4ifSwiY29tcGFueU5hbWUiOiJCTUwgTXVuamFsIFVuaXZlcnNpdHkiLCJjbGllbnRJRCI6IjU5OTNhZDFhLTEyMGUtNGQ0ZC04ZDk3LTM1OTEyOTcwMWFhNSIsImNsaWVudFNlY3JldCI6Im5zT3R3bXh6WUNuSnNscXciLCJvd25lck5hbWUiOiJSb2hpdCBSYXRoaSIsIm93bmVyRW1haWwiOiJyb2hpdC5yYXRoaS4yMmNzZUBibXUuZWR1LmluIiwicm9sbE5vIjoiMjIwQzIwMzAwNTAifQ.8apMZVxcf55N1sKZ91sDM-2cBWGMbK1QrZExilycczs";

const WINDOW_SIZE = 10;
let windowState = [];
let previousWindowState = [];

function computeAverage(arr) {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((acc, num) => acc + num, 0);
  return parseFloat((sum / arr.length).toFixed(2));
}

function getApiUrl(numberid) {
  const endpoints = {
    p: "http://20.244.56.144/test/primes",
    f: "http://20.244.56.144/test/fibo",
    e: "http://20.244.56.144/test/even",
    r: "http://20.244.56.144/test/rand"
  };
  return endpoints[numberid] || null;
}

app.get("/numbers/:numberid", async (req, res) => {
  const numberid = req.params.numberid;
  const apiUrl = getApiUrl(numberid);

  if (!apiUrl) {
    return res.status(400).json({
      error: "Invalid numberid. Use 'p', 'f', 'e', or 'r'."
    });
  }

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      timeout: 5000 
    });

    const fetchedNumbers = response.data.numbers;

    previousWindowState = [...windowState];

    const combined = windowState.concat(fetchedNumbers);
    const uniqueArray = [...new Set(combined)];
    let filtered = uniqueArray.filter(num => num >= 0 && num <= 500);
    filtered.sort((a, b) => a - b);

    if (filtered.length > WINDOW_SIZE) {
      filtered = filtered.slice(filtered.length - WINDOW_SIZE);
    }

    windowState = filtered;
    const avg = computeAverage(windowState);

    const responseBody = {
      windowPrevState: previousWindowState,
      windowCurState: windowState,
      numbers: fetchedNumbers,
      avg: avg
    };

    res.json(responseBody);
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        return res.status(401).json({ error: "Invalid authorization token" });
      }
      if (error.response.status === 500) {
        return res.status(500).json({ error: "Server error from test API" });
      }
      return res.status(error.response.status).json({ error: error.response.data });
    } else if (error.code === "ECONNABORTED") {
      return res.status(408).json({
        error: "Request timeout - the external API took too long to respond"
      });
    }

    res.status(500).json({ error: "Failed to fetch numbers from server" });
  }
});

const PORT = 9876;
app.listen(PORT, () => {});
