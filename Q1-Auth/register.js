// Q1-Auth/register.js

const axios = require("axios");

async function register() {

  const registrationData = {
    companyName: "BML Munjal University",       
    ownerName: "Rohit Rathi",          
    rollNo: "220C2030050",                
    ownerEmail: "rohit.rathi.22cse@bmu.edu.in",
    accessCode: "PRoJlR" 
  };

  try {
    const response = await axios.post(
      "http://20.244.56.144/test/register",
      registrationData
    );

    console.log("Registration successful:");
    console.log(response.data);
  } catch (err) {
    console.log("Registration failed:");
    if (err.response) {
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }
  }
}

register();
