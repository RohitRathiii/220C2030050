
const axios = require("axios");

async function getAuthToken() {
 
  const authRequestData = {
    companyName: "BML Munjal University",
    clientID: "5993ad1a-120e-4d4d-8d97-359129701aa5",
    clientSecret: "nsOtwmxzYCnJslqw",
    ownerName: "Rohit Rathi",
    ownerEmail: "rohit.rathi.22cse@bmu.edu.in",
    rollNo: "220C2030050"
  };

  try {
    const response = await axios.post(
      "http://20.244.56.144/test/auth",
      authRequestData
    );
    console.log("Auth token received:");
    console.log(response.data); 
  } catch (error) {
    console.log("Failed to get auth token:");
    if (error.response) {
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}

getAuthToken();
